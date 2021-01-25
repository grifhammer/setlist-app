import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import createRootReducer from "./reducers";

export const history = createBrowserHistory();

const initialState = {};
const enhancers: any[] = [];
const middleware = [thunk, routerMiddleware(history)];

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
export default function configureStore() {
  const store = createStore(
    createRootReducer(history),
    initialState,
    composedEnhancers
  );
  return store;
}
