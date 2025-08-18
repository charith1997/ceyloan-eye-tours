import React from "react";
import { useField, useFormikContext } from "formik";

interface FileUploaderProps {
  name: string;
  label?: string;
  accept?: string;
  className?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  name,
  label,
  accept = "image/*",
  className = "",
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      setFieldValue(name, e.currentTarget.files[0]);
    } else {
      setFieldValue(name, null);
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
        onChange={handleChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600"
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default FileUploader;
