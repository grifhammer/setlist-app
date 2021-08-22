import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./configureStore";
import AmplifyConfig from "./config/amplify";
const store = configureStore({});

console.log(process.env, AmplifyConfig);
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
