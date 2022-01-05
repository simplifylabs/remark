import { AnyAction } from "redux";
import { SET_LOGGED_IN, SET_ID } from "@browser/actions/user";

export interface UserState {
  id: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  id: "",
  isLoggedIn: false,
};

export default (
  state: UserState = initialState,
  action: AnyAction
): UserState => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return { ...state, isLoggedIn: action.to };
    case SET_ID:
      return { ...state, id: action.to };
    default:
      return { ...state };
  }
};
