import { SystemActionTypes, SystemState, UPDATE_ARTIST } from "./types";

import Artist from "../../store/artist/types";

const emptyList: Artist[] = [];

const initialState: SystemState = {
  artistName: "",
  artists: emptyList
};
export default function systemReducer(
  state = initialState,
  action: SystemActionTypes
): SystemState {
  switch (action.type) {
    case UPDATE_ARTIST: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
}
