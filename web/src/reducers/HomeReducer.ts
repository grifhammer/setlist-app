import { Reducer } from "redux";

const DefaultState = {
  loading: false,
  data: [],
  errorMsg: "",
  count: 0,
};

export const HomeReducer: Reducer = (state = DefaultState, action) => {
  switch (action.type) {
    default:
      console.log(action.type);
      return DefaultState;
  }
};
