import { Reducer } from "redux";
const LOGGED_OUT = "user/LOG_OUT";
const LOGGED_IN = "user/LOG_IN";
export interface UserState {
  username: string;
  loggedIn: boolean;
  loading: boolean;
  errorMsg?: string;
}
const DefaultState: UserState = {
  username: "",
  loggedIn: false,
  loading: false,
  errorMsg: "",
};
export const UserReducer: Reducer<
  any,
  {
    type: string;
    username: string;
  }
> = (state = DefaultState, { type, username }) => {
  switch (type) {
    case LOGGED_IN:
      return { ...state, loggedIn: true, username };
    case LOGGED_OUT:
      return { ...state, loggedIn: false, username: "" };
    default:
      return { ...state };
  }
};
