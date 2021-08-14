import { HttpApi, HttpMethod } from "@aws-cdk/aws-apigatewayv2";
import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";
import { Runtime } from "@aws-cdk/aws-lambda";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import { Construct } from "@aws-cdk/core";
import {
  WatchableNodejsFunction,
  WatchableNodejsFunctionProps,
} from "cdk-watch";

interface APILambdaProps {
  api: HttpApi;
  lambdaProps: WatchableNodejsFunctionProps;
  apiMethodProps: { path: string; methods: HttpMethod[] };
}

export class APILambda extends Construct {
  lambda: NodejsFunction;
  constructor(scope: Construct, id: string, props: APILambdaProps) {
    super(scope, id);
    const { api, apiMethodProps, lambdaProps } = props;
    this.lambda = new WatchableNodejsFunction(this, id, {
      ...lambdaProps,
      runtime: Runtime.NODEJS_14_X,
    });
    const integration = new LambdaProxyIntegration({
      handler: this.lambda,
    });

    api.addRoutes({
      ...apiMethodProps,
      integration,
    });
  }
}
