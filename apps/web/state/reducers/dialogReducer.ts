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
      return hideSnackbar(state, action);
    case REMOVE_SNACKBAR:
      return removeSnackbar(state, action);
    default:
      return { ...state };
  }
};

function hideSnackbar(state: DialogState, action: AnyAction) {
  const snackbars = [...state.snackbars];
  const index = snackbars.findIndex((item) => item.id == action.id);

  if (index == -1) return state;
  snackbars[index].showen = false;

  return {
    ...state,
    snackbars,
  };
}

function removeSnackbar(state: DialogState, action: AnyAction) {
  const list = state.snackbars.filter((item) => item.id !== action.id);
  return {
    ...state,
    snackbars: list,
  };
}
