import { AnyAction } from "redux";
import { INotification } from "@browser/util/notification";
import { ADD_LIST, SET_LIST, SET_RATE } from "@browser/actions/notification";

export interface NotificationState {
  total: number;
  unread: boolean;
  rate: boolean;
  list: INotification[];
}

const initialState: NotificationState = {
  total: 0,
  unread: false,
  rate: false,
  list: [],
};

export default (
  state: NotificationState = initialState,
  action: AnyAction
): NotificationState => {
  switch (action.type) {
    case SET_LIST:
      return {
        ...state,
        total: action.total,
        unread: action.unread,
        list: action.list,
      };
    case ADD_LIST:
      return {
        ...state,
        total: action.total,
        unread: action.unread,
        list: [...state.list, action.list],
      };
    case SET_RATE:
      return {
        ...state,
        rate: action.to,
      };
    default:
      return { ...state };
  }
};
