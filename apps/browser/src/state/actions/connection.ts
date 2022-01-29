import { Dispatch } from "redux";
import isOnline from "is-online";

export const SET_IS_ONLINE = "SET_IS_ONLINE";
export const SET_CLIENT_ONLINE = "SET_CLIENT_ONLINE";
export const SET_SERVER_ONLINE = "SET_SERVER_ONLINE";

export const setIsOnline = (to: boolean) => async (dispatch: Dispatch) => {
  dispatch({
    type: SET_IS_ONLINE,
    to: to,
  });

  const client = await isOnline();
  if (client) {
    dispatch({
      type: SET_CLIENT_ONLINE,
      to: true,
    });

    dispatch({
      type: SET_SERVER_ONLINE,
      to: false,
    });
  } else {
    dispatch({
      type: SET_CLIENT_ONLINE,
      to: false,
    });

    dispatch({
      type: SET_SERVER_ONLINE,
      to: true,
    });
  }
};
