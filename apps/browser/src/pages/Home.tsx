import React, { Fragment, useState, useEffect } from "react";
import { fetchComments, removeComment } from "@browser/actions/comment";
import { Modal } from "@browser/util/dialog";
import { connect, IRootState } from "@browser/state/index";
import { IComment } from "@browser/reducers/comment";
import { setTyping, postComment, setReplying } from "@browser/actions/comment";
import { hideSidebar } from "@browser/actions/render";
import { IReply } from "@browser/reducers/comment";
import Render from "@browser/util/render";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@browser/components/Loader";
import TextArea from "@browser/components/TextArea";
import Comment from "@browser/components/Comment";
import App from "@browser/util/app";

interface IHomeProps {
  showen: boolean;
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
    if (props.showen) {
      if (value) props.typing(true);
      else props.typing(false);
    }
  }, [props.showen]);

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

interface IListProps {
  page: number;
  parents: number;
  list: IComment[];
  input?: HTMLTextAreaElement;
  fetch: typeof fetchComments;
  remove: typeof removeComment;
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
    list: state.comment.list,
    page: state.comment.page,
    parents: state.comment.parents,
  }),
  {
    fetch: fetchComments,
    remove: removeComment,
  }
  //@ts-ignore
)(ListComponent);

const mapStateToProps = (state: IRootState) => ({
  showen: state.render.sidebar,
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
