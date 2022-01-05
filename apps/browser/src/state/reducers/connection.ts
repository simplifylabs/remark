import {} from "@actions/dialog";
import { AnyAction } from "redux";
import {
  SET_IS_ONLINE,
  SET_CLIENT_ONLINE,
  SET_SERVER_ONLINE,
} from "@actions/connection";

export interface ConnectionState {
  online: boolean;
  serverOn: boolean;
  clientOn: boolean;
}

const initialState: ConnectionState = {
  online: true,
  serverOn: true,
  clientOn: true,
};

export default (
  state: ConnectionState = initialState,
  action: AnyAction
): ConnectionState => {
  switch (action.type) {
    case SET_IS_ONLINE:
      return { ...state, online: action.to };
    case SET_SERVER_ONLINE:
      return { ...state, serverOn: action.to };
    case SET_CLIENT_ONLINE:
      return { ...state, clientOn: action.to };
    default:
      return { ...state };
  }
};
