import * as cdk from "@aws-cdk/core";
import { HttpApi, HttpMethod, DomainName } from "@aws-cdk/aws-apigatewayv2";
import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";
import { SecretValue } from "@aws-cdk/core";
import { Function, Runtime, Code } from "@aws-cdk/aws-lambda";

export class ServerlessBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const setlistFMKey = SecretValue.secretsManager("API_KEYS", {
      jsonField: "SETLIST_FM",
    }).toString();
    const searchArtistLambda = new Function(this, "searchArtists", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset("./lambda/ArtistSearch", {}),
      // entry: "./lambda/artist-search.ts",
      handler: "artist-search.searchArtistHandler",
      environment: {
        SETLIST_FM_KEY: setlistFMKey,
      },
    });

    const searchSetlistLambda = new Function(this, "searchSetlists", {
      code: Code.fromAsset("./lambda/SetlistSearch"),
      handler: "setlist-search.searchSetlistHandler",
      environment: {
        SETLIST_FM_KEY: setlistFMKey,
      },
      runtime: Runtime.NODEJS_14_X,
    });

    const searchArtistIntegration = new LambdaProxyIntegration({
      handler: searchArtistLambda,
    });

    const searchSetlistIntegration = new LambdaProxyIntegration({
      handler: searchSetlistLambda,
    });
    // const apiCert = Certificate.fromCertificateArn(
    //   this,
    //   "apiCert",
    //   "arn:aws:acm:us-west-2:293729433005:certificate/a0beb7c3-5be5-4e58-87ce-92424af85d9b"
    // );

    // const apiDomain = new DomainName(this, "apiDomainName", {
    //   domainName: "api.griffinsight.com",
    //   certificate: apiCert,
    // });

    const api = new HttpApi(this, "SetlistAppApi", {
      // defaultDomainMapping: {
      //   domainName: apiDomain,
      // },
    });

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
