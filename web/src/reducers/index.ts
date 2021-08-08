import { combineReducers } from "redux";
import { HomeReducer } from "../Home/HomeReducer";
import { ArtistReducer } from "./ArtistReducer";
const RootReducer = combineReducers({
  Home: HomeReducer,
  Login: HomeReducer,
  Artist: ArtistReducer,
});

export default RootReducer;
