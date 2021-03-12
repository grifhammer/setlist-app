import { Coords } from "./Coords";
import { Country } from "./Country";

export interface City {
  id: string;
  name: string;
  stateCode: string;
  state: string;
  coords: Coords;
  country: Country;
}
