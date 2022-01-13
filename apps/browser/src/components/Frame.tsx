import React, { useEffect, useState } from "react";
import { connect, IRootState } from "@browser/state/index";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

function Frame({ withMotion, children, dark, dispatch, ...props }) {
  const [contentRef, setContentRef] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contentRef) return;

    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.type = "text/css";
    css.href = chrome.extension.getURL("css/app.css");
    css.onload = () => {
      setLoading(false);
    };

    contentRef.contentWindow.document.head.appendChild(css);
  }, [contentRef]);

  useEffect(() => {
    if (!contentRef) return;

    if (dark) contentRef.contentWindow.document.body.classList.add("dark");
    else contentRef.contentWindow.document.body.classList.remove("dark");
  }, [dark, contentRef]);

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
