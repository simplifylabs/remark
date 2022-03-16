import { Dispatch } from "redux";

export const SET_LIST = "SET_NOTIFICATION_LIST";
export const ADD_LIST = "ADD_NOTIFICATION_LIST";
export const SET_RATE = "SET_NOTIFICATION_RATE";

export const updateNotifications =
  (data: any) => async (dispatch: Dispatch) => {
    dispatch({
      type: SET_LIST,
      list: data.list,
      total: data.total,
      unread: data.unread,
    });
  };

export const fetchNotifications = () => async (dispatch: Dispatch) => {
  chrome.runtime.sendMessage("NOTIFICATIONS:GET", (data) => {
    dispatch({
      type: SET_LIST,
      list: data.list,
      total: data.total,
      unread: data.unread,
    });
  });
};

export const fetchMoreNotifications = () => async () => {
  chrome.runtime.sendMessage("NOTIFICATIONS:MORE");
};

export const showRate = () => async (dispatch: Dispatch) => {
  dispatch({
    type: SET_RATE,
    to: true,
  });
};

export const hideRate = () => async (dispatch: Dispatch) => {
  dispatch({
    type: SET_RATE,
    to: false,
  });
};
