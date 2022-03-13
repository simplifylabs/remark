import React, { Fragment, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@browser/components/Loader";
import User from "@browser/util/user";
import API from "@browser/util/api";
import Notification from "@browser/components/Notification";
import { IRootState, connect } from "@browser/state/index";
import { INotification } from "@browser/util/notification";
import { fetchMoreNotifications } from "@browser/actions/notification";

interface IInboxProps {
  total: number;
  unread: number;
  list: INotification[];
  fetchMore: typeof fetchMoreNotifications;
}

function Inbox(props: IInboxProps) {
  useEffect(() => {
    (async () => {
      if (!User.isAuthenticated()) return;
      chrome.runtime.sendMessage("NOTIFICATIONS:READ");
      await API.post(["notification", "read"], {});
    })();
  }, []);

  return (
    <div
      id="remark-inbox-scroll"
      className="thin-scrollbar h-full w-full overflow-y-auto"
    >
      <InfiniteScroll
        dataLength={props.list.length}
        next={() => props.fetchMore()}
        hasMore={props.list.length < props.total}
        loader={
          <div className="flex w-full items-center justify-center p-4">
            <Loader />
          </div>
        }
        scrollableTarget="remark-inbox-scroll"
      >
        <div className="flex w-full grow flex-col items-center justify-start gap-[1.1rem] pt-3">
          {props.list.map((item) => (
            <Fragment key={item.id}>
              <Notification {...item} />
            </Fragment>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

const mapStateToProps = (state: IRootState) => ({
  total: state.notification.total,
  unread: state.notification.unread,
  list: state.notification.list,
});

const mapDispatchToProps = {
  fetchMore: fetchMoreNotifications,
};

//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
