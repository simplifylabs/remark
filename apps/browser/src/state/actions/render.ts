import { Dispatch } from "redux";
import { SET_TYPING } from "@actions/comment";

export const SHOW_FAB = "SHOW_FAB";
export const HIDE_FAB = "HIDE_FAB";
export const DISABLE_RENDER = "DISABLE_RENDER";
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const HIDE_SIDEBAR = "HIDE_SIDEBAR";
export const SHOW_SIDEBAR = "SHOW_SIDEBAR";

export const showFab = () => async (dispatch: Dispatch) => {
  dispatch({
    type: SHOW_FAB,
  });
};

export const hideFab = () => async (dispatch: Dispatch) => {
  dispatch({
    type: HIDE_FAB,
  });

  setTimeout(() => {
    dispatch({
      type: DISABLE_RENDER,
    });
  }, 200);
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
