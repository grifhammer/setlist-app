import React, { FunctionComponent, useState, useEffect } from "react";
import "./Home.css";
import { useDispatch } from "react-redux";
import GetPopularArtists from "./actions/GetPopularArtists";

const Home: FunctionComponent<{ history: any }> = ({ history }) => {
  const [searchString, setSearch] = useState("");
  const dispatch = useDispatch();
  const FetchData = (page: number) => {
    dispatch(GetPopularArtists(page));
  };

  useEffect(() => {
    FetchData(1);
  }, []);

  return (
    <div>
      <form
        onSubmit={() => {
          history.push(`/search/${searchString}`);
        }}
      >
        <label>
          Artist:
          <input type="text" onChange={(e) => setSearch(e.target.value)} />
        </label>
        <input type="submit" value="submit form" />
      </form>
    </div>
  );
};

export default Home;
