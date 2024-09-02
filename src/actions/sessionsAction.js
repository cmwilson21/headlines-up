export const signup = (details) => {
  return async (dispatch) => {
    dispatch({ type: "REQUESTING" });

    const resp = await fetch("/signup", {
      method: "PUT",
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
      localStorage.setItem("username", data.username);
      dispatch({ type: "LOGIN", payload: data });
      dispatch({ type: "CLEAR_ERRORS" });
      dispatch({ type: "COMPLETED_REQUESTING" });
    }
  };
};

// export const getCurrentUser = () => {
//   return async (dispatch) => {
//     dispatch({ type: "REQUESTING" });
//     const jwt = localStorage.getItem("jwt");
//     const response = await fetch("user/data", {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${jwt}`,
//       },
//     });
//     const data = await response.json();
//     const payload = { user: data.user, jwt: jwt };
//     if (data.user) {
//       dispatch({ type: "LOGIN", payload });
//     }
//     dispatch({ type: "COMPLETED_REQUESTING" });
//   };
// };

export const login = (details) => {
  return async (dispatch) => {
    dispatch({ type: "REQUESTING" });

    const resp = await fetch("/login", {
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
      localStorage.setItem("username", data.username);
      dispatch({ type: "LOGIN", payload: data });
      dispatch({ type: "CLEAR_ERRORS" });
      dispatch({ type: "COMPLETED_REQUESTING" });
    }
  };
};
