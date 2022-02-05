import React, { ReactElement } from "react";

interface IAlertProps {
  type: "ERROR" | "SUCCESS";
  text?: string;
}

export default function Alert({ type, text }: IAlertProps): ReactElement {
  return (
    <>
      <div
        className={`mt-3 w-full ${
          type == "ERROR"
            ? "border-red-300 bg-red-200"
            : "border-green-300 bg-green-200"
        } rounded-md border px-3 py-2`}
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
