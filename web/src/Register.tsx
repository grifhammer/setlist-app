import { AuthState } from "@aws-amplify/ui-components";
import { AmplifySignUp } from "@aws-amplify/ui-react";
import { FunctionComponent } from "react";
import { History } from "history";

const Register: FunctionComponent<{ history: History }> = ({ history }) => {
  return (
    <div>
      <AmplifySignUp
        formFields={[]}
        handleAuthStateChange={(nextAuthState) => {
          switch (nextAuthState) {
            case AuthState.SignIn:
              history.push("/login");
              return;
            case AuthState.SignedIn:
            default:
              console.log(`In Register, next state: ${nextAuthState}`);
              return;
          }
        }}
      />
    </div>
  );
};

export default Register;
