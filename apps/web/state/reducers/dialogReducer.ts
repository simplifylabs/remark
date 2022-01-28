import {
  ISnackbar,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
  REMOVE_SNACKBAR,
} from "@web/actions/dialog";
import { AnyAction } from "redux";

export interface DialogState {
  snackbars: ISnackbar[];
}

const initialState: DialogState = {
  snackbars: [],
};

export default (
  state: DialogState = initialState,
  action: AnyAction
): DialogState => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return {
        ...state,
        snackbars: [...state.snackbars, action.data],
      };
    case HIDE_SNACKBAR:
      const snackbars = [...state.snackbars];
      let index = snackbars.findIndex((item) => item.id == action.id);
      if (index == -1) return state;
      snackbars[index].showen = false;
      return {
        ...state,
        snackbars,
      };
    case REMOVE_SNACKBAR:
      const list = state.snackbars.filter((item) => item.id !== action.id);
      return {
        ...state,
        snackbars: list,
      };
    default:
      return { ...state };
  }
};
