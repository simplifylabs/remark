import { combineReducers } from "redux";
import renderReducer from "./renderReducer";
import dialogReducer from "./dialogReducer";
import connectionReducer from "./connection";
import commentReducer from "./commentReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  connection: connectionReducer,
  render: renderReducer,
  dialog: dialogReducer,
  comment: commentReducer,
});

export default rootReducer;
