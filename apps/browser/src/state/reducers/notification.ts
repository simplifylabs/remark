import { AnyAction } from "redux";
import { INotification } from "@browser/util/notification";
import { ADD_LIST, SET_LIST } from "@browser/actions/notification";

export interface NotificationState {
  total: number;
  unread: boolean;
  list: INotification[];
}

const initialState: NotificationState = {
  total: 0,
  unread: false,
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
    default:
      return { ...state };
  }
};
