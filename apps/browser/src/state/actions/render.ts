import { Dispatch } from "redux";
import { SET_TYPING } from "@browser/actions/comment";

export type Page = "HOME" | "INBOX";

export const SHOW_FAB = "SHOW_FAB";
export const HIDE_FAB = "HIDE_FAB";
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const HIDE_SIDEBAR = "HIDE_SIDEBAR";
export const SHOW_SIDEBAR = "SHOW_SIDEBAR";
export const SET_DARK = "SET_DARK";
export const SET_PAGE = "SET_PAGE";

export const showFab =
  (autoShown = false) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: SHOW_FAB,
      autoShown,
    });
  };

export const hideFab = () => async (dispatch: Dispatch) => {
  dispatch({
    type: HIDE_FAB,
  });
};

export const showSidebar = () => async (dispatch: Dispatch) => {
  dispatch({
    type: SHOW_SIDEBAR,
  });
};

export const hideSidebar = () => async (dispatch: Dispatch) => {
  dispatch({
    type: SET_TYPING,
    to: false,
  });

  dispatch({
    type: HIDE_SIDEBAR,
  });
};

export const setDark = (to: boolean) => async (dispatch: Dispatch) => {
  dispatch({
    type: SET_DARK,
    to,
  });
};

export const setPage = (to: Page) => async (dispatch: Dispatch) => {
  dispatch({
    type: SET_PAGE,
    to,
  });
};
