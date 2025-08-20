import React from "react";
import { FieldArray, Field, ErrorMessage, useFormikContext } from "formik";

interface FormikFieldArrayProps {
  name: string;
  label?: string;
  placeholder?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

function FormikFieldArray({
  name,
  label,
  placeholder = "",
  inputClassName = "w-full text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none",
  buttonClassName = "btn",
}: FormikFieldArrayProps) {
  const { values } = useFormikContext<any>();
  const arrValues = values[name] || [];

  return (
    <>
      {label && <label className="text-sm font-medium">{label}</label>}
      <FieldArray name={name}>
        {({ push, remove }) => (
          <div>
            {arrValues.map((val: string, idx: number) => (
              <div key={idx}>
                <div key={idx} className="flex gap-2 mb-2">
                  <Field
                    name={`${name}.${idx}`}
                    placeholder={placeholder}
                    className={inputClassName}
                  />
                  <button
                    type="button"
                    onClick={() => remove(idx)}
                    className={buttonClassName}
                    disabled={arrValues.length === 1}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => push("")}
                    className={buttonClassName}
                  >
                    +
                  </button>
                </div>
                <ErrorMessage
                  name={`${name}.${idx}`}
                  component="div"
                  className="justify-self-end text-xs font-medium text-red"
                />
              </div>
            ))}
          </div>
        )}
      </FieldArray>
    </>
  );
}

export default FormikFieldArray;
