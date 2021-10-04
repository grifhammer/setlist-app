import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { UserReducer } from "./UserReducer";
import { ArtistReducer } from "./ArtistReducer";
import { History } from "history";

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    User: UserReducer,
    Artist: ArtistReducer,
  });
export default createRootReducer;
