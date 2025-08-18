import { ErrorMessage, Field } from "formik";
import React from "react";

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
}

export const FormikInput = ({ label, type, placeholder, name }: InputProps) => {
  return (
    <div className="block">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <Field
        name={name}
        type={type}
        className="w-full text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none"
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="justify-self-end text-xs font-medium text-red-500"
      />
    </div>
  );
};
