import {
  SHOW_FAB,
  HIDE_FAB,
  TOGGLE_SIDEBAR,
  HIDE_SIDEBAR,
  SHOW_SIDEBAR,
  SET_DARK,
  SET_PAGE,
  Page,
} from "@browser/actions/render";
import { AnyAction } from "redux";

export interface RenderState {
  fab: boolean;
  sidebar: boolean;
  page: Page;
  dark: boolean;
}

const initialState: RenderState = {
  fab: false,
  sidebar: false,
  page: "HOME",
  dark: false,
};

export default (
  state: RenderState = initialState,
  action: AnyAction
): RenderState => {
  switch (action.type) {
    case SHOW_FAB:
      return {
        ...state,
        fab: true,
      };
    case HIDE_FAB:
      return {
        ...state,
        fab: false,
        sidebar: false,
      };
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebar: !state.sidebar,
      };
    case HIDE_SIDEBAR:
      return {
        ...state,
        sidebar: false,
      };
    case SHOW_SIDEBAR:
      return {
        ...state,
        sidebar: true,
        fab: true,
      };
    case SET_DARK:
      return {
        ...state,
        dark: action.to,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.to,
      };
    default:
      return { ...state };
  }
};
