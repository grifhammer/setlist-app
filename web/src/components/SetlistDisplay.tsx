import React, { FunctionComponent } from "react";
import { Setlist } from "types";

interface ISetlistDisplayProps {
  setlist: Setlist;
}

const SetlistDisplay: FunctionComponent<ISetlistDisplayProps> = ({
  setlist: {
    eventDate,
    sets: { set },
    ...setlist
  },
}) => {
  console.log(setlist);
  if (set.length > 0) {
    return <div>{eventDate}</div>;
  }
  return null;
};

export default SetlistDisplay;
