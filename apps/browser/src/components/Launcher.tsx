import React from "react";
import Fab from "@browser/components/Fab";
import Sidebar from "@browser/components/Sidebar";
import { DialogWrapper } from "@browser/components/Dialog";
import "@browser/styles/app.css";

export default function RemarkLauncher() {
  return (
    <>
      <DialogWrapper />
      <Sidebar />
      <Fab />
    </>
  );
}
