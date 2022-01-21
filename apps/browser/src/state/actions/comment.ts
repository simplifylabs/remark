import API from "@browser/util/api";
import Error from "@browser/util/error";
import Render from "@browser/util/render";
import query from "query-string";
import { Dispatch } from "redux";
import { Toast } from "@browser/util/dialog";
import { SHOW_SIDEBAR } from "./render";
import { IAuthor } from "@browser/reducers/comment";

export const SET_TYPING = "SET_TYPING";
export const SET_SHARED = "SET_SHARED";
export const SET_COMMENT_LIST = "SET_COMMENT_LIST";
export const ADD_COMMENT_LIST = "ADD_COMMENT_LIST";
export const ADD_COMMENT = "ADD_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const SET_REPLYING = "SET_REPLYING";

export const setTyping =
  (to = true) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: SET_TYPING,
      to,
    });
  };

export const voteComment =
  (id: string, type: "UP" | "DOWN") => async (dispatch: Dispatch) => {
    const res = await API.post(["comment", id, "vote"], { type });
    if (!res.success) return Error.handle(res);

    dispatch({
      type: UPDATE_COMMENT,
      id,
      action: res.body.action,
      voteType: type,
    });
  };

export const removeComment = (id: string) => async (dispatch: Dispatch) => {
  const res = await API.delete(["comment", id]);
  if (!res.success) return Error.handle(res);

  dispatch({
    type: REMOVE_COMMENT,
    id,
  });
};

export const setReplying =
  (comment: { id: string; author: IAuthor }) => async (dispatch: Dispatch) => {
    dispatch({
      type: SET_REPLYING,
      to: { commentId: comment.id, author: comment.author },
    });
  };

export const postComment =
  (text: string, replyTo: string | null, success: () => void) =>
  async (dispatch: Dispatch) => {
    const res = await API.post(["comment"], {
      comment: text,
      url: window.location.href,
      ...(replyTo && { replyTo }),
    });

    if (res.success) success();
    if (!res.success) return Error.handle(res);

    dispatch({
      type: ADD_COMMENT,
      data: res.body,
      replyTo,
    });

    dispatch({
      type: SET_TYPING,
      to: false,
    });
  };

export const fetchComments =
  (page = 0) =>
  async (dispatch: Dispatch) => {
    let autoOpenSidebar = false;
    const url = encodeURIComponent(window.location.href);

    const parsed = query.parse(location.search);
    if (page == 0 && parsed.remark && typeof parsed.remark == "string") {
      const single = await API.get(["comment", parsed.remark, `?url=${url}`]);

      if (single.success) {
        autoOpenSidebar = true;

        dispatch({
          type: SET_SHARED,
          to: single.body.comment,
        });

        return;
      }

      Toast.error("Failed to load shared Remark");
    }

    const res = await API.get(["comment", `list?page=${page}&url=${url}`]);

    if (!res.success) return;
    if (page == 0) {
      dispatch({
        type: SET_COMMENT_LIST,
        list: res.body.list,
        total: res.body.total,
        parents: res.body.parents,
        votes: res.body.votes,
      });

      Render.call("comments:loaded", res.body.total);
    } else {
      dispatch({
        type: ADD_COMMENT_LIST,
        list: res.body.list,
        total: res.body.total,
        parents: res.body.parents,
        page,
      });
    }

    if (autoOpenSidebar)
      setTimeout(() => {
        dispatch({ type: SHOW_SIDEBAR });
      }, 500);
  };
