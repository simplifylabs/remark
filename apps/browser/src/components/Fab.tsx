import React, { useEffect, useState } from "react";
import { XIcon, PaperAirplaneIcon } from "@heroicons/react/solid";
import { connect, IRootState } from "@browser/state/index";
import { showSidebar, hideSidebar, hideFab } from "@browser/actions/render";
import Render from "@browser/util/render";
import Domain from "@browser/util/domain";
import Frame from "@browser/components/Frame";

interface IProps {
  showen: boolean;
  sidebar: boolean;
  typing: boolean;
  total: number;
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

  let timeout = null;
  useEffect(() => {
    if (timeout) clearTimeout(timeout);

    if (props.sidebar) {
      setShowen(true);
      setScale(0.75);
      return;
    }

    if (props.showen) {
      setShowen(true);
      setScale(1);
      return;
    }

    setScale(0);
    timeout = setTimeout(() => setShowen(false), 200);
  }, [props.showen, props.sidebar]);

  useEffect(() => {
    Render.on("comments:loaded", onCommentsLoad);
  }, []);

  async function onFrameLoaded() {
    setLoaded(true);
    checkSmartShow();

    const mode = await Domain.getMode();
    if (mode == "SHOW") Render.showFab(true);
  }

  function onCommentsLoad(total: number) {
    Render.off("comments:loaded", onCommentsLoad);

    setLoaded((loaded: boolean) => {
      if (loaded) checkSmartShow(total);
      return loaded;
    });
  }

  async function checkSmartShow(total?: number) {
    const mode = await Domain.getMode();
    if (mode !== "SMART") return;

    if (total == undefined) total = props.total;
    if (total > 0) Render.showFab(true);
  }

  function checkSecondary() {
    setSecondary(Render.fabExists());
  }

  function click() {
    if (props.typing) Render.call("remark:post");
    else if (props.sidebar) props.hide();
    else props.show();
  }

  return (
    <Frame
      id="fab"
      onLoaded={!loaded ? onFrameLoaded : undefined}
      style={{
        zIndex: 2147483646,
        position: "fixed",
        right: `${!props.sidebar && secondary ? 11 : 13}px`,
        bottom: `${!props.sidebar && secondary ? 96 : 21}px`,
        width: 65,
        height: 63,
        transition: "all 0.2s ease",
        display: showen ? "block" : "none",
      }}
    >
      <div
        style={{
          transform: `scale(${scale}, ${scale})`,
        }}
        className="relative w-full h-full transition-all duration-200"
      >
        <div
          onClick={() => props.hideFab()}
          style={{
            top: secondary ? "0.25rem" : "0.2rem",
            right: secondary ? "0.4rem" : "0.3rem",
          }}
          onMouseOver={() => setLabelHover(true)}
          onMouseOut={() => setLabelHover(false)}
          className={`fixed w-6 h-6 bg-red-500 rounded-full justify-center items-center shadow-xl flex transition-all z-[1] cursor-pointer ${
            (props.total > 0 || fabHover || labelHover) &&
            !props.typing &&
            !props.sidebar
              ? "opacity-1"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {labelHover || fabHover || props.total <= 0 ? (
            <XIcon className="text-white w-1/2 pointer-events-none" />
          ) : (
            <label className="text-xs font-bold text-white pointer-events-none">
              {props.total > 99 ? "!" : props.total}
            </label>
          )}
        </div>
        <button
          onClick={click}
          onMouseOver={() => setFabHover(true)}
          onMouseOut={() => setFabHover(false)}
          className={`absolute left-0 bottom-0 group ${
            !props.sidebar && secondary
              ? "w-[50px] h-[50px]"
              : "w-[55px] h-[55px]"
          } ${
            props.sidebar ? "rounded-lg" : "rounded-[50%]"
          } bg-brand !cursor-pointer flex justify-center items-center !transition-all !duration-200 remark-ignore`}
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
              className="w-5/12 icon-white transition-all duration-200 transform !cursor-pointer remark-ignore opacity-[99]"
              shapeRendering="geometricPrecision"
            />
          ) : props.sidebar ? (
            <XIcon
              style={{
                //@ts-ignore
                "--tw-rotate": `${fabHover ? 90 : 0}deg`,
              }}
              className="w-5/12 icon-white transition-all duration-200 transform !cursor-pointer remark-ignore opacity-[99]"
              shapeRendering="geometricPrecision"
            />
          ) : (
            <svg
              style={{
                //@ts-ignore
                "--tw-rotate": `${fabHover ? 20 : 0}deg`,
              }}
              className="w-5/12 transition-all duration-200 transform cursor-pointer"
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
});

const mapDispatchToProps = {
  show: showSidebar,
  hide: hideSidebar,
  hideFab: hideFab,
};

//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(FabComponent);
