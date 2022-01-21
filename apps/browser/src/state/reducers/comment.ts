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

export interface IAuthor {
  id: string;
  username: string;
}

export interface IReply {
  commentId: string;
  author: IAuthor;
}

export interface IVote {
  post: {
    id: string;
  };
  type: "UP" | "DOWN";
}

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

export interface CommentState {
  list: IComment[];
  votes: IVote[];
  shared: IComment | null;
  replying: IReply | null;
  page: number;
  total: number;
  parents: number;
  typing: boolean;
}

const initialState: CommentState = {
  list: [],
  votes: [],
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
    case UPDATE_COMMENT:
      return updateComment(state, action);
    case ADD_COMMENT:
      return addComment(state, action);
    case REMOVE_COMMENT:
      return removeComment(state, action);
    case SET_TYPING:
      return { ...state, typing: action.to };
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
    case ADD_COMMENT_LIST:
      return update(state, {
        total: action.total,
        parents: action.parents,
        page: action.page,
      });
    case SET_COMMENT_LIST:
      return update(state, {
        ...state,
        page: 0,
        list: action.list,
        votes: action.votes,
        total: action.total,
        parents: action.parents,
      });
    default:
      return state;
  }
};
/* eslint-enable no-var */

function update(prev: CommentState, update: any): CommentState {
  const state = { ...prev, ...update };

  if (state.shared) {
    const filtered = state.list.filter((c: IComment) => !c.shared);
    state.list = [state.shared, ...filtered];
  }

  return state;
}

function removeComment(state: CommentState, action: AnyAction) {
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

  return update(state, {
    list,
    shared,
    total,
    parents,
  });
}

function addComment(state: CommentState, action: AnyAction) {
  var list: IComment[] = [...state.list];
  var shared: IComment = state.shared;

  if (action.replyTo) {
    const index = list.findIndex((c) => c.id == action.replyTo && !c.shared);
    if (index !== -1) list[index].replies.unshift(action.data);

    if (shared && list[index].id == shared.id) {
      if (shared.replies) shared.replies.unshift(action.data);
      else shared.replies = [action.data];
    }
  } else list.unshift(action.data);

  return update(state, {
    shared,
    list,
    total: (state.total || 0) + 1,
    parents: (state.parents || 0) + (action.data.replyId ? 0 : 1),
  });
}

function updateComment(
  state: CommentState,
  { action, voteType, id }: AnyAction
): CommentState {
  let votes: IVote[] = [...state.votes];

  if (action == "CREATED") votes.push({ post: { id }, type: voteType });
  else if (action == "DELETED") {
    votes = votes.filter((vote) => vote.post.id != id);
  } else if (action == "TOGGLED") {
    let index = votes.findIndex((vote) => vote.post.id == id);
    votes[index].type = voteType;
  }

  let shared = state.shared ? { ...state.shared } : null;
  if (shared) {
    if (shared.id !== id) {
      const reply = shared.replies.findIndex((r) => r.id == id);
      if (reply != -1)
        shared.replies[reply] = vote(shared.replies[reply], action, voteType);
    } else shared = vote(shared, action, voteType);
  }

  let list = [...state.list];
  list = list.filter((c) => !c.shared);
  const index = list.findIndex((c) => c.id == id && !c.shared);

  if (index == -1) {
    list.forEach((c) => {
      const reply = c.replies.findIndex((r) => r.id == id);
      if (reply == -1) return;
      c.replies[reply] = vote(c.replies[reply], action, voteType);
      return c;
    });
  } else list[index] = vote(list[index], action, voteType);

  return update(state, {
    shared,
    votes,
    list,
  });
}

function vote(
  comment: IComment,
  action: "CREATED" | "DELETED" | "TOGGLED",
  voteType: "UP" | "DOWN"
) {
  const updates = actions[action][voteType];

  if (updates["UP"]) comment.upvotes += updates["UP"];
  if (updates["DOWN"]) comment.downvotes += updates["DOWN"];

  return { ...comment };
}

const actions = {
  CREATED: {
    UP: {
      UP: 1,
    },
    DOWN: {
      DOWN: 1,
    },
  },
  DELETED: {
    UP: {
      UP: -1,
    },
    DOWN: {
      DOWN: -1,
    },
  },
  TOGGLED: {
    UP: {
      UP: 1,
      DOWN: -1,
    },
    DOWN: {
      UP: -1,
      DOWN: 1,
    },
  },
};

export const mentionRegex =
  /@\[[a-zA-Z0-9_.]*\]\([a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}\)/g;
