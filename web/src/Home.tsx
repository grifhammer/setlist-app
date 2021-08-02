import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
} from "react";
import "./Home.css";
import { useDispatch } from "react-redux";
import GetPopularArtists from "./actions/GetPopularArtists";

const Home: FunctionComponent<{ history: any }> = ({ history }) => {
  const [searchString, setSearch] = useState("");
  const dispatch = useDispatch();
  const FetchData = useCallback(
    (page: number) => {
      dispatch(GetPopularArtists(page));
    },
    [dispatch]
  );

  useEffect(() => {
    FetchData(1);
  }, [FetchData]);

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
