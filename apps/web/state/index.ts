import { compose, applyMiddleware, createStore, Store } from "redux";
import { connect } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import root from "./reducers";

const enhancer = compose(applyMiddleware(thunk));
const store = () => createStore(root, enhancer);

export type IStore = ReturnType<typeof store>;
export type IState = ReturnType<IStore["getState"]>;

export const wrapper = createWrapper<Store<IState>>(store, {
  debug: false,
});

export { connect };
