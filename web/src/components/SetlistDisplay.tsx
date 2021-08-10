import React, { FunctionComponent } from "react";
import { Setlist } from "types";

interface ISetlistDisplayProps {
  setlist: Setlist;
}

const SetlistDisplay: FunctionComponent<ISetlistDisplayProps> = ({
  setlist: {
    eventDate,
    venue,
    sets: { set },
    ...setlist
  },
}) => {
  console.log(setlist);
  if (set.length > 0) {
    return (
      <div>
        {venue.name}
        {eventDate}
      </div>
    );
  }
  return null;
};

export default SetlistDisplay;
