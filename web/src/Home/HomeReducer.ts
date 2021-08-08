import { Reducer } from "redux";
import { HomeActions } from "./HomeActions";

import { searchArtist } from "../reducers/ArtistReducer.ts";
const DefaultState = {
  loading: false,
  data: [],
  errorMsg: "",
  count: 0,
};

export const HomeReducer: Reducer = async (state = DefaultState, action) => {
  switch (action.type) {
    case HomeActions.SEARCH:
      console.log("searching");
      state.artists = await searchArtist(action.data);
      return state;
    default:
      console.log(action.type);
      return DefaultState;
  }
};
