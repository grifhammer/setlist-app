import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

class App extends React.Component<{}, {}> {
  constructor(props: object) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact={true} path="/" component={Home} />
      </Switch>
    );
  }
}

export default App;
