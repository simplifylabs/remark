import React, { useState } from "react";

interface IProps {
  big?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (to: boolean) => void;
}

export default function Switch(props: IProps) {
  const [id] = useState(Math.random().toString(20));

  return (
    <div
      className={`relative inline-block ${
        props.big ? "w-[3.5rem]" : "w-[3rem]"
      } align-middle select-none transition-all cursor-pointer ${
        props.disabled ? "opacity-50 cursor-not-allowed" : ""
      }
  `}
    >
      <input
        checked={props.checked}
        onChange={(e) => {
          if (props.disabled || !props.onChange) return;
          props.onChange(e.target.checked);
        }}
        type="checkbox"
        name={id}
        id={id}
        className={`toggle absolute block ${
          props.big ? "w-7 h-7" : "w-6 h-6"
        } rounded-full bg-white dark:bg-gray-800 dark:border-gray-700 border-4 appearance-none cursor-pointer transform ${
          props.big
            ? "checked:translate-x-[1.75rem]"
            : "checked:translate-x-[1.5rem]"
        } checked:border-brand dark:checked:border-brand transition-all
      ${props.disabled ? "cursor-not-allowed" : ""}`}
      />
      <label
        htmlFor={id}
        className={`block overflow-hidden ${
          props.big ? "h-7" : "h-6"
        } rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer transition-all ${
          props.disabled ? "cursor-not-allowed" : ""
        }
    `}
      ></label>
    </div>
  );
}
