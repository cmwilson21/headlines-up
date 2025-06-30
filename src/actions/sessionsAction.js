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
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("username", data.username);
      dispatch({ type: "LOGIN", payload: data });
      dispatch({ type: "CLEAR_ERRORS" });
      dispatch({ type: "COMPLETED_REQUESTING" });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    dispatch({ type: "LOGOUT" });
  };
};

export const fetchScore = () => {
  return async (dispatch) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const resp = await fetch("/user/score", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (resp.status === 401) {
        dispatch({ type: "LOGOUT" });
        return;
      }

      const data = await resp.json();
      if (data.errors) {
        dispatch({ type: "ERRORS", payload: data.errors });
      } else {
        dispatch({ type: "UPDATE_SCORE", payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const guess = (articleHash, selection) => {
  return async (dispatch) => {
    const jwt = localStorage.getItem("jwt");

    const resp = await fetch("/user/guess", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ articleHash, selection }),
    });

    const data = await resp.json();
    if (data.errors) {
      dispatch({ type: "ERRORS", payload: data.errors });
    } else {
      dispatch({ type: "UPDATE_GUESS", payload: data });
    }
  };
};
