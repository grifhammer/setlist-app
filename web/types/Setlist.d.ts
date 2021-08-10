import { Artist } from "./Artist";
import { Set } from "./Set";
import { Tour } from "./Tour";
import { Venue } from "./Venue";

export interface Setlist {
  artist: Artist;
  venue: Venue;
  tour: Tour;
  sets: { set: [Set] };
  info: string;
  url: string;
  id: string;
  versionId: string;
  lastFmEventId: number;
  eventDate: string;
  lastUpdated: string;
}
