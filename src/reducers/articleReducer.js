const initialState = [];

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ARTICLES":
      if (action.payload) {
        console.log("payload", action.payload);
        let withRandom = action.payload.map((article) => {
          return {
            article,
            weight: Math.random(),
          };
        });
        withRandom.sort((a, b) => {
          return b.weight - a.weight;
        });
        return state.concat(withRandom.map((item) => item.article));
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default articleReducer;
