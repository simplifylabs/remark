import {
  ISnackbar,
  IModal,
  SHOW_MODAL,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
  REMOVE_SNACKBAR,
  REMOVE_MODAL,
} from "@browser/actions/dialog";
import { AnyAction } from "redux";

export interface DialogState {
  snackbars: ISnackbar[];
  modals: IModal[];
}

const initialState: DialogState = {
  snackbars: [],
  modals: [],
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
      var list = [...state.snackbars];
      var index = list.findIndex((item) => item.id == action.id);
      if (index == -1) return state;
      list[index].showen = false;
      return {
        ...state,
        snackbars: list,
      };
    case REMOVE_SNACKBAR:
      var list = state.snackbars.filter((item) => item.id !== action.id);
      return {
        ...state,
        snackbars: list,
      };
    case SHOW_MODAL:
      return {
        ...state,
        modals: [...state.modals, action.data],
      };
    case REMOVE_MODAL:
      var modals = state.modals.filter((item) => item.id !== action.id);
      return {
        ...state,
        modals,
      };
    default:
      return { ...state };
  }
};
