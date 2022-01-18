import { HttpApi, HttpMethod } from "@aws-cdk/aws-apigatewayv2";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import { Construct } from "@aws-cdk/core";
import { WatchableNodejsFunctionProps } from "cdk-watch";
interface APILambdaProps {
    api: HttpApi;
    lambdaProps: WatchableNodejsFunctionProps;
    apiMethodProps: {
        path: string;
        methods: HttpMethod[];
    };
}
export declare class APILambda extends Construct {
    lambda: NodejsFunction;
    constructor(scope: Construct, id: string, props: APILambdaProps);
}
export {};
