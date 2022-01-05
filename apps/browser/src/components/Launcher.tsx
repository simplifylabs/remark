import React from "react";
import Fab from "@components/Fab";
import Sidebar from "@components/Sidebar";
import { DialogWrapper } from "@components/Dialog";
import { connect, IRootState } from "@state/index";

interface IProps {
  rendered: boolean;
}

function RemarkLauncher(props: IProps) {
  if (!props.rendered) return null;
  return (
    <>
      <DialogWrapper />
      <Sidebar />
      <Fab />
    </>
  );
}

const mapStateToProps = ({ render }: IRootState) => ({
  rendered: render.rendered,
});

//@ts-ignore
export default connect(mapStateToProps)(RemarkLauncher);
