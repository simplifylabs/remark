import React, { useEffect, useState } from "react";
import { XIcon, PaperAirplaneIcon } from "@heroicons/react/solid";
import { connect, IRootState } from "@browser/state/index";
import { showSidebar, hideSidebar } from "@browser/actions/render";
import Render from "@browser/util/render";

interface IProps {
  showen: boolean;
  sidebar: boolean;
  typing: boolean;
  total: number;
  show: typeof showSidebar;
  hide: typeof hideSidebar;
}

function FabComponent(props: IProps) {
  const [secondary, setSecondary] = useState(false);
  const [scale, setScale] = useState(0);
  const [hovering, setHovering] = useState<boolean>(false);

  useEffect(() => {
    check();

    const interval = setInterval(check, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setScale(props.showen ? (props.sidebar ? 0.75 : 1) : 0);
    }, 50);
  }, [props.showen]);

  useEffect(() => {
    if (props.sidebar) setScale(0.75);
    else setScale(1);
  }, [props.sidebar]);

  function check() {
    setSecondary(Render.fabExists());
  }

  function click() {
    if (props.typing) Render.call("remark:post");
    else if (props.sidebar) props.hide();
    else props.show();
  }

  return (
    <button
      style={{
        right: `${!props.sidebar && secondary ? 24 : 23}px`,
        bottom: `${!props.sidebar && secondary ? 96 : 23}px`,
        //@ts-ignore
        "--tw-scale-x": scale,
        //@ts-ignore
        "--tw-scale-y": scale,
      }}
      onClick={click}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
      className={`group fixed z-[2147483646] ${
        !props.sidebar && secondary
          ? "w-[51.2px] h-[51.2px]"
          : "w-[57px] h-[57px]"
      } ${
        props.sidebar ? "rounded-lg" : "rounded-[50%]"
      } bg-brand !cursor-pointer drop-shadow-fab flex justify-center items-center transform !transition-all !duration-200 remark-ignore`}
    >
      <div
        className={`absolute top-0 right-0 transform translate-x-2 -translate-y-1 w-6 h-6 bg-red-500 rounded-full justify-center items-center shadow-xl flex transition-all ${
          props.total > 0 && !props.typing && !props.sidebar
            ? "opacity-1"
            : "opacity-0"
        }`}
      >
        <label className="text-xs font-bold text-white">
          {props.total > 99 ? "!" : props.total}
        </label>
      </div>
      {props.typing ? (
        <PaperAirplaneIcon
          style={{
            //@ts-ignore
            "--tw-scale-x": `${hovering ? 0.9 : 1}`,
            //@ts-ignore
            "--tw-scale-y": `${hovering ? 0.9 : 1}`,
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
            "--tw-rotate": `${hovering ? 90 : 0}deg`,
          }}
          className="w-5/12 icon-white transition-all duration-200 transform !cursor-pointer remark-ignore opacity-[99]"
          shapeRendering="geometricPrecision"
        />
      ) : (
        <img
          style={{
            //@ts-ignore
            "--tw-rotate": `${hovering ? 20 : 0}deg`,
          }}
          className="w-5/12 text-white transition-all duration-200 transform cursor-pointer"
          src={chrome.extension.getURL("assets/icon/64.png")}
          alt="Remark Icon"
        />
      )}
    </button>
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
};

//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(FabComponent);
