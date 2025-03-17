const blankState = {
  username: "",
  loggedIn: false,
  score: 0,
};

const getInitialState = () => {
  return {
    username: localStorage.getItem("username") || "",
    loggedIn: !!localStorage.getItem("username"),
  };
};

const sessionsReducer = (state, action) => {
  if (!state) {
    state = getInitialState();
  }
  switch (action.type) {
    case "LOGIN":
      return {
        username: action.payload.username,
        score: action.payload.score,
        loggedIn: true,
        token: action.payload.jwt,
      };
    case "UPDATE_SCORE":
      return {
        ...state,
        score: action.payload.score,
      };
    case "LOGOUT":
      return blankState;
    default:
      return state;
  }
};

export default sessionsReducer;
