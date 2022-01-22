import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Home from "../popup/Home";
import Settings from "../popup/Settings";
import Darkmode from "@browser/util/darkmode";
import "@browser/styles/app.css";

enum Page {
  Home,
  Settings,
}

function Popup() {
  const [page, setPage] = useState<Page>(Page.Home);

  useEffect(() => {
    Darkmode.read();
  }, []);

  if (page == Page.Settings)
    return <Settings back={() => setPage(Page.Home)} />;
  return <Home settings={() => setPage(Page.Settings)} />;
}

ReactDOM.render(<Popup />, document.getElementById("root"));
