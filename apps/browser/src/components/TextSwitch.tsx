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
      className={`dark:bg-background-form relative flex flex-row items-center justify-center bg-white ${
        props.small ? "p-0.5" : "p-1"
      } rounded-lg shadow-sm`}
    >
      {props.options.map((option, index) => (
        <button
          key={index}
          onClick={() => focus(index)}
          className={`h-7 cursor-pointer whitespace-nowrap px-[0.78rem] text-sm ${
            index == props.options.length - 1
              ? "rounded-r-md"
              : index == 0
              ? "rounded-l-md"
              : ""
          }  ${
            focused == index
              ? `bg-black/5 text-gray-700 transition-all dark:bg-white/10 dark:text-gray-200`
              : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
