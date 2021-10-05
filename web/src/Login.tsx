import React, { FunctionComponent } from "react";
import { History } from "history";

const Login: FunctionComponent<{ history: History }> = ({ history }) => {
  return (
    <div>
      <a href="https://api.griffinhammer.com/login">Spotify Log In</a>
    </div>
  );
};

export default Login;
