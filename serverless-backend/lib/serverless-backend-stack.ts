import * as cdk from "@aws-cdk/core";
import { HttpApi, HttpMethod, DomainName } from "@aws-cdk/aws-apigatewayv2";
import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import { HostedZone, ARecord, RecordTarget } from "@aws-cdk/aws-route53";
import { Certificate } from "@aws-cdk/aws-certificatemanager";
import { ApiGatewayv2Domain } from "@aws-cdk/aws-route53-targets";
import { SecretValue } from "@aws-cdk/core";

export class ServerlessBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const setlistFMKey = SecretValue.secretsManager("API_KEYS", {
      jsonField: "SETLIST_FM",
    }).toString();
    const searchArtistLambda = new NodejsFunction(this, "searchArtists", {
      entry: "./lambda/artist-search.ts",
      handler: "searchArtistHandler",
      environment: {
        SETLIST_FM_KEY: setlistFMKey,
      },
    });

    const searchSetlistLambda = new NodejsFunction(this, "searchSetlists", {
      entry: "./lambda/setlist-search.ts",
      handler: "searchSetlistHandler",
      environment: {
        SETLIST_FM_KEY: setlistFMKey,
      },
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
