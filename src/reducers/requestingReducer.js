const initialState = true;

const requestingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUESTING":
      return true;
    case "COMPLETED_REQUESTING":
      return false;
    default:
      return state;
  }
};

export default requestingReducer;
