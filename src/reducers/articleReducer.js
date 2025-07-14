const initialState = { number: 0, list: [] };

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
        const list = state.list.concat(withRandom.map((item) => item.article));
        return { ...state, list };
      } else {
        return state;
      }
    case "SET_ARTICLE_NUMBER":
      return { ...state, number: action.payload };
    default:
      return state;
  }
};

export default articleReducer;
