import * as React from "react";
import Home from "./components/Home";
import Login from "./Login";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import SetlistDisplay from "./components/SetlistDisplay";
import ArtistSelector from "./components/ArtistSelector";
import Register from "./Register";
import { useSelector } from "react-redux";
import { UserState } from "./reducers/UserReducer";

const App: React.FunctionComponent<{}> = () => {
  const { loggedIn } = useSelector<{ User: any }, UserState>((store) => {
    console.log(store);
    return store.User;
  });
  return (
    <React.Fragment>
      <NavLink className="App-header" to="/">
        Setlist Saver
      </NavLink>
      {`I am ${loggedIn ? "" : "not"} logged in`}
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/register"} component={Register} />
        <Route exact path={"/login"} component={Login} />
        <Route exact path="/search/artist/:artist" component={ArtistSelector} />
        <Route exact path="/artist/:mbid" component={SetlistDisplay} />
        <Redirect to={"/"} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
