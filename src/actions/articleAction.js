import { apiUrl } from "../Globals";
let requestNum = 0;
// export const loadArticle = (token, currentUser) => {
export const loadArticle = () => {
  return async (dispatch) => {
    dispatch({ type: "REQUESTING" });
    const resp = await fetch(apiUrl + "&page=" + requestNum++);
    // const resp = await fetch(apiUrl);
    const data = await resp.json();
    dispatch({ type: "GET_ARTICLES", payload: data.articles });
    dispatch({ type: "COMPLETED_REQUESTING" });
  };
};
