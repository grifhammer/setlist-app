import { Setlist } from "./Setlist";
export interface SetlistSearch {
  setlist: Setlist[];
  total: number;
  page: number;
  itemsPerPage: number;
}
