import { Field } from "formik";
import React from "react";

interface FormikRadioButtonProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
}

function FormikRadioButton({ label, name, options }: FormikRadioButtonProps) {
  return (
    <div className="block">
      <label className="block text-sm font-medium">{label}</label>
      <div className="mt-2 gap-4 flex">
        {options.map((option) => (
          <label key={option.value} className="inline-flex items-center">
            <Field
              type="radio"
              name={name}
              value={option.value}
              className="h-4 w-4 border-gray-300 "
            />
            <span className="ml-2 text-sm text-gray-600">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default FormikRadioButton;
