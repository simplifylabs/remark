import { combineReducers } from "redux";
import dialogReducer from "./dialogReducer";

export default combineReducers({
  dialog: dialogReducer,
});
