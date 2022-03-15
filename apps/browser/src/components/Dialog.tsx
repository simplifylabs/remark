import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import { ISnackbar, IModal } from "@browser/actions/dialog";
import { connect, IRootState } from "@browser/state/index";
import { Snackbar, level, Modal } from "@browser/util/dialog";
import { useAnimation } from "framer-motion";
import Frame from "@browser/components/Frame";
import App from "@browser/util/app";

interface IWrapperProps {
  snackbars: ISnackbar[];
  modals: IModal[];
}

function Wrapper(props: IWrapperProps) {
  return (
    <>
      {props.snackbars.map((snackbar) => (
        <SnackbarComponent key={snackbar.id} {...snackbar} />
      ))}
      {props.modals.map((modal) => (
        <ModalComponent key={modal.id} {...modal} />
      ))}
    </>
  );
}

interface IModalProps extends IModal {}

function ModalComponent(props: IModalProps) {
  const animation = useAnimation();
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (isOpen)
      animation.start({
        scale: 1,
        opacity: 1,
        x: "-50%",
        y: "-50%",
        transition: { duration: 0.2 },
      });
    else
      animation.start({
        scale: 0.5,
        opacity: 0,
        x: "-50%",
        y: "-50%",
        transition: { duration: 0.2 },
      });
  }, [loading, isOpen]);

  function close() {
    setIsOpen(false);

    setTimeout(() => {
      Modal.remove(props.id);
    }, 250);
  }

  return (
    <Frame
      withMotion
      onLoaded={() => setLoading(false)}
      initial={{
        // Scale is buggy in Firefox
        scale: 0.5,
        opacity: 0,
        x: "-50%",
        y: "-50%",
      }}
      animate={animation}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2147483646,
        width: "100vw",
        height: "100vh",
      }}
    >
      <div onClick={close} className="absolute h-screen w-screen"></div>
      <div
        className={`dark:bg-background-card absolute top-1/2 left-1/2 z-[1] flex -translate-x-1/2 -translate-y-1/2 flex-col items-start rounded-2xl bg-white p-6 shadow-lg`}
      >
        <p className="text-lg font-medium text-black dark:text-white">
          {props.title}
        </p>
        <p
          dangerouslySetInnerHTML={{ __html: props.text }}
          className="whitespace-pre text-sm text-gray-500 dark:text-gray-400"
        ></p>
        <div className="mt-4 flex w-full flex-row items-center justify-end gap-4">
          {props.buttons.map((button) => {
            if (button.type == "LINK")
              return (
                <a
                  key={button.text.toLowerCase().replace(/ /g, "")}
                  onClick={() => {
                    if (button.onClick) button.onClick();
                    close();
                  }}
                >
                  {button.text}
                </a>
              );
            return (
              <button
                key={button.text.toLowerCase().replace(/ /g, "")}
                onClick={() => {
                  if (button.onClick) button.onClick();
                  close();
                }}
                className="btn-primary"
              >
                {button.text}
              </button>
            );
          })}
        </div>
      </div>
    </Frame>
  );
}

interface ISnackbarProps extends ISnackbar {}

function SnackbarComponent(props: ISnackbarProps) {
  const animation = useAnimation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (props.shown)
      animation.start({
        opacity: 1,
        x: "-50%",
        y: 0,
        transition: { duration: 0.2 },
      });
    else
      animation.start({
        opacity: 0,
        x: "-50%",
        y: 20,
        transition: { duration: 0.2 },
      });
  }, [loading, props.shown]);

  return (
    <Frame
      withMotion
      onLoaded={() => setLoading(false)}
      initial={{ x: "-50%", opacity: 0, y: 20 }}
      animate={animation}
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2147483646,
        width: "100vw",
        height: 85,
      }}
    >
      <div
        className={`fixed left-1/2 top-1/2 flex max-w-[90%] -translate-y-1/2 -translate-x-1/2 flex-row items-center px-4 py-2 ${
          props.level == "SUCCESS" ? "bg-emerald-500" : "bg-red-500"
        } rounded-md shadow-lg`}
      >
        <p className="w-full whitespace-nowrap px-2 text-lg text-white">
          {props.text}
        </p>
        {props.type == "SNACKBAR" && (
          <XIcon
            onClick={() => Snackbar.hide(props.id)}
            className="min-h-[1.25rem] min-w-[1.25rem] cursor-pointer text-white"
          />
        )}
      </div>
    </Frame>
  );
}

const mapStateToProps = (state: IRootState) => ({
  snackbars: state.dialog.snackbars,
  modals: state.dialog.modals,
});

export const DialogWrapper = connect(mapStateToProps)(Wrapper);
