import React from "react";

interface InputProps {
  label?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputClassNames?: string;
  labelClassNames?: string;
  name?: string;
}

export const Input = ({
  label,
  inputClassNames,
  type = "text",
  value,
  onChange,
  placeholder,
  labelClassNames,
  name,
}: InputProps) => {
  return (
    <div className="block">
      <label htmlFor={name} className={labelClassNames}>
        {label}
      </label>
      <input
        id={name}
        value={value}
        placeholder={placeholder}
        className={inputClassNames}
        onChange={onChange}
        type={type}
        name={name}
      />
    </div>
  );
};
