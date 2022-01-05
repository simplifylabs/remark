import { connect, Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const enhancer = compose(applyMiddleware(thunk));
export const store = createStore(rootReducer, enhancer);
export type IRootState = ReturnType<typeof store.getState>;
export { Provider, connect };
