import React, { ReactElement } from "react";

interface IAlertProps {
  type: "ERROR" | "SUCCESS";
  text?: string;
}

export default function Alert({ type, text }: IAlertProps): ReactElement {
  return (
    <>
      <div
        className={`w-full mt-3 ${
          type == "ERROR"
            ? "bg-red-200 border-red-300"
            : "bg-green-200 border-green-300"
        } px-3 py-2 rounded-md border`}
      >
        <p
          className={`${
            type == "ERROR" ? "text-red-500" : "text-green-600"
          } text-sm`}
        >
          {text}
        </p>
      </div>
    </>
  );
}
