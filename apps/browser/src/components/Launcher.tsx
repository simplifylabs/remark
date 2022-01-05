import React from "react";
import Fab from "@browser/components/Fab";
import Sidebar from "@browser/components/Sidebar";
import { DialogWrapper } from "@browser/components/Dialog";
import { connect, IRootState } from "@browser/state/index";

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
