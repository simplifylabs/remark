import React, { useEffect } from "react";
import { XIcon } from "@heroicons/react/solid";
import { ISnackbar } from "@web/actions/dialog";
import { connect, IState } from "@web/state";
import { Snackbar, level } from "@web/util/dialog";
import { motion, useAnimation } from "framer-motion";

interface IWrapperProps {
  snackbars: ISnackbar[];
}

function Wrapper(props: IWrapperProps) {
  return (
    <>
      {props.snackbars.map((snackbar, index) => (
        <SnackbarComponent key={snackbar.id} {...snackbar} index={index} />
      ))}
    </>
  );
}

interface ISnackbarProps {
  id: string;
  type: "SNACKBAR" | "TOAST";
  level: level;
  text: string;
  index: number;
  showen: boolean;
}

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
    <motion.div
      initial={{ x: "-50%", opacity: 0, y: 20 }}
      animate={animation}
      style={{ zIndex: 1000 + props.index }}
      className={`fixed bottom-5 left-1/2 flex -translate-x-1/2 flex-row items-center px-4 py-2 ${
        props.level == "SUCCESS" ? "bg-green-500" : "bg-red-500"
      } rounded-md shadow-lg`}
    >
      <p className="px-2 text-lg text-white">{props.text}</p>
      {props.type == "SNACKBAR" && (
        <XIcon
          onClick={() => Snackbar.hide(props.id)}
          className="h-5 w-5 cursor-pointer text-white"
        />
      )}
    </motion.div>
  );
}

const mapStateToProps = (state: IState) => ({
  snackbars: state.dialog.snackbars,
});

export default connect(mapStateToProps)(Wrapper);
