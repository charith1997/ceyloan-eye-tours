import React from "react";
import { useField, useFormikContext } from "formik";

interface FileUploaderProps {
  name: string;
  label?: string;
  accept?: string;
  className?: string;
  multiple?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  name,
  label,
  accept = "image/*",
  className = "",
  multiple = false,
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      if (multiple) {
        setFieldValue(name, Array.from(files));
      } else {
        setFieldValue(name, files[0]);
      }
    } else {
      setFieldValue(name, multiple ? [] : null);
    }
  };

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block mb-1 font-medium">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600"
      />
      {meta.touched && meta.error && (
        <div className="text-red text-xs mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default FileUploader;
