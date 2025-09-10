import { ErrorMessage, Field } from "formik";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  as?: string;
  rows?: number;
}

export const FormikInput = ({
  label,
  name,
  as,
  rows,
  ...props
}: InputProps) => {
  return (
    <div className="block">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <Field
        name={name}
        id={name}
        className="w-full text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none"
        as={as}
        rows={rows}
        {...props}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="justify-self-end text-xs font-medium text-red"
      />
    </div>
  );
};
