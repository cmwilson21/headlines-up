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
        loggedIn: true,
        token: action.payload.jwt,
      };
    case "UPDATE_SCORE":
      return {
        ...state,
        score: action.payload.score,
      };
    case "UPDATE_GUESS":
      return {
        ...state,
        score: state.score + (action.payload.correctGuess ? 1 : 0),
        lastSource: action.payload.source,
        isGuessCorrect: action.payload.correctGuess,
      };
    case "LOGOUT":
      return blankState;
    default:
      return state;
  }
};

export default sessionsReducer;
