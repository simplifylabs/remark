import React from "react";
import { Server } from "@browser/util/api";
import { connect, IRootState } from "@browser/state/index";

interface INotificationProps {
  dark: boolean;
  title: string;
  url: string;
  message: string;
  avatar?: string;
  createdAt: string;
}

function Notification(props: INotificationProps) {
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

  return (
    <div className="relative flex w-full flex-col items-end">
      <div
        onClick={props.url ? () => window.open(props.url) : undefined}
        className={`dark:bg-background-card flex w-full ${
          props.url && "cursor-pointer"
        } flex-col items-center justify-center overflow-hidden rounded-[0.75rem] bg-white shadow`}
      >
        <div className="pointer-events-none flex w-full flex-row items-start justify-center gap-3 p-4 pb-5">
          {props.avatar ? (
            <img
              src={`${Server.cdn}avatar/${
                props.dark ? "dark" : "light"
              }/50x50/${props.avatar}`}
              alt="Voter"
              className="mt-1 min-h-[2rem] min-w-[2rem] rounded-full"
            />
          ) : null}
          <div className="flex w-full flex-col items-start">
            <div className="flex w-full flex-row justify-between">
              <label className="text-md font-semibold text-black dark:text-white">
                {props.title}
              </label>
              <small className="text-xs text-gray-500 dark:text-gray-500">
                {timeSince(new Date(props.createdAt))}
              </small>
            </div>
            <p className="w-[95%] text-sm text-gray-800 dark:text-gray-100">
              {props.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: IRootState) => ({
  dark: state.render.dark,
});

const mapDispatchToProps = {};

//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
