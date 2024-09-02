const initialState = {
  username: "",
  loggedIn: false,
};

const sessionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        username: action.payload.username,
        loggedIn: true,
        token: action.payload.jwt,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default sessionsReducer;
