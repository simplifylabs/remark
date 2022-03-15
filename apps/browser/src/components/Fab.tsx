import React, { useEffect, useState } from "react";
import {
  XIcon,
  PaperAirplaneIcon,
  ArrowLeftIcon,
} from "@heroicons/react/solid";
import { connect, IRootState } from "@browser/state/index";
import {
  showSidebar,
  hideSidebar,
  hideFab,
  Page,
} from "@browser/actions/render";
import Render from "@browser/util/render";
import Domain from "@browser/util/domain";
import Frame from "@browser/components/Frame";

interface IProps {
  showen: boolean;
  sidebar: boolean;
  typing: boolean;
  unread: boolean;
  total: number;
  page: Page;
  show: typeof showSidebar;
  hide: typeof hideSidebar;
  hideFab: typeof hideFab;
}

function FabComponent(props: IProps) {
  const [labelHover, setLabelHover] = useState<boolean>(false);
  const [fabHover, setFabHover] = useState<boolean>(false);
  const [secondary, setSecondary] = useState(false);
  const [scale, setScale] = useState(0);
  const [showen, setShowen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    checkSecondary();

    const interval = setInterval(checkSecondary, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (props.sidebar) {
      if (showen) setScale(0.75);
      else {
        setShowen(true);
        setTimeout(() => {
          setScale(0.75);
        }, 100);
      }
      return;
    }

    if (props.showen) {
      if (showen) setScale(1);
      else {
        setShowen(true);
        setTimeout(() => {
          setScale(1);
        }, 100);
      }
      return;
    }

    setScale(0);
    setShowen(false);
  }, [props.showen, props.sidebar]);

  useEffect(() => {
    Render.on("comments:loaded", onCommentsLoad);

    return () => {
      Render.off("comments:loaded", onCommentsLoad);
    };
  }, []);

  async function onFrameLoaded() {
    setLoaded(true);
    checkSmartShow();

    const mode = await Domain.getMode();
    if (mode == "SHOW") Render.showFab(true);
  }

  function onCommentsLoad(total: number) {
    setLoaded((loaded: boolean) => {
      if (loaded) checkSmartShow(total);
      return loaded;
    });
  }

  async function checkSmartShow(total?: number) {
    const mode = await Domain.getMode();
    if (mode !== "SMART") return;

    if (total == undefined) total = props.total;
    if (total > 0) Render.showFab(true, true);
  }

  function checkSecondary() {
    setSecondary(Render.fabExists());
  }

  function click() {
    if (props.typing) Render.call("post");
    else if (props.sidebar) {
      if (props.page == "HOME") props.hide();
      else Render.call("back");
    } else props.show();
  }

  return (
    <Frame
      id="fab"
      onLoaded={!loaded ? onFrameLoaded : undefined}
      style={{
        zIndex: 2147483647,
        position: "fixed",
        right: `${!props.sidebar && secondary ? 11 : 13}px`,
        bottom: `${!props.sidebar && secondary ? 96 : 21}px`,
        width: 65,
        height: 63,
        transition: "all 0.2s ease",
        pointerEvents: showen ? "auto" : "none",
      }}
    >
      <div
        style={{
          transform: `scale(${scale}, ${scale})`,
        }}
        className="relative h-full w-full transition-all duration-200"
      >
        <div
          onClick={() => props.hideFab()}
          style={{
            top: secondary ? "0.25rem" : "0.2rem",
            right: secondary ? "0.4rem" : "0.3rem",
          }}
          onMouseOver={() => setLabelHover(true)}
          onMouseOut={() => setLabelHover(false)}
          className={`fixed z-[1] flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-red-500 shadow-xl transition-all ${
            (props.total > 0 || fabHover || labelHover || props.unread) &&
            !props.typing &&
            !props.sidebar
              ? "opacity-1"
              : "pointer-events-none opacity-0"
          }`}
        >
          {labelHover || fabHover ? (
            <XIcon className="pointer-events-none w-1/2 text-white" />
          ) : (
            <label className="pointer-events-none text-xs font-bold text-white">
              {props.total > 99 || props.total == 0 ? "!" : props.total}
            </label>
          )}
        </div>
        <button
          onClick={click}
          onMouseOver={() => setFabHover(true)}
          onMouseOut={() => setFabHover(false)}
          className={`group absolute left-0 bottom-0 ${
            !props.sidebar && secondary
              ? "h-[50px] w-[50px]"
              : "h-[55px] w-[55px]"
          } ${
            props.sidebar ? "rounded-lg" : "rounded-[50%]"
          } bg-brand remark-ignore flex !cursor-pointer items-center justify-center !transition-all !duration-200`}
        >
          {props.typing ? (
            <PaperAirplaneIcon
              style={{
                //@ts-ignore
                "--tw-scale-x": `${fabHover ? 0.9 : 1}`,
                //@ts-ignore
                "--tw-scale-y": `${fabHover ? 0.9 : 1}`,
                //@ts-ignore
                "--tw-rotate": `90deg`,
              }}
              className="icon-white remark-ignore w-5/12 transform !cursor-pointer opacity-[99] transition-all duration-200"
              shapeRendering="geometricPrecision"
            />
          ) : props.sidebar ? (
            props.page == "HOME" ? (
              <XIcon
                style={{
                  //@ts-ignore
                  "--tw-rotate": `${fabHover ? 90 : 0}deg`,
                }}
                className="icon-white remark-ignore w-5/12 transform !cursor-pointer opacity-[99] transition-all duration-200"
                shapeRendering="geometricPrecision"
              />
            ) : (
              <ArrowLeftIcon
                className="icon-white remark-ignore w-5/12 transform !cursor-pointer opacity-[99] transition-all duration-200"
                shapeRendering="geometricPrecision"
              />
            )
          ) : (
            <svg
              style={{
                //@ts-ignore
                "--tw-rotate": `${fabHover ? 20 : 0}deg`,
              }}
              className="w-5/12 transform cursor-pointer transition-all duration-200"
              viewBox="0 0 354 354"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#path)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M47.1459 268.651C51.9912 171.496 111.097 11.2717 322.078 0.0169719C328.756 -0.339238 334.439 4.95694 334.226 11.6405C333.347 39.2153 328.34 72.5522 317.122 106.436C294.747 106.736 280.341 116.531 274.506 121.4H311.765C279.475 205.113 207.525 287.491 64.6598 290.229C50.7681 313.872 39.5558 335.032 32.3426 349.807C30.7677 353.033 26.8759 354.372 23.6499 352.797C20.4239 351.222 19.0855 347.33 20.6604 344.104C27.5933 329.903 38.0909 310.03 51.0503 287.751C50.9415 287.664 50.8343 287.575 50.7288 287.484C70.053 255.547 95.1001 221.502 129.231 190.339C131.882 187.919 132.069 183.808 129.648 181.157C127.228 178.506 123.116 178.319 120.465 180.739C89.5228 208.991 65.8532 239.501 47.1459 268.651Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="path">
                  <rect width="353.46" height="353.46" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
        </button>
      </div>
    </Frame>
  );
}

const mapStateToProps = (state: IRootState) => ({
  showen: state.render.fab,
  sidebar: state.render.sidebar,
  typing: state.comment.typing,
  total: state.comment.total,
  page: state.render.page,
  unread: state.notification.unread,
});

const mapDispatchToProps = {
  show: showSidebar,
  hide: hideSidebar,
  hideFab: hideFab,
};

//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(FabComponent);
