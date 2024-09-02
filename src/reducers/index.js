import { combineReducers } from "redux";
import articleReducer from "./articleReducer";
import sessionsReducer from "./sessionsReducer";

export default combineReducers({
  article: articleReducer,
  auth: sessionsReducer,
});
