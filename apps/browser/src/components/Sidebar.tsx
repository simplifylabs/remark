import React, { useEffect, useState } from "react";
import {
  UserIcon,
  CogIcon,
  BellIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import { connect, IRootState } from "@browser/state/index";
import { fetchComments, setTyping } from "@browser/actions/comment";
import { Mode } from "@browser/util/settings";
import { hideSidebar, Page, setPage } from "@browser/actions/render";
import Darkmode from "@browser/util/darkmode";
import App from "@browser/util/app";
import Domain from "@browser/util/domain";
import Home from "@browser/pages/Home";
import TextSwitch from "@browser/components/TextSwitch";
import Frame from "@browser/components/Frame";
import Render from "@browser/util/render";
import Inbox from "@browser/pages/Inbox";

interface ISidebarProps {
  online: boolean;
  client: boolean;
  shown: boolean;
  unread: boolean;
  page: Page;
  typing: typeof setTyping;
  setPage: typeof setPage;
  hide: typeof hideSidebar;
  fetch: typeof fetchComments;
}

function Sidebar(props: ISidebarProps) {
  const [mode, setMode] = useState<Mode>("SMART");
  const [translateX, setTranslateX] = useState("0");
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    (async () => {
      const mode = await Domain.getMode();
      setMode(mode);
    })();
  }, []);

  useEffect(() => {
    check();

    // I'm sorry...
    // Hehe this being kinda funny
    const interval = setInterval(check, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTranslateX(props.shown ? "0" : "120%");
    setOpacity(props.shown ? 1 : 0);
  }, [props.shown]);

  useEffect(() => {
    props.typing(false);
  }, [props.page]);

  useEffect(() => {
    Render.on("back", back);
    return () => Render.off("back", back);
  }, []);

  useEffect(() => {
    if (props.shown) document.body.addEventListener("click", close);
    return () => document.body.removeEventListener("click", close);
  }, [props.shown]);

  function close(e: MouseEvent) {
    const launcher = document.querySelector("#remark-launcher");
    const target = e.target as HTMLElement;

    // Some browsers may not support this
    if (!launcher.contains || !target) return;

    if (
      launcher.contains(target) ||
      target.classList.contains("remark__suggestions__item__display")
    )
      return;

    props.hide();
  }

  function back() {
    props.setPage("HOME");
  }

  function check() {
    Darkmode.checkSidebar();
  }

  function modeToIndex(mode: Mode) {
    if (mode == "SHOW") return 0;
    if (mode == "SMART") return 1;
    return 2;
  }

  function indexToMode(index: number): Mode {
    if (index == 0) return "SHOW";
    if (index == 1) return "SMART";
    return "HIDE";
  }

  function onModeChange(i: number) {
    const mode = indexToMode(i);
    setMode(mode);
    Domain.setDomain(mode);
  }

  return (
    <Frame
      id="sidebar"
      style={{
        zIndex: 2147483645,
        position: "fixed",
        right: 0,
        bottom: 0,
        width: 350,
        height: "calc(100% - 30px)",
        transition: "all 0.2s ease",
        opacity: `${opacity}`,
        margin: 15,
        transform: `translateX(${translateX})`,
      }}
    >
      <div className="flex h-full w-full flex-col items-center overflow-hidden rounded-[20px] bg-black/10 p-[0.8rem] dark:bg-white/20">
        <div className="flex w-full flex-row items-center justify-between gap-2">
          <TextSwitch
            selected={modeToIndex(mode)}
            onChange={onModeChange}
            options={["Always", "Smart", "Never"]}
          />
          <div className="dark:bg-background-form flex h-[2.2rem] w-full grow flex-row items-center justify-between rounded-lg bg-white px-1 shadow-sm">
            {props.page == "HOME" ? (
              <div className="relative">
                <BellIcon
                  onClick={() => props.setPage("INBOX")}
                  className="btn-icon text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300"
                />
                {props.unread && (
                  <div className="pointer-events-none absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></div>
                )}
              </div>
            ) : (
              <HomeIcon
                onClick={() => props.setPage("HOME")}
                className="btn-icon text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300"
              />
            )}
            <UserIcon
              onClick={() => window.open(`${App.webUrl}profile`)}
              className="btn-icon text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300"
            />
            <CogIcon
              onClick={() => window.open(`${App.webUrl}settings`)}
              className="btn-icon text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300"
            />
          </div>
        </div>

        {!props.online ? (
          <div className="flex h-full w-full items-center justify-center">
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
                className="btn-primary mt-5 w-auto"
              >
                Retry
              </button>
            </div>
          </div>
        ) : props.page == "HOME" ? (
          <Home />
        ) : (
          <Inbox />
        )}
      </div>
    </Frame>
  );
}

const mapStateToProps = (state: IRootState) => ({
  online: state.connection.online,
  client: state.connection.clientOn,
  page: state.render.page,
  shown: state.render.sidebar,
  unread: state.notification.unread,
});

const mapDipatchToProps = {
  typing: setTyping,
  setPage,
  hide: hideSidebar,
  fetch: fetchComments,
};

//@ts-ignore
export default connect(mapStateToProps, mapDipatchToProps)(Sidebar);
