import React from "react";

interface IProps {
  title: string;
  subtitle: string;
}

export default function Title(props: IProps) {
  return (
    <div className="flex flex-col justify-center items-center mb-5">
      <h2 className="text-lg uppercase tracking-[3px] text-brand -mb-1">
        {props.subtitle}
      </h2>
      <h1 className="text-4xl font-bold text-default">{props.title}</h1>
    </div>
  );
}
