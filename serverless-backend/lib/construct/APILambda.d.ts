import { HttpApi, HttpMethod } from "aws-cdk-lib/lib/aws-apigatewayv2";
import { NodejsFunction } from "aws-cdk-lib/lib/aws-lambda-nodejs";
import { Construct } from "aws-cdk-lib/lib/core";
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
