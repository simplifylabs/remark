import React, { MutableRefObject, Fragment, useState, useEffect } from "react";
import { Server } from "@browser/util/api";
import { Toast, Modal } from "@browser/util/dialog";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { AnnotationIcon, ShareIcon, TrashIcon } from "@heroicons/react/outline";
import { connect, IRootState } from "@browser/state/index";
import { IComment, IVote, IAuthor } from "@browser/reducers/commentReducer";
import {
  fetchComments,
  removeComment,
  voteComment,
  setReplying,
  setTyping,
} from "@browser/actions/comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@browser/components/Loader";
import App from "@browser/util/app";

interface ICommentsProps {
  input: MutableRefObject<HTMLTextAreaElement>;
  setValue: (to: string) => void;
  dark: boolean;
  online: boolean;
  client: boolean;
  list: IComment[];
  votes: IVote[];
  page: number;
  parents: number;
  id: string;
  fetch: typeof fetchComments;
  remove: typeof removeComment;
  vote: typeof voteComment;
  reply: typeof setReplying;
  typing: typeof setTyping;
}

function Comments(props: ICommentsProps) {
  const [modalId, setModalId] = useState<string>();

  function remove(commentId: string) {
    if (modalId) Modal.remove(modalId);

    const id = Modal.show(
      "Delete Comment",
      "Are you sure you want to delete this comment?",
      [
        { type: "LINK", text: "Cancel" },
        {
          type: "PRIMARY",
          text: "Delete",
          onClick: () => props.remove(commentId),
        },
      ]
    );

    setModalId(id);
  }

  function reply(comment: IComment, parent: IComment) {
    if (!props.input || !props.input.current) return;

    props.reply(parent ? parent : comment);
    props.typing(true);

    const mention = getMention(comment.author);
    if (parent) props.setValue(`${getMention(parent.author)} ${mention} `);
    else props.setValue(`${mention} `);

    props.input.current.focus();
  }

  function getMention(author: IAuthor) {
    return `@[${author.username}](${author.id})`;
  }

  if (!props.online)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex flex-col items-center px-12 text-left">
          <h1 className="w-full text-4xl font-extrabold text-gray-800 dark:text-white">
            {!props.client ? "Offline" : "Maintenance"}
          </h1>
          <p className="w-full text-gray-500 dark:text-gray-300">
            {!props.client
              ? "You are currently offline."
              : "Our servers are currently under maintenance. Please try again later!"}
          </p>
          <button
            onClick={() => props.fetch(0)}
            className="mt-5 w-auto btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  return (
    <div
      id="remark-scroll"
      className="overflow-y-auto w-full h-full thin-scrollbar"
    >
      <InfiniteScroll
        dataLength={props.list.length}
        next={() => props.fetch(props.page + 1)}
        hasMore={props.list.length < props.parents}
        loader={
          <div className="flex justify-center items-center p-4 w-full">
            <Loader />
          </div>
        }
        scrollableTarget="remark-scroll"
      >
        <div className="flex flex-col gap-[1.1rem] justify-start items-center p-3 w-full min-h-full">
          {props.list.map((item) => (
            <Fragment key={item.shared ? "SHARED" : item.id}>
              <Comment
                myId={props.id}
                dark={props.dark}
                vote={props.vote}
                votes={props.votes}
                remove={remove}
                reply={reply}
                {...item}
              />
              {item.replies.map((r) => (
                <Comment
                  myId={props.id}
                  dark={props.dark}
                  vote={props.vote}
                  votes={props.votes}
                  remove={remove}
                  reply={reply}
                  parent={item}
                  key={r.id}
                  {...r}
                />
              ))}
            </Fragment>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

function timeSince(date: Date) {
  const seconds = Math.floor((Date.now() - Number(new Date(date))) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "Y";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "M";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m";
  return Math.floor(seconds) + "s";
}

interface IPart {
  type: "TEXT" | "MENTION";
  text: string;
}

interface ICommentProps extends IComment {
  myId: string;
  dark: boolean;
  parent?: IComment;
  reply: (comment: IComment, parent?: IComment) => void;
  remove: (id: string) => void;
  vote: typeof voteComment;
  votes: IVote[];
}

function Comment(props: ICommentProps) {
  const [comment, setComment] = useState<IPart[]>([]);
  const [vote, setVote] = useState<"UP" | "DOWN" | null>(null);

  useEffect(() => {
    transformComment();
  }, []);

  useEffect(() => {
    findVote();
  }, [props.votes]);

  function transformComment() {
    const text = props.comment;

    const mentions = [
      ...text.matchAll(
        /@\[[a-zA-Z0-9_.]*\]\([a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}\)/g
      ),
    ];

    if (mentions.length == 0) return setComment([{ type: "TEXT", text }]);

    const parts = [];

    mentions.forEach((mention, index) => {
      if (index == 0)
        parts.push({ type: "TEXT", text: text.slice(0, mention.index) });

      parts.push({
        type: "MENTION",
        text: "@" + mention[0].match(/\[(.*?)\]/)[1],
      });

      if (index < mentions.length - 1)
        parts.push({
          type: "TEXT",
          text: text.slice(
            mention.index + mention[0].length,
            mentions[index + 1].index
          ),
        });
      else
        parts.push({
          type: "TEXT",
          text: text.slice(mention.index + mention[0].length, text.length),
        });
    });

    setComment(parts);
  }

  function findVote() {
    const index = props.votes.findIndex((vote) => vote.post.id == props.id);
    if (index == -1) return setVote(null);
    setVote(props.votes[index].type);
  }

  return (
    <div
      className={`relative w-full flex flex-col items-end ${
        (props.shared && props.replies.length < 1) ||
        (props.parent &&
          props.parent.shared &&
          props.parent.replies[props.parent.replies.length - 1].id == props.id)
          ? "pb-4 border-b border-black/10"
          : ""
      } ${props.parent ? "pl-6" : ""}`}
    >
      <div className="w-full bg-white dark:bg-background-card rounded-[0.75rem] flex flex-col items-center justify-center overflow-hidden shadow ">
        <div className="flex flex-row gap-3 justify-center items-start p-4 w-full">
          <img
            src={`${Server.cdn}avatar/50x50/${props.author.id}${
              props.dark && "?dark=true"
            }`}
            alt={`${props.author.username}´s Avatar`}
            className="min-w-[2rem] min-h-[2rem] rounded-full mt-1"
          />
          <div className="flex flex-col items-start w-full">
            <div className="flex flex-row justify-between w-full">
              <label className="font-semibold text-black dark:text-white text-md">
                {props.author.username}{" "}
              </label>
              <small className="text-xs text-gray-500 dark:text-gray-500">
                {timeSince(props.createdAt)}
              </small>
            </div>
            <p className="text-sm text-gray-800 dark:text-gray-100">
              {comment.map((part, index) => {
                if (part.type == "MENTION")
                  return (
                    <span key={index} className="text-brand">
                      {part.text}
                    </span>
                  );
                return <span key={index}>{part.text}</span>;
              })}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center px-2 w-full h-10 bg-gray-100 dark:bg-white/10">
          <div className="flex flex-row gap-2 items-center">
            <ChevronUpIcon
              onClick={() => props.vote(props.id, "UP")}
              className={`btn-icon ${vote == "UP" && "!text-brand"}`}
            />
            <p className={`text-gray-700 dark:text-gray-200`}>
              {props.upvotes - props.downvotes}
            </p>
            <ChevronDownIcon
              onClick={() => props.vote(props.id, "DOWN")}
              className={`btn-icon ${vote == "DOWN" && "!text-brand"}`}
            />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <AnnotationIcon
              onClick={() => props.reply(props, props.parent)}
              className="btn-icon p-[0.35rem]"
            />
            <ShareIcon
              onClick={() => {
                if (
                  !navigator ||
                  !navigator.clipboard ||
                  !navigator.clipboard.writeText
                )
                  return Toast.error("Copy Failed!");

                navigator.clipboard.writeText(
                  `${App.webUrl}share?id=${props.id}`
                );

                Toast.success("Link copied!");
              }}
              className="btn-icon p-[0.35rem]"
            />
            {props.author.id == props.myId && (
              <TrashIcon
                onClick={() => props.remove(props.id)}
                className="btn-icon p-[0.35rem]"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: IRootState) => ({
  dark: state.render.dark,
  online: state.connection.online,
  client: state.connection.clientOn,
  list: state.comment.list,
  votes: state.comment.votes,
  page: state.comment.page,
  parents: state.comment.parents,
  id: state.user.id,
});

const mapDispatchToProps = {
  fetch: fetchComments,
  remove: removeComment,
  vote: voteComment,
  reply: setReplying,
  typing: setTyping,
};

//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
