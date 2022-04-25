import { apiUrl } from "../Globals";

// export const loadArticle = (token, currentUser) => {
export const loadArticle = () => {
  // console.log("current user trips action 2", currentUser)
  return async (dispatch) => {
    dispatch({ type: "REQUESTING" });
    const resp = await fetch(
      apiUrl
      // , {
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     Authorization: `bearer ${token}`,
      //   },
      // }
    );
    const data = await resp.json();
    dispatch({ type: "GET_ARTICLES", payload: data });
    // console.log("data from trips action", data)
    // debugger
    dispatch({ type: "COMPLETED_REQUESTING" });
  };
};
