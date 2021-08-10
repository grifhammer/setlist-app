import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";
export const history = createBrowserHistory();
interface ReduxToolsWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: <R>(a: R) => R;
}
const formattedWindow = window as ReduxToolsWindow & typeof globalThis;
const composeEnhancers =
  formattedWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore(preloadedState: any) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeEnhancers(applyMiddleware(routerMiddleware(history)))
  );

  return store;
}
