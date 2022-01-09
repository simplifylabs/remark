import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import { ISnackbar, IModal } from "@browser/actions/dialog";
import { connect, IRootState } from "@browser/state/index";
import { Snackbar, level, Modal } from "@browser/util/dialog";
import Frame from "@browser/components/Frame";
import { useAnimation } from "framer-motion";

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

  useEffect(() => {
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
        scale: 0,
        opacity: 0,
        x: "-50%",
        y: "-50%",
        transition: { duration: 0.2 },
      });
  }, [isOpen]);

  function close() {
    setIsOpen(false);

    setTimeout(() => {
      Modal.remove(props.id);
    }, 250);
  }

  return (
    <Frame
      withMotion
      initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
      animate={animation}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2147483646,
        width: 390,
        height: 250,
      }}
    >
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2
                    -translate-y-1/2 w-[90%] flex flex-col items-start p-6
                    shadow-lg rounded-2xl bg-white dark:bg-background-card`}
      >
        <p className="text-lg font-medium text-black dark:text-white">
          {props.title}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{props.text}</p>
        <div className="flex flex-row gap-4 justify-end items-center mt-4 w-full">
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

  useEffect(() => {
    if (props.showen)
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
  }, [props.showen]);

  return (
    <Frame
      withMotion
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
        className={`flex flex-row items-center fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 px-4 py-2 max-w-[90%] ${
          props.level == "SUCCESS" ? "bg-green-500" : "bg-red-500"
        } shadow-lg rounded-md`}
      >
        <p className="w-full px-2 text-lg text-white whitespace-nowrap">
          {props.text}
        </p>
        {props.type == "SNACKBAR" && (
          <XIcon
            onClick={() => Snackbar.hide(props.id)}
            className="min-w-[1.25rem] min-h-[1.25rem] text-white cursor-pointer"
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
