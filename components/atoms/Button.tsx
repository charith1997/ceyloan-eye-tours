import React from "react";

interface ButtonProps {
  onClick: () => void;
  label: string | React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  form?: string;
}

const Button = ({
  onClick,
  label,
  className,
  type = "button",
  form,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full text-white px-8 py-2 rounded-lg cursor-pointer ${className}`}
      form={form}
    >
      {label}
    </button>
  );
};

export default Button;
