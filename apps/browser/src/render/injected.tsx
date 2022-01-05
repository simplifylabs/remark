import React from "react";
import ReactDOM from "react-dom";
import Render from "@util/render";
import Events from "@util/events";
import Launcher from "@components/Launcher";
import Registry from "@state/registry";
import { store, Provider } from "@state/index";
import "@styles/injected.css";

Events.listen();

Render.on("render", () => {
  if (!Render.allowed()) return;

  Render.isRendered = true;
  Registry.set(store);

  ReactDOM.render(
    <>
      <Provider store={store}>
        <Launcher />
      </Provider>
    </>,
    Render.getWrapper()
  );
});
