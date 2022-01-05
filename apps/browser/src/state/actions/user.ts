import { Dispatch } from "redux";
import Storage from "@util/storage";
import User from "@util/user";

export const SET_LOGGED_IN = "SET_LOGGED_IN";
export const SET_ID = "SET_ID";

export const checkLoggedIn = () => async (dispatch: Dispatch) => {
  const refresh = await Storage.get("refresh_token");
  const access = await Storage.get("access_token");

  dispatch({
    type: SET_LOGGED_IN,
    to: access && refresh,
  });

  if (!access || !refresh) {
    dispatch({ type: SET_ID, to: "" });
    return;
  }

  const res = await User.me();
  if (res.success) dispatch({ type: SET_ID, to: res.body.id });
};
