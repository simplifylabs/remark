import React, { useEffect, useState } from "react";
import { XIcon, PaperAirplaneIcon } from "@heroicons/react/solid";
import { connect, IRootState } from "@browser/state/index";
import { showSidebar, hideSidebar, hideFab } from "@browser/actions/render";
import Render from "@browser/util/render";
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
  const [secondary, setSecondary] = useState(false);
  const [scale, setScale] = useState(0);
  const [fabHover, setFabHover] = useState<boolean>(false);
  const [labelHover, setLabelHover] = useState<boolean>(false);

  useEffect(() => {
    checkSecondary();

    const interval = setInterval(checkSecondary, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!props.showen) return setScale(0);
    if (props.sidebar) setScale(0.75);
    else setScale(1);
  }, [props.showen, props.sidebar]);

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
      style={{
        zIndex: 2147483646,
        position: "fixed",
        right: `${!props.sidebar && secondary ? 11 : 13}px`,
        bottom: `${!props.sidebar && secondary ? 96 : 21}px`,
        width: 65,
        height: 63,
        transition: "all 0.2s ease",
      }}
    >
      <div
        style={{
          //@ts-ignore
          "--tw-scale-x": scale,
          //@ts-ignore
          "--tw-scale-y": scale,
        }}
        className="relative w-full h-full transform transition-all duration-200"
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
              : "opacity-0"
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
            <img
              style={{
                //@ts-ignore
                "--tw-rotate": `${fabHover ? 20 : 0}deg`,
              }}
              className="w-5/12 text-white transition-all duration-200 transform cursor-pointer"
              src={chrome.extension.getURL("assets/icon/64.png")}
              alt="Remark Icon"
            />
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
