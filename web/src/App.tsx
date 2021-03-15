import * as React from "react";
import Home from "./Home";
import Login from "./Login";

import "./App.css";
class App extends React.Component<{}, {}> {
  constructor(props: object) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <React.Fragment>
        <span className="App-header">Setlist Saver</span>
        <Login />
        <Home />
      </React.Fragment>
    );
  }
}

export default App;
