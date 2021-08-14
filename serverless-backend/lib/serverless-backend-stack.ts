import * as cdk from "@aws-cdk/core";
import { HttpApi, HttpMethod, DomainName } from "@aws-cdk/aws-apigatewayv2";
import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";
import { SecretValue } from "@aws-cdk/core";
import { Table, AttributeType } from "@aws-cdk/aws-dynamodb";
import { Runtime } from "@aws-cdk/aws-lambda";
import { WatchableNodejsFunction } from "cdk-watch";
import { APILambda } from "./construct/APILambda";
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
        apiMethodProps: { path: "/searchArtist", methods: [HttpMethod.GET] },
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
        apiMethodProps: { path: "/setlists", methods: [HttpMethod.GET] },
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
  }
}
