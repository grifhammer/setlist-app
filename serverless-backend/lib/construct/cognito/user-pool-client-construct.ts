import * as cognito from "@aws-cdk/aws-cognito";
import * as cdk from "@aws-cdk/core";

type UserPoolClientConstructProps = {
  userPool: cognito.UserPool;
};

export class UserPoolClientConstruct extends cdk.Construct {
  public readonly userPoolClient: cognito.UserPoolClient;

  constructor(
    scope: cdk.Construct,
    id: string,
    props: UserPoolClientConstructProps
  ) {
    super(scope, id);

    const clientReadAttributes = new cognito.ClientAttributes()
      .withStandardAttributes({
        givenName: true,
        familyName: true,
        email: true,
        emailVerified: false,
        nickname: true,
        gender: false,
        preferredUsername: true,
        lastUpdateTime: true,
        timezone: true,
      })
      .withCustomAttributes("isAdmin");

    const clientWriteAttributes =
      new cognito.ClientAttributes().withStandardAttributes({
        givenName: true,
        familyName: true,
        email: true,
        gender: false,
        emailVerified: false,
        nickname: true,
        preferredUsername: true,
        lastUpdateTime: true,
        timezone: true,
      });

    this.userPoolClient = new cognito.UserPoolClient(this, "userpool-client", {
      userPool: props.userPool,
      authFlows: {
        adminUserPassword: true,
        custom: true,
        userSrp: true,
      },
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.COGNITO,
      ],
      preventUserExistenceErrors: true,
      readAttributes: clientReadAttributes,
      writeAttributes: clientWriteAttributes,
    });
  }
}
