import { connect, Provider } from "react-redux";
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import render from "@browser/reducers/render";
import dialog from "@browser/reducers/dialog";
import notification from "@browser/reducers/notification";
import connection from "@browser/reducers/connection";
import comment from "@browser/reducers/comment";
import user from "@browser/reducers/user";

export const store = createStore(
  combineReducers({
    user,
    connection,
    notification,
    render,
    dialog,
    comment,
  }),
  compose(applyMiddleware(thunk))
);

// eslint-ignore-next-line
export const dispatch = (data: any) => store.dispatch(data);
export type IRootState = ReturnType<typeof store.getState>;
export { Provider, connect };
