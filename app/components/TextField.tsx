import React from "react";

interface TextFieldProps {
  label: string;
  isTextArea?: boolean;
  classname?: string;
}

const TextField = ({ label, isTextArea, classname }: TextFieldProps) => {
  if (isTextArea) {
    return (
      <div>
        <label htmlFor={label} className="block text-sm font-medium">
          {label}
        </label>
        <textarea
          id={label}
          className={`w-full text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none ${classname}`}
        />
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium">
        {label}
      </label>
      <input
        type="text"
        id={label}
        className={`w-full text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none ${classname}`}
      />
    </div>
  );
};

export default TextField;
