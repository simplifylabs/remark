import React, { useState, useEffect } from "react";
import { connect, IRootState } from "@browser/state/index";
import Frame from "@browser/components/Frame";
import Home from "@browser/pages/Home";
import Settings from "@browser/pages/Settings";

enum Page {
  Home,
  Settings,
}

interface IPopupProps {
  showen: boolean;
}

function Popup(props: IPopupProps) {
  const [page, setPage] = useState<Page>(Page.Home);
  const [translateX, setTranslateX] = useState("0");
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setTranslateX(props.showen ? "0" : "120%");
    setOpacity(props.showen ? 1 : 0);
  }, [props.showen]);

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
      <div className="w-full h-full rounded-[20px] bg-black/10 dark:bg-white/20 overflow-hidden p-[0.8rem] flex flex-col items-center">
        {page == Page.Settings ? (
          <Settings back={() => setPage(Page.Home)} />
        ) : (
          <Home settings={() => setPage(Page.Settings)} />
        )}
      </div>
    </Frame>
  );
}

const mapStateToProps = (state: IRootState) => ({
  showen: state.render.sidebar,
});

//@ts-ignore
export default connect(mapStateToProps)(Popup);
