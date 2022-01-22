import React, { useEffect, useState } from "react";

interface IProps {
  options: string[];
  initialSelected?: number;
  selected?: number;
  onChange?: (i: number, option: string) => void;
  small?: boolean;
}

export default function TextSwitch(props: IProps) {
  const [focused, setFocused] = useState(
    props.initialSelected ? props.initialSelected : 0
  );

  useEffect(() => {
    if (props.selected !== undefined) setFocused(props.selected);
  }, [props.selected]);

  function focus(index: number) {
    if (props.onChange) props.onChange(index, props.options[index]);
    if (props.selected == undefined) setFocused(index);
  }

  return (
    <div
      className={`relative flex flex-row justify-center items-center border bg-white dark:bg-background-form border-gray-200 dark:border-white/20 ${
        props.small ? "p-0.5" : "p-1"
      } rounded-lg shadow-sm`}
    >
      {props.options.map((option, index) => (
        <button
          key={index}
          onClick={() => focus(index)}
          className={`text-sm whitespace-nowrap px-[0.6rem] h-7 cursor-pointer ${
            index == props.options.length - 1
              ? "rounded-r-md"
              : index == 0
              ? "rounded-l-md"
              : ""
          }  ${
            focused == index
              ? `bg-black/5 text-gray-700 dark:bg-white/10 dark:text-gray-200 transition-all`
              : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
