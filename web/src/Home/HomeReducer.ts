import { Reducer } from "redux";
import { HomeActions } from "./HomeActions";
const DefaultState = {
  loading: false,
  data: [],
  errorMsg: "",
  count: 0,
};

export const HomeReducer: Reducer = (state = DefaultState, action) => {
  switch (action.type) {
    case HomeActions.SEARCH:
      console.log("searching");
      break;
    default:
      console.log(action.type);
      return DefaultState;
  }
};
