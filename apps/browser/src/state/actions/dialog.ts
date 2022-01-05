import { Dispatch } from "redux";
import { level } from "@util/dialog";

export interface ISnackbarData {
  id: string;
  type: "SNACKBAR" | "TOAST";
  level: level;
  text: string;
}

export interface ISnackbar extends ISnackbarData {
  showen: boolean;
}

export interface IModal {
  id: string;
  title: string;
  text: string;
  buttons: IButton[];
}

export interface IButton {
  type: "PRIMARY" | "LINK";
  text: string;
  onClick?: () => void;
}

export const SHOW_MODAL = "SHOW_MODAL";
export const SHOW_SNACKBAR = "SHOW_SNACKBAR";
export const HIDE_SNACKBAR = "HIDE_SNACKBAR";
export const REMOVE_MODAL = "REMOVE_MODAL";
export const REMOVE_SNACKBAR = "REMOVE_SNACKBAR";

export const showModal = (data: IModal) => async (dispatch: Dispatch) => {
  dispatch({
    type: SHOW_MODAL,
    data: data as IModal,
  });
};

export const showSnackbar =
  (data: ISnackbarData) => async (dispatch: Dispatch) => {
    dispatch({
      type: SHOW_SNACKBAR,
      data: { ...data, showen: true } as ISnackbar,
    });

    if (data.type == "TOAST") {
      setTimeout(() => {
        dispatch(hideSnackbar(data.id) as any);
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

export const removeModal = (id: string) => async (dispatch: Dispatch) => {
  dispatch({
    type: REMOVE_MODAL,
    id,
  });
};
