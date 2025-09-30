import { ErrorMessage, Field } from "formik";
import React from "react";

interface FormikCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  as?: string;
  rows?: number;
}

function FormikCheckbox({ label, name, value }: FormikCheckboxProps) {
  return (
    <>
      <div className="flex items-center space-x-2 ">
        <Field type="checkbox" name={name} value={value} className="h-4 w-4" />
        <label htmlFor={name} className="block text-sm font-medium">
          {label}
        </label>
      </div>
    </>
  );
}

export default FormikCheckbox;
