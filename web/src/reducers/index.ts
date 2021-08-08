import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { HomeReducer } from "../Home/HomeReducer";
import { ArtistReducer } from "./ArtistReducer";
import { History } from "history";

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    Home: HomeReducer,
    Login: HomeReducer,
    Artist: ArtistReducer,
  });
export default createRootReducer;
