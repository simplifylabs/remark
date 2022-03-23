import React, { useState, useEffect } from "react";
import { IComment, IVote, IAuthor } from "@browser/reducers/comment";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { AnnotationIcon, ShareIcon, TrashIcon } from "@heroicons/react/outline";
import { voteComment, setReplying, setTyping } from "@browser/actions/comment";
import { connect, IRootState } from "@browser/state/index";
import { mentionRegex } from "@util/mentions";
import { Toast } from "@browser/util/dialog";
import API, { Server } from "@browser/util/api";
import Loader from "@browser/components/Loader";
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

  async function share() {
    const res = await API.get(["comment", props.id, "share"]);
    if (!res.success) return Toast.error("Failed to create share link!");

    if (App.isFirefox()) {
      chrome.runtime.sendMessage(
        {
          type: "COPY",
          text: res.body.url,
        },
        (res) => {
          if (res.success) return Toast.success("Copied link!");
          Toast.error("Failed to copy link!");
        }
      );
    } else {
      if (navigator && navigator.clipboard) {
        navigator.clipboard
          .writeText(res.body.url)
          .then(() => {
            return Toast.success("Copied link!");
          })
          .catch(() => {
            return Toast.error("Failed to copy link!");
          });
      } else Toast.error("Failed to copy link!");
    }
  }

  return (
    <div
      className={`relative flex w-full flex-col items-end ${
        (props.shared && props.replies.length < 1) ||
        (props.parent &&
          props.parent.shared &&
          props.parent.replies[props.parent.replies.length - 1].id == props.id)
          ? "border-b border-black/10 pb-4 dark:border-white/10"
          : ""
      } ${props.parent ? "pl-6" : ""}`}
    >
      <div className="dark:bg-background-card flex w-full flex-col items-center justify-center overflow-hidden rounded-[0.75rem] bg-white shadow">
        <div className="flex w-full flex-row items-start justify-center gap-3 p-4">
          <div className="relative mt-1 min-h-[2.5rem] min-w-[2.5rem]">
            <img
              src={`${Server.cdn}avatar/${
                props.dark ? "dark" : "light"
              }/50x50/${props.author.id}`}
              alt={`${props.author.username}´s Avatar`}
              className="absolute top-0 left-0 z-[2] h-[2.5rem] w-[2.5rem] rounded-full"
            />
            <div className="absolute top-0 left-0 z-[1] flex h-[2.5rem] w-[2.5rem] items-center justify-center">
              <Loader small />
            </div>
          </div>
          <div className="flex w-full flex-col items-start">
            <div className="flex w-full flex-row justify-between">
              <label className="text-md font-semibold text-black dark:text-white">
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
        <div className="flex h-10 w-full flex-row items-center justify-between bg-gray-100 px-2 dark:bg-white/10">
          <div className="flex flex-row items-center gap-2">
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
          <div className="flex flex-row items-center gap-2">
            <AnnotationIcon onClick={reply} className="btn-icon p-[0.35rem]" />
            <ShareIcon onClick={share} className="btn-icon p-[0.35rem]" />
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
