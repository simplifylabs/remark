import React, { useState, useEffect } from "react";
import {
  IComment,
  IVote,
  IAuthor,
  mentionRegex,
} from "@browser/reducers/comment";
import { Server } from "@browser/util/api";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { AnnotationIcon, ShareIcon, TrashIcon } from "@heroicons/react/outline";
import { voteComment, setReplying, setTyping } from "@browser/actions/comment";
import { connect, IRootState } from "@browser/state/index";
import { Toast } from "@browser/util/dialog";
import App from "@browser/util/app";

interface ICommentProps extends IComment {
  myId: string;
  dark: boolean;
  votes: IVote[];
  parent?: IComment;
  setValue?: (to: string) => void;
  remove: (id: string) => void;
  vote: typeof voteComment;
  reply: typeof setReplying;
  typing: typeof setTyping;
}

interface ICommentPart {
  type: "TEXT" | "MENTION";
  text: string;
}

function Comment(props: ICommentProps) {
  const [comment, setComment] = useState<ICommentPart[]>([]);
  const [vote, setVote] = useState<"UP" | "DOWN" | null>(null);

  useEffect(() => {
    transformMentions();
  }, []);

  useEffect(() => {
    findVote();
  }, [props.votes]);

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

  function transformMentions() {
    const text = props.comment;

    const mentions = [...text.matchAll(mentionRegex)];
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
        return parts.push({
          type: "TEXT",
          text: text.slice(
            mention.index + mention[0].length,
            mentions[index + 1].index
          ),
        });

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

  function reply() {
    props.typing(true);
    props.reply(
      props.parent ? props.parent : { id: props.id, author: props.author }
    );

    props.setValue(
      getMentionText(props.author, props.parent ? props.parent.author : null)
    );
  }

  function getMentionText(author: IAuthor, parent?: IAuthor) {
    const mention = `@[${author.username}](${author.id}) `;
    if (!parent) return mention;
    return `@[${parent.username}](${parent.id}) ${mention}`;
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
            src={`${Server.cdn}avatar/${props.dark ? "dark" : "light"}/50x50/${
              props.author.id
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
            <AnnotationIcon onClick={reply} className="btn-icon p-[0.35rem]" />
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
  myId: state.user.id,
  dark: state.render.dark,
  votes: state.comment.votes,
});

const mapDispatchToProps = {
  vote: voteComment,
  reply: setReplying,
  typing: setTyping,
};

//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
