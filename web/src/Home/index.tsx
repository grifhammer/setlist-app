import React, { FunctionComponent, useState, useReducer } from "react";
import "./Home.css";
import { HomeActions } from "./HomeActions";
import { HomeReducer } from "./HomeReducer";
const Home: FunctionComponent<{ history: any }> = ({ history }) => {
  const [searchString, setSearch] = useState("");
  const [state, dispatch] = useReducer(HomeReducer, {});

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (searchString) {
            dispatch({ type: HomeActions.SEARCH, data: searchString });
          }
        }}
      >
        <label>
          Artist:
          <input
            type="text"
            value={searchString}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <input type="submit" value="submit form" />
      </form>
    </div>
  );
};

export default Home;