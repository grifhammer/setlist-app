export const GetPopularArtists = (page: number) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "POPULAR_ARTISTS_LOADING",
      });

      const perPage = 10;
      const offset = page * perPage - perPage;

      const res = await axios.get();
      const data = res.json();
      dispatch({
        type: "POPULAR_ARTISTS_SUCCESS",
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: "POPULAR_ARTSITS_FAIL",
      });
    }
  };
};
