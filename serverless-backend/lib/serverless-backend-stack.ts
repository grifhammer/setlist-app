import * as cdk from "@aws-cdk/core";
import { HttpApi, HttpMethod, DomainName } from "@aws-cdk/aws-apigatewayv2";
import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";
import { SecretValue } from "@aws-cdk/core";
import { Table, AttributeType } from "@aws-cdk/aws-dynamodb";
import { Runtime } from "@aws-cdk/aws-lambda";
import { WatchableNodejsFunction } from "cdk-watch";
import { APILambda } from "./construct/APILambda";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import {
	App,
	BasicAuth,
	CustomRule,
	GitHubSourceCodeProvider,
	RedirectStatus,
} from "@aws-cdk/aws-amplify";
export class ServerlessBackendStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

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

		const setlistFMKey = SecretValue.secretsManager("API_KEYS", {
			jsonField: "SETLIST_FM",
		}).toString();

		const spotifyKey = SecretValue.secretsManager("API_KEYS", {
			jsonField: "SPOTIFY",
		}).toString();

		const api = new HttpApi(this, "SetlistAppApi", {});

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
				},
				api,
				apiMethodProps: {
					path: "/setlists",
					methods: [HttpMethod.GET],
				},
			}
		);

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
				},
			},
			api,
			apiMethodProps: {
				path: "/login",
				methods: [HttpMethod.POST],
			},
		});

		oneTable.grantReadWriteData(loginLambda);
	}
}
