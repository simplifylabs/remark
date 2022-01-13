import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Render from "@browser/util/render";
import Events from "@browser/util/events";
import Launcher from "@browser/components/Launcher";
import Registry from "@browser/state/registry";
import { store, Provider } from "@browser/state/index";

Events.listenInjected();

Render.on("render", () => {
  if (!Render.allowed()) return;

  Render.isRendered = true;
  Registry.set(store);

  ReactDOM.render(
    <Provider store={store}>
      <Launcher />
    </Provider>,
    Render.getWrapper()
  );
});
