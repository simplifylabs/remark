import React, { Fragment, useState, useEffect } from "react";
import { fetchComments, removeComment } from "@browser/actions/comment";
import { Modal } from "@browser/util/dialog";
import { connect, IRootState } from "@browser/state/index";
import { IComment } from "@browser/reducers/comment";
import { setTyping, postComment, setReplying } from "@browser/actions/comment";
import { XIcon } from "@heroicons/react/solid";
import { hideSidebar } from "@browser/actions/render";
import { IReply } from "@browser/reducers/comment";
import Render from "@browser/util/render";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@browser/components/Loader";
import TextArea from "@browser/components/TextArea";
import Comment from "@browser/components/Comment";
import App from "@browser/util/app";
import { hideRate } from "@browser/actions/notification";
import { Storage } from "@browser/util/browser";

interface IHomeProps {
  shown: boolean;
  isLoggedIn: boolean;
  replying: IReply | null;
  typing: typeof setTyping;
  post: typeof postComment;
  reply: typeof setReplying;
  hide: typeof hideSidebar;
}

function Home(props: IHomeProps) {
  const [textarea, setTextarea] = useState<HTMLTextAreaElement>();
  const [value, setValue] = useState("");

  useEffect(() => {
    Render.on("post", post);
    return () => Render.off("post", post);
  }, [value, props.replying]);

  useEffect(() => {
    if (!textarea) return;

    textarea.addEventListener("keydown", keydown);
    return () => textarea && textarea.removeEventListener("keydown", keydown);
  }, [textarea, value]);

  useEffect(() => {
    if (props.shown) {
      if (value) props.typing(true);
      else props.typing(false);
    }
  }, [props.shown]);

  function signIn() {
    window.open(`${App.webUrl}auth/signin`);
  }

  function keydown(e: KeyboardEvent) {
    if (e.key == "Enter" && !e.shiftKey) {
      e.preventDefault();

      const suggestions = Render.sidebarQuerySelector(
        ".remark__suggestions__list"
      );
      if (suggestions) return;

      post();
    }
  }

  function post() {
    if (!value || !value.replace(/\s/g, "").length) return;
    let modified = value;
    let isReplying = false;

    if (props.replying) {
      const mention = `@[${props.replying.author.username}](${props.replying.author.id}) `;

      if (modified.startsWith(mention)) {
        modified = modified.replace(mention, "");
        isReplying = true;
      }
    }

    if (textarea) textarea.blur();
    props.post(modified, isReplying ? props.replying.commentId : null, () =>
      setValue("")
    );
    props.reply(null);
  }

  return (
    <>
      <List setValue={setValue} input={textarea} />
      <div className="flex w-full flex-row">
        {props.isLoggedIn ? (
          <TextArea
            value={value}
            set={setValue}
            inputRef={setTextarea}
            typing={props.typing}
          />
        ) : (
          <button
            onClick={signIn}
            className="btn-disabled w-[calc(100%-3.4rem)] py-[0.6rem]"
          >
            Sign In
          </button>
        )}
      </div>
    </>
  );
}

interface IRateProps {
  hide: typeof hideRate;
}

function Rate(props: IRateProps) {
  function feedback() {
    disable();

    Modal.show(
      "Feedback",
      "Would you like to provide Feedback to help us<br />improve Remark?",
      [
        { type: "LINK", text: "Cancel", onClick: () => props.hide() },
        {
          type: "PRIMARY",
          text: "Feedback",
          onClick: () => {
            props.hide();
            window.open(`${App.webUrl}feedback`);
          },
        },
      ]
    );
  }

  function rate() {
    props.hide();
    disable();
    window.open(App.rateUrl());
  }

  async function disable() {
    await Storage.set("disableRate", "true");
  }

  return (
    <>
      <div className="bg-brand relative my-2 mt-4 flex w-full flex-col items-start justify-start gap-4 overflow-hidden rounded-xl">
        <div className="flex flex-col items-start p-6 pb-0">
          <h1 className="text-2xl font-bold text-white">Like Remark?</h1>
          <p className="text-sm text-white/80">Leave us a 5 star rating!</p>
        </div>
        <div className="flex w-full flex-row items-center justify-end gap-2 bg-black/10 p-2">
          <button
            onClick={feedback}
            className="btn py-1 px-3 text-white/50 hover:bg-white/10"
          >
            No!
          </button>
          <button
            onClick={rate}
            className="btn py-1 px-3 text-white/90 hover:bg-white/10"
          >
            Yes!
          </button>
        </div>
        <button
          onClick={() => props.hide()}
          className="absolute top-4 right-4 rounded-md px-2 py-2 text-white/60 transition-all hover:bg-white/20 hover:text-white/80"
        >
          <XIcon className="pointer-events-none h-5 w-5 rounded-md" />
        </button>
      </div>
      <div className="mt-4 mb-2 h-[1px] w-full bg-black/10 dark:bg-white/10"></div>
    </>
  );
}

interface IListProps {
  rate: boolean;
  page: number;
  parents: number;
  list: IComment[];
  input?: HTMLTextAreaElement;
  fetch: typeof fetchComments;
  remove: typeof removeComment;
  hideRate: typeof hideRate;
  setValue: (to: string) => void;
}

function ListComponent(props: IListProps) {
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

  function setValue(text: string) {
    if (!props.input) return;
    props.input.focus();
    props.setValue(text);
  }

  return (
    <div
      id="remark-scroll"
      className="thin-scrollbar h-full w-full overflow-y-auto"
    >
      <InfiniteScroll
        dataLength={props.list.length}
        next={() => props.fetch(props.page + 1)}
        hasMore={props.list.length < props.parents}
        loader={
          <div className="flex w-full items-center justify-center p-4">
            <Loader />
          </div>
        }
        scrollableTarget="remark-scroll"
      >
        {props.rate && <Rate hide={props.hideRate} />}
        <div className="flex w-full grow flex-col items-center justify-start gap-[1.1rem] pt-3">
          {props.list.map((item) => (
            <Fragment key={item.shared ? "SHARED" : item.id}>
              <Comment {...item} remove={remove} setValue={setValue} />
              {item.replies.map((r) => (
                <Comment
                  remove={remove}
                  setValue={setValue}
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

const List = connect(
  (state: IRootState) => ({
    rate: state.notification.rate,
    list: state.comment.list,
    page: state.comment.page,
    parents: state.comment.parents,
  }),
  {
    fetch: fetchComments,
    remove: removeComment,
    hideRate: hideRate,
  }
  //@ts-ignore
)(ListComponent);

const mapStateToProps = (state: IRootState) => ({
  shown: state.render.sidebar,
  isLoggedIn: state.user.isLoggedIn,
  replying: state.comment.replying,
});

const mapDispatchToProps = {
  typing: setTyping,
  post: postComment,
  reply: setReplying,
  hide: hideSidebar,
};

//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Home);
