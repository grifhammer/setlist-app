import * as React from "react";
import Home from "./Home";
import Login from "./Login";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import SetlistDisplay from "./components/SetlistDisplay";
import ArtistSelector from "./components/ArtistSelector";

class App extends React.Component<{}, {}> {
  constructor(props: object) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <React.Fragment>
        <NavLink className="App-header" to="/">
          Setlist Saver
        </NavLink>
        <Switch>
          <Route exact path={"/"}>
            <Home />
          </Route>
          <Route exact path={"/login"}>
            <Login />
          </Route>
          <Route exact path="/search/:searchTerm">
            <ArtistSelector />
          </Route>
          <Route exact path="/artist/:mbid">
            <SetlistDisplay />
          </Route>
          <Redirect to={"/"} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
