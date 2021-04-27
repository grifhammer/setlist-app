import { combineReducers } from "redux";
import { HomeReducer } from "./HomeReducer";

const RootReducer = combineReducers({
  Home: HomeReducer,
  Login: HomeReducer,
});

export default RootReducer;
