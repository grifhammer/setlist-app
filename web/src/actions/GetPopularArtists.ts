export const GetPopularArtists = (page: number) => {
  return async (dispatch: any) => {
    try {
      dispatch({
        type: "POPULAR_ARTISTS_LOADING",
      });

      const res = await fetch("");
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
