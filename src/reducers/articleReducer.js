const initialState = [];

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ARTICLES":
      return action.payload;
    // return [...state, action.payload]
    // case "SET_TRIPS":
    //   return action.payload
    default:
      return state;
  }
};

export default articleReducer;
