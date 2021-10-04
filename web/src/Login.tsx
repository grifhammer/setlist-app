import React, { FunctionComponent } from "react";
import { AuthState } from "@aws-amplify/ui-components";
import { AmplifySignIn } from "@aws-amplify/ui-react";
import { History } from "history";

const Login: FunctionComponent<{ history: History }> = ({ history }) => {
  return (
    <div>
      <AmplifySignIn
        handleAuthStateChange={(nextAuthState, data?: object) => {
          switch (nextAuthState) {
            case AuthState.SignUp:
              history.push("/register");
              return;
            default:
              console.log(nextAuthState, data);
              return;
          }
        }}
      />
    </div>
  );
};

export default Login;
