import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";

const createRootReducer = (history: History<History.PoorMansUnknown>) =>
  combineReducers({
    router: connectRouter(history)
  });

export default createRootReducer;
