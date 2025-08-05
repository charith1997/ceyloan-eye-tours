import React from "react";

interface TextAreaProps {
  label: string;
  classname?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textAreaClassNames?: string;
  labelClassNames?: string;
}

const TextArea = ({
  label,
  value,
  onChange,
  textAreaClassNames,
  labelClassNames,
}: TextAreaProps) => {
  return (
    <div>
      <label htmlFor={label} className={labelClassNames}>
        {label}
      </label>
      <textarea
        id={label}
        className={textAreaClassNames}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextArea;
