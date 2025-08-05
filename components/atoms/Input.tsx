import React from "react";

interface InputProps {
  label?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputClassNames?: string;
  labelClassNames?: string;
}

export const Input = ({
  label,
  inputClassNames,
  type = "text",
  value,
  onChange,
  placeholder,
  labelClassNames,
}: InputProps) => {
  return (
    <div className="block">
      <label htmlFor={label} className={labelClassNames}>
        {label}
      </label>
      <input
        id={label}
        value={value}
        placeholder={placeholder}
        className={inputClassNames}
        onChange={onChange}
        type={type}
      />
    </div>
  );
};
