import { AnyAction } from "redux";
import {
  SET_TYPING,
  ADD_COMMENT,
  SET_SHARED,
  SET_REPLYING,
  SET_COMMENT_LIST,
  ADD_COMMENT_LIST,
  REMOVE_COMMENT,
  UPDATE_COMMENT,
} from "@browser/actions/comment";

export interface IComment {
  id: string;
  comment: string;
  author: IAuthor;
  upvotes: number;
  downvotes: number;
  replyId?: string;
  replies?: IComment[];
  createdAt: Date;
  shared?: boolean;
}

export interface IAuthor {
  id: string;
  username: string;
}

export interface IReply {
  commentId: string;
  author: IAuthor;
}

export interface CommentState {
  list: IComment[];
  shared: IComment | null;
  replying: IReply | null;
  page: number;
  total: number;
  parents: number;
  typing: boolean;
}

const initialState: CommentState = {
  list: [],
  shared: null,
  replying: null,
  page: 0,
  total: 0,
  parents: 0,
  typing: false,
};

/* eslint-disable no-var */
export default (
  state: CommentState = initialState,
  action: AnyAction
): CommentState => {
  switch (action.type) {
    case SET_TYPING:
      return { ...state, typing: action.to };
    case SET_COMMENT_LIST:
      return {
        ...state,
        page: 0,
        list: transform(action.list, state.shared),
        total: action.total,
        parents: action.parents,
      };
    case ADD_COMMENT_LIST:
      return {
        ...state,
        list: transform(state.list, state.shared),
        total: action.total,
        parents: action.parents,
        page: action.page,
      };
    case ADD_COMMENT:
      var list: IComment[] = [...state.list];
      var shared: IComment = state.shared;

      if (action.replyTo) {
        const index = list.findIndex(
          (c) => c.id == action.replyTo && !c.shared
        );
        if (index !== -1) list[index].replies.unshift(action.data);

        if (shared && list[index].id == shared.id) {
          if (shared.replies) shared.replies.unshift(action.data);
          else shared.replies = [action.data];
        }
      } else list.unshift(action.data);

      return {
        ...state,
        shared,
        list: transform(list, shared),
        total: (state.total || 0) + 1,
        parents: (state.parents || 0) + (action.data.replyId ? 0 : 1),
      };
    case REMOVE_COMMENT:
      var list: IComment[] = [...state.list];
      var removed = list.find((c) => c.id == action.id);

      if (!removed)
        list.forEach((c) => {
          const found = c.replies.find((c) => c.id == action.id);
          if (found) removed = found;
        });

      var shared = state.shared ? { ...state.shared } : null;
      if (shared) {
        if (shared.id == action.id) shared = null;
        else {
          const index = shared.replies.findIndex((r) => r.id == action.id);
          if (index !== -1) shared = null;
        }
      }

      list = list.filter((c) => c.id !== action.id);
      list.forEach((c) => {
        c.replies = c.replies.filter((c) => c.id !== action.id);
        return c;
      });

      if (!removed) return state;

      var parents = removed.replyId ? state.parents : state.parents - 1;
      var total = state.total - 1;
      if (removed.replies) total -= removed.replies.length;

      return {
        ...state,
        list: transform(list, shared),
        shared,
        total,
        parents,
      };
    case UPDATE_COMMENT:
      return update(state, action);
    case SET_SHARED:
      return {
        ...state,
        shared: { ...action.to, shared: true },
      };
    case SET_REPLYING:
      return {
        ...state,
        replying: action.to,
      };
    default:
      return { ...state };
  }
};
/* eslint-enable no-var */

function transform(list: IComment[], shared: IComment | null): IComment[] {
  list.forEach((r) => {
    if (!r.replyId) return;
    const index = list.findIndex((c) => c.id == r.replyId);
    if (index == -1) return;

    list[index].replies.push(r);
  });

  list = list.filter((c) => !c.replyId);

  const filtered = list.filter((c) => !c.shared);
  if (!shared) return filtered;
  return [shared, ...filtered];
}

function update(
  state: CommentState,
  { action, voteType, id }: AnyAction
): CommentState {
  let list = [...state.list];
  list = list.filter((c) => !c.shared);
  const index = list.findIndex((c) => c.id == id && !c.shared);

  let shared = state.shared ? { ...state.shared } : null;
  if (shared) {
    if (shared.id == id) shared = vote(shared, action, voteType);
    else {
      const reply = shared.replies.findIndex((r) => r.id == id);
      if (reply !== -1)
        shared.replies[reply] = vote(shared.replies[reply], action, voteType);
    }
  }

  if (index == -1) {
    list.forEach((c) => {
      const reply = c.replies.findIndex((r) => r.id == id);

      if (reply !== -1) {
        c.replies[reply] = vote(c.replies[reply], action, voteType);
        return c;
      }
    });
  } else {
    list[index] = vote(list[index], action, voteType);
  }

  return {
    ...state,
    shared,
    list: transform(list, shared),
  };
}

function vote(
  comment: IComment,
  action: "CREATED" | "DELETED" | "TOGGLED",
  voteType: "UP" | "DOWN"
) {
  if (action == "CREATED") {
    if (voteType == "UP") comment.upvotes++;
    else comment.downvotes++;
  } else if (action == "DELETED") {
    if (voteType == "UP") comment.upvotes--;
    else comment.downvotes--;
  } else {
    if (voteType == "UP") {
      comment.upvotes++;
      comment.downvotes--;
    } else {
      comment.upvotes--;
      comment.downvotes++;
    }
  }

  return { ...comment };
}
