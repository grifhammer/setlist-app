import * as cognito from "@aws-cdk/aws-cognito";
import * as iam from "@aws-cdk/aws-iam";
import * as lambda from "@aws-cdk/aws-lambda";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import * as cdk from "@aws-cdk/core";
import { WatchableNodejsFunction } from "cdk-watch";
import * as path from "path";
interface UserPoolConstructProps {
  appName: string;
  frontendBaseUrl: string;
}
export class UserPoolConstruct extends cdk.Construct {
  public readonly userPool: cognito.UserPool;

  constructor(scope: cdk.Construct, id: string, props: UserPoolConstructProps) {
    super(scope, id);

    const { appName, frontendBaseUrl } = props;
    const postAccountConfirmationTrigger = new WatchableNodejsFunction(
      this,
      "post-confirmation",
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        memorySize: 1024,
        timeout: cdk.Duration.seconds(6),
        handler: "main",
        entry: path.join(
          __dirname,
          "/../../../lambda/CognitoTriggers/post-confirmation/index.ts"
        ),
        bundling: { externalModules: ["aws-sdk"] },
      }
    );

    const customMessagesTrigger = new WatchableNodejsFunction(
      this,
      "custom-messages",
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        memorySize: 1024,
        timeout: cdk.Duration.seconds(6),
        handler: "main",
        entry: path.join(
          __dirname,
          "../../../lambda/CognitoTriggers/custom-messages/index.ts"
        ),
        environment: {
          FRONTEND_BASE_URL: frontendBaseUrl,
        },
        bundling: { externalModules: ["aws-sdk"] },
      }
    );

    this.userPool = new cognito.UserPool(this, "userpool", {
      userPoolName: `${appName}Users`,
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        givenName: {
          required: true,
          mutable: true,
        },
        familyName: {
          required: true,
          mutable: true,
        },
      },
      customAttributes: {
        country: new cognito.StringAttribute({ mutable: true }),
        city: new cognito.StringAttribute({ mutable: true }),
        isAdmin: new cognito.StringAttribute({ mutable: true }),
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireDigits: true,
        requireUppercase: true,
        requireSymbols: true,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      lambdaTriggers: {
        postConfirmation: postAccountConfirmationTrigger,
        customMessage: customMessagesTrigger,
      },
    });

    const adminAddUserToGroupPolicyStatement = new iam.PolicyStatement({
      actions: ["cognito-idp:AdminAddUserToGroup"],
      resources: [this.userPool.userPoolArn],
    });

    postAccountConfirmationTrigger.role?.attachInlinePolicy(
      new iam.Policy(this, "post-confirm-trigger-policy", {
        statements: [adminAddUserToGroupPolicyStatement],
      })
    );
  }
}
