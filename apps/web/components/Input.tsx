import { useState, useEffect } from "react";

interface IInputProps {
  name: string;
  type: string;
  placeholder?: string;
  optional?: boolean;
  disabled?: boolean;
  autoComplete: string;
  min?: number;
  max?: number;
  initial?: string;
  value?: string;
  set: (value: string) => void;
}

export default function Input(props: IInputProps) {
  const [value, setValue] = useState<any>(props.initial || "");

  useEffect(() => {
    if (props.value == undefined) props.set(value);
  }, [value]);

  return (
    <div className="flex flex-col justify-start">
      <label
        className={`text-gray-500 text-sm`}
        htmlFor={props.name.toUpperCase().replace(" ", "")}
      >
        {props.name}
      </label>
      <input
        name={props.name.toUpperCase().replace(" ", "")}
        type={props.type}
        autoComplete={props.autoComplete}
        value={value}
        minLength={props.min}
        maxLength={props.max}
        required={props.optional == undefined ? true : props.optional}
        disabled={props.disabled == undefined ? undefined : props.disabled}
        className={`${props.disabled && "text-gray-500"}`}
        onChange={(e) =>
          props.value ? props.set(e.target.value) : setValue(e.target.value)
        }
      />
    </div>
  );
}
