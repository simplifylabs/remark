import { Dispatch } from "redux";
import { Storage } from "@browser/util/browser";
import User from "@browser/util/user";

export const SET_LOGGED_IN = "SET_LOGGED_IN";
export const SET_ID = "SET_ID";

export const checkLoggedIn = () => async (dispatch: Dispatch) => {
  const refresh = await Storage.get("refresh_token");
  User.refreshTokenCache = refresh;

  const access = await Storage.get("access_token");
  User.accessTokenCache = access;

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
