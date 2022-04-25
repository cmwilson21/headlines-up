import { combineReducers } from "redux";
import articleReducer from "./articleReducer";

export default combineReducers({
  article: articleReducer,
});
