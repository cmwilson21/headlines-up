import { apiUrl } from "../Globals";
let requestNum = 0;
// export const loadArticle = (token, currentUser) => {
export const loadArticle = () => {
  return async (dispatch) => {
    dispatch({ type: "REQUESTING" });
    const jwt = localStorage.getItem("jwt");
    const resp = await fetch(apiUrl + "&page=" + requestNum++, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const data = await resp.json();
    dispatch({ type: "GET_ARTICLES", payload: data.articles });
    dispatch({ type: "COMPLETED_REQUESTING" });
  };
};
