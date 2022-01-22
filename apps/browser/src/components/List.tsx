import React, { Fragment, useState } from "react";
import { fetchComments, removeComment } from "@browser/actions/comment";
import { Modal } from "@browser/util/dialog";
import { connect, IRootState } from "@browser/state/index";
import { IComment, IAuthor } from "@browser/reducers/comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@browser/components/Loader";
import Comment from "@browser/components/Comment";

interface IListProps {
  online: boolean;
  client: boolean;
  page: number;
  parents: number;
  list: IComment[];
  input?: HTMLTextAreaElement;
  fetch: typeof fetchComments;
  remove: typeof removeComment;
  setValue: (to: string) => void;
}

function List(props: IListProps) {
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
        <div className="flex flex-col gap-[1.1rem] justify-start items-center pt-3 w-full grow">
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

const mapStateToProps = (state: IRootState) => ({
  online: state.connection.online,
  client: state.connection.clientOn,
  list: state.comment.list,
  page: state.comment.page,
  parents: state.comment.parents,
});

const mapDispatchToProps = {
  fetch: fetchComments,
  remove: removeComment,
};

//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(List);
