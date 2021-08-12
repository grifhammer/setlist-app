import * as cdk from "@aws-cdk/core";
import { HttpApi, HttpMethod, DomainName } from "@aws-cdk/aws-apigatewayv2";
import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";
import { SecretValue } from "@aws-cdk/core";
import { Table, AttributeType } from "@aws-cdk/aws-dynamodb";
import { Function, Runtime, Code } from "@aws-cdk/aws-lambda";
import { WatchableNodejsFunction } from "cdk-watch";
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

    const searchArtistLambda = new WatchableNodejsFunction(
      this,
      "searchArtists",
      {
        runtime: Runtime.NODEJS_14_X,
        entry: "./lambda/ArtistSearch/artist-search.ts",
        handler: "searchArtistHandler",
        environment: {
          SETLIST_FM_KEY: setlistFMKey,
        },
      }
    );

    const searchSetlistLambda = new WatchableNodejsFunction(
      this,
      "searchSetlists",
      {
        handler: "searchSetlistHandler",
        entry: "./lambda/SetlistSearch/setlist-search.ts",
        environment: {
          SETLIST_FM_KEY: setlistFMKey,
        },
        runtime: Runtime.NODEJS_14_X,
      }
    );

    const searchArtistIntegration = new LambdaProxyIntegration({
      handler: searchArtistLambda,
    });

    const searchSetlistIntegration = new LambdaProxyIntegration({
      handler: searchSetlistLambda,
    });
    const api = new HttpApi(this, "SetlistAppApi", {});

    api.addRoutes({
      path: "/searchArtist",
      methods: [HttpMethod.GET],
      integration: searchArtistIntegration,
    });
    api.addRoutes({
      path: "/setlists",
      methods: [HttpMethod.GET],
      integration: searchSetlistIntegration,
    });
  }
}
