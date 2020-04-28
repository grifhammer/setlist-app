import Artist from "../../store/artist/types";

export const UPDATE_ARTIST = "UPDATE_ARTIST";

export interface SystemState {
  artistName: string;
  artists: Artist[];
}

interface UpdateSessionAction {
  type: typeof UPDATE_ARTIST;
  payload: SystemState;
}

export type SystemActionTypes = UpdateSessionAction;
