import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import { X, Upload } from "lucide-react";
import Image from "next/image";
import Button from "./Button";

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
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const files = field.value;
    if (!files) {
      setPreviews([]);
      return;
    }

    const fileArray = multiple ? files : [files];
    const newPreviews: string[] = [];

    fileArray.forEach((file: File) => {
      if (file && file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        newPreviews.push(url);
      }
    });

    setPreviews(newPreviews);

    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [field.value, multiple]);

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

  const handleRemove = (index: number) => {
    if (multiple) {
      const files = field.value as File[];
      const newFiles = files.filter((_, i) => i !== index);
      setFieldValue(name, newFiles);
    } else {
      setFieldValue(name, null);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const getFileCountText = () => {
    if (!field.value) return "No files selected";

    if (multiple) {
      const fileCount = (field.value as File[]).length;
      return fileCount === 1
        ? "1 file selected"
        : `${fileCount} files selected`;
    } else {
      return (field.value as File).name;
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
        ref={inputRef}
        id={name}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />

      <div className="flex items-center gap-3">
        <Button
          type="button"
          onClick={handleButtonClick}
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition-colors"
          label={
            <>
              <Upload size={16} />
              Choose {multiple ? "Files" : "File"}
            </>
          }
        />
        <span className="text-sm text-gray-600">{getFileCountText()}</span>
      </div>

      {meta.touched && meta.error && (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      )}

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-28 object-cover rounded-lg border-2 border-gray-200"
                width={100}
                height={100}
              />
              <Button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                aria-label="Remove image"
                label={<X size={16} />}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
