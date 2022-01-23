import React, { useEffect, useState } from "react";
import { connect, IRootState } from "@browser/state/index";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import App from "@browser/util/app";

function Frame({ withMotion, children, dark, dispatch, onLoaded, ...props }) {
  const [contentRef, setContentRef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cssLoading, setCssLoading] = useState(true);
  const [frameLoading, setFrameLoading] = useState(true);

  useEffect(() => {
    if (!contentRef || !App.isFirefox()) return;
    contentRef.addEventListener("load", () => setFrameLoading(false));
  }, [contentRef]);

  useEffect(() => {
    if (!contentRef || frameLoading) return;
    contentRef.contentWindow.document.head.appendChild(getStyleTag());
  }, [frameLoading, contentRef]);

  useEffect(() => {
    setLoading(frameLoading || cssLoading);
    if (!frameLoading && !cssLoading && onLoaded) onLoaded();
  }, [frameLoading, cssLoading]);

  useEffect(() => {
    if (!contentRef || App.isFirefox()) return;

    const timer = setInterval(() => {
      const doc =
        contentRef.contentDocument || contentRef.contentWindow.document;

      if (doc.readyState == "complete" || doc.readyState == "interactive") {
        setFrameLoading(false);
        clearInterval(timer);
      }
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [onLoaded, contentRef]);

  function getStyleTag() {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.type = "text/css";
    css.href = chrome.extension.getURL("css/app.css");
    css.onload = () => {
      setCssLoading(false);
    };
    return css;
  }

  useEffect(() => {
    if (!contentRef || loading) return;
    const html = contentRef.contentWindow.document.documentElement;

    if (dark) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [loading, dark, contentRef]);

  if (withMotion)
    return (
      <motion.iframe {...props} ref={setContentRef} frameBorder="0">
        {!loading &&
          createPortal(children, contentRef.contentWindow.document.body)}
      </motion.iframe>
    );
  return (
    <iframe {...props} ref={setContentRef} frameBorder="0">
      {!loading &&
        createPortal(children, contentRef.contentWindow.document.body)}
    </iframe>
  );
}

const mapStateToProps = (state: IRootState) => ({
  dark: state.render.dark,
});

//@ts-ignore
export default connect(mapStateToProps)(Frame);
