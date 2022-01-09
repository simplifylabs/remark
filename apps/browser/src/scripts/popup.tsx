import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useAutoDarkmode } from "@browser/hooks/useDarkmode";
import Home from "@browser/popup/Home";
import Settings from "@browser/popup/Settings";
import "@browser/styles/app.css";

enum Page {
  Home,
  Settings,
}

function Popup() {
  useAutoDarkmode();
  const [page, setPage] = useState<Page>(Page.Home);

  if (page == Page.Settings)
    return <Settings back={() => setPage(Page.Home)} />;
  return <Home settings={() => setPage(Page.Settings)} />;
}

ReactDOM.render(<Popup />, document.getElementById("root"));
