import React from "react";

interface ButtonProps {
  onClick?: () => void;
  label: string | React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  form?: string;
  cursorPointer?: string;
  disabled?: boolean;
}

const Button = ({
  onClick,
  label,
  className,
  type = "button",
  form,
  cursorPointer = "cursor-pointer",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} ${cursorPointer}`}
      form={form}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
