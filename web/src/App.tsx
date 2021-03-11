import * as React from "react";
import Home from "./Home";
import Login from "./Login";

class App extends React.Component<{}, {}> {
  constructor(props: object) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <React.Fragment>
        F
        <Login />
        <Home />
      </React.Fragment>
    );
  }
}

export default App;
