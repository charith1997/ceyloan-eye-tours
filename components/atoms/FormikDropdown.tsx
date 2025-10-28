import { ErrorMessage, Field } from "formik";
import React from "react";

interface FormikDropdownProps {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  defaultOption?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function FormikDropdown({
  label,
  name,
  options,
  defaultOption = "Select",
  onChange,
}: FormikDropdownProps) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <Field
        as="select"
        name={name}
        className="w-full text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none"
        {...(onChange ? { onChange } : {})}
      >
        <option value="">{defaultOption}</option>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red text-xs justify-self-end"
      />
    </div>
  );
}

export default FormikDropdown;
