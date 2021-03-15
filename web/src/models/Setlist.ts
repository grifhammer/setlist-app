import { Setlist } from "types";

interface ISetlist extends Setlist {
  name: string;
  spotify_id?: string;
  mbid: string;
}

export default ISetlist;
