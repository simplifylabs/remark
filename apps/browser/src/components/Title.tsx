import React from "react";

interface IProps {
  title: string;
  subtitle: string;
}

export default function Title(props: IProps) {
  return (
    <div className="mb-5 flex flex-col items-center justify-center">
      <h2 className="text-brand -mb-1 text-lg uppercase tracking-[3px]">
        {props.subtitle}
      </h2>
      <h1 className="text-default text-4xl font-bold">{props.title}</h1>
    </div>
  );
}
