import React, { FunctionComponent } from "react";

import Artist from "src/store/artist/types";
import ISetlist from "src/models/Setlist";

// import SetlistDisplay from "./SetlistDisplay";

import "./ArtistSelector.css";
import SetlistDisplay from "./SetlistDisplay";
import { History, Location } from "history";

interface ArtistSelectorProps {
  history: History;
  location: Location<{ artists: Artist[]; selectedArtist: string }>;
}

const ArtistSelector: FunctionComponent<ArtistSelectorProps> = ({
  location: {
    state: { artists, ...state },
  },
  ...props
}) => {
  if (artists.length <= 0) {
    return null;
  }
  const artistElements = artists.map((artist: Artist) => {
    return (
      <div
        className="artist-selector"
        onClick={() => props.history.push("/")}
        key={artist.mbid}
      >
        {artist.name} {artist.disambiguation}
        {/* {state.selectedArtist &&
          state.selectedArtist === artist.mbid &&
          state.setlists.map((result: ISetlist) => {
            return <SetlistDisplay key={result.id} setlist={result} />;
          })} */}
      </div>
    );
  });
  return <form>{artistElements}</form>;
};

export default ArtistSelector;
