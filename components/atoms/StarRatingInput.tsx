import React from "react";
import { useField, useFormikContext } from "formik";
import { Star } from "lucide-react";

interface StarRatingInputProps {
  name: string;
  maxRating?: number;
  label?: string;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({
  name,
  maxRating = 5,
  label,
}) => {
  const { setFieldValue } = useFormikContext<any>();
  const [field] = useField(name);

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        {[...Array(maxRating)].map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setFieldValue(name, i + 1)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                field.value > i
                  ? "fill-orange-400 text-orange-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
        {/* <span className="ml-2 text-sm text-gray-700">{field.value || ""}</span> */}
      </div>
    </div>
  );
};

export default StarRatingInput;
