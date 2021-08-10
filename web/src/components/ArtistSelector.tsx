import React, { FunctionComponent, useEffect } from "react";

import Artist from "src/store/artist/types";

import "./ArtistSelector.css";
import { History, Location } from "history";
import { useDispatch, useSelector } from "react-redux";
import { searchArtist, searchSetlists } from "src/reducers/ArtistReducer";
import { useParams } from "react-router-dom";
import ISetlist from "src/models/Setlist";
import SetlistDisplay from "./SetlistDisplay";

interface ArtistSelectorProps {
  history: History;
  location: Location<{ artists: Artist[]; selectedArtist: string }>;
}

const ArtistSelector: FunctionComponent<ArtistSelectorProps> = ({
  ...props
}) => {
  const { artist } = useParams();
  const dispatch = useDispatch();
  const { artists, setlists } = useSelector((store) => {
    console.log(store);
    return store.Artist;
  });

  useEffect(() => {
    const fetchData = async () => {
      await searchArtist(artist)(dispatch);
    };
    fetchData();
  }, [artist, dispatch]);
  if (!artists || artists.length <= 0) {
    return null;
  }
  const artistElements = artists.map((artist: Artist) => {
    return (
      <div
        className="artist-selector"
        onClick={() => {
          searchSetlists(artist.mbid)(dispatch);
        }}
        key={artist.mbid}
      >
        {artist.name} {artist.disambiguation}
        {setlists[artist.mbid].map((result: ISetlist) => {
          return <SetlistDisplay key={result.id} setlist={result} />;
        })}
      </div>
    );
  });
  return <form>{artistElements}</form>;
};

export default ArtistSelector;
