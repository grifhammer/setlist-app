import * as React from "react";
import Home from "./Home/index";
import Login from "./Login";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
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
					<AmplifySignOut />
				</NavLink>
				<Switch>
					<Route exact path={"/"} component={Home} />
					<Route exact path={"/login"} component={Login} />
					<Route
						exact
						path="/search/artist/:artist"
						component={ArtistSelector}
					/>
					<Route
						exact
						path="/artist/:mbid"
						component={SetlistDisplay}
					/>
					<Redirect to={"/"} />
				</Switch>
			</React.Fragment>
		);
	}
}

export default withAuthenticator(App);
