import { apiUrl } from "../Globals";

export const signup = (details, history) => {
  return async (dispatch) => {
    dispatch({ type: "REQUESTING" });

    const resp = await fetch(apiUrl + "/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });

    const data = await resp.json();
    if (data.errors) {
      dispatch({ type: "ERRORS", payload: data.errors });
    } else {
      // console.log('data', data)
      localStorage.setItem("jwt", data.jwt);
      dispatch({ type: "LOGIN", payload: data });
      dispatch({ type: "CLEAR_ERRORS" });
      dispatch({ type: "COMPLETED_REQUESTING" });
      history.push("/");
    }
  };
};
