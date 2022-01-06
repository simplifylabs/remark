import { Dispatch } from "redux";
import { level } from "@web/util/dialog";

export interface ISnackbarData {
  type: "SNACKBAR" | "TOAST";
  level: level;
  text: string;
}

export interface ISnackbar extends ISnackbarData {
  id: string;
  showen: boolean;
}

export const SHOW_SNACKBAR = "SHOW_SNACKBAR";
export const HIDE_SNACKBAR = "HIDE_SNACKBAR";
export const REMOVE_SNACKBAR = "REMOVE_SNACKBAR";

export const showSnackbar =
  (data: ISnackbarData) => async (dispatch: Dispatch) => {
    const id = Math.random().toString(16);

    dispatch({
      type: SHOW_SNACKBAR,
      data: { ...data, showen: true, id } as ISnackbar,
    });

    if (data.type == "TOAST") {
      setTimeout(() => {
        dispatch(hideSnackbar(id) as any);
      }, 2000);
    }
  };

export const hideSnackbar = (id: string) => async (dispatch: Dispatch) => {
  dispatch({
    type: HIDE_SNACKBAR,
    id,
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_SNACKBAR,
      id,
    });
  }, 250);
};
