import { Construct, Duration, Stack, StackProps } from "aws-cdk-lib/lib/core";
import { HttpApi, HttpMethod } from "aws-cdk-lib/lib/aws-apigatewayv2";
import { SecretValue } from "aws-cdk-lib/lib/core";
import { Table, AttributeType } from "aws-cdk-lib/lib/aws-dynamodb";
import { APILambda } from "./construct/APILambda";
import {
	App,
	BasicAuth,
	CustomRule,
	GitHubSourceCodeProvider,
	RedirectStatus,
} from "aws-cdk-lib/lib/aws-amplify";
import { UserPool } from "aws-cdk-lib/lib/aws-cognito";
import {
	IdentityPoolConstruct,
	UserPoolClientConstruct,
	UserPoolConstruct,
} from "./construct/cognito";

const SPOTIFY_CLIENT_ID = "df6114c49120461ea1ec4eec20ce2334";
export class ServerlessBackendStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props);

		const { userPool } = new UserPoolConstruct(this, "userpool", {
			appName: id,
			frontendBaseUrl: "griffinhammer.com",
		});
		const { userPoolClient } = new UserPoolClientConstruct(
			this,
			"userpoolclient",
			{ userPool }
		);
		const { identityPool } = new IdentityPoolConstruct(
			this,
			"identitypool",
			{
				appName: id,
				userPool,
				userPoolClient,
			}
		);

		const oneTable = new Table(this, "oneTable", {
			partitionKey: {
				name: "pk",
				type: AttributeType.STRING,
			},
			sortKey: {
				name: "sk",
				type: AttributeType.STRING,
			},
			tableName: "theOneTable",
			readCapacity: 2,
			writeCapacity: 2,
		});

		const amplifyApp = new App(this, "Website", {
			appName: "Setlist Saver",
			sourceCodeProvider: new GitHubSourceCodeProvider({
				owner: "grifhammer",
				repository: "setlist-app",
				oauthToken: SecretValue.secretsManager("GithubToken", {
					jsonField: "token",
				}),
			}),
			autoBranchCreation: {
				patterns: ["feature/"],
				pullRequestPreview: false,
				basicAuth: BasicAuth.fromCredentials(
					"grifhammer",
					SecretValue.secretsManager("ADMIN_CREDENTIALS", {
						jsonField: "grifhammer",
					})
				),
				environmentVariables: {
					REACT_APP_API_URL: "https://api.griffinhammer.com",
				},
			},
			autoBranchDeletion: true,
			customRules: [
				new CustomRule({
					source: "</^[^.]+$|.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>",
					target: "/",
					status: RedirectStatus.REWRITE,
				}),
			],
			basicAuth: BasicAuth.fromGeneratedPassword("grifhammer"),
		});
		amplifyApp.addBranch("develop", {});

		new UserPool(this, "SetlistAppUsers", {
			userPoolName: "SetlistAppUsers",
			selfSignUpEnabled: true,
		});

		const setlistFMKey = SecretValue.secretsManager("API_KEYS", {
			jsonField: "SETLIST_FM",
		}).toString();

		const spotifyKey = SecretValue.secretsManager("API_KEYS", {
			jsonField: "SPOTIFY",
		}).toString();

		const spotifySecret = SecretValue.secretsManager("API_KEYS", {
			jsonField: "SPOTIFY_SECRET",
		}).toString();

		const api = new HttpApi(this, "SetlistAppApi", {});
		const REDIRECT_URI = `https://api.griffinhammer.com/register`;

		const { lambda: searchArtistLambda } = new APILambda(
			this,
			"searchArtists",
			{
				lambdaProps: {
					entry: "./lambda/ArtistSearch/artist-search.ts",
					handler: "searchArtistHandler",
					environment: {
						SETLIST_FM_KEY: setlistFMKey,
					},
				},
				api,
				apiMethodProps: {
					path: "/searchArtist",
					methods: [HttpMethod.GET],
				},
			}
		);

		const { lambda: searchSetlistLambda } = new APILambda(
			this,
			"searchSetlists",
			{
				lambdaProps: {
					handler: "searchSetlistHandler",
					entry: "./lambda/SetlistSearch/setlist-search.ts",
					environment: {
						SETLIST_FM_KEY: setlistFMKey,
					},
					timeout: Duration.minutes(1),
				},
				api,
				apiMethodProps: {
					path: "/setlists",
					methods: [HttpMethod.GET],
				},
			}
		);
		oneTable.grantReadData(searchSetlistLambda);

		const { lambda: buildPlaylistLambda } = new APILambda(
			this,
			"buildPlaylist",
			{
				lambdaProps: {
					entry: "./lambda/BuildPlaylist/index.ts",
					handler: "BuildPlaylistHandler",
					environment: {
						SPOTIFY_KEY: spotifyKey,
					},
				},
				api,
				apiMethodProps: {
					path: "/buildPlaylist",
					methods: [HttpMethod.POST],
				},
			}
		);

		const { lambda: loginLambda } = new APILambda(this, "Login", {
			lambdaProps: {
				entry: "./lambda/Login/index.ts",
				handler: "LoginHandler",
				environment: {
					SPOTIFY_KEY: spotifyKey,
					TABLE_NAME: oneTable.tableName,
					REDIRECT_URI,
					SPOTIFY_CLIENT_ID,
				},
			},
			api,
			apiMethodProps: {
				path: "/login",
				methods: [HttpMethod.GET],
			},
		});

		const { lambda: registerLambda } = new APILambda(this, "Register", {
			lambdaProps: {
				entry: "./lambda/Login/register.ts",
				handler: "RegisterHandler",
				environment: {
					TABLE_NAME: oneTable.tableName,
					SPOTIFY_KEY: spotifyKey,
					SPOTIFY_CLIENT_SECRET: spotifySecret,
					REDIRECT_URI,
					SPOTIFY_CLIENT_ID,
				},
			},
			api,
			apiMethodProps: {
				path: "/register",
				methods: [HttpMethod.GET],
			},
		});

		oneTable.grantReadWriteData(registerLambda);
	}
}
