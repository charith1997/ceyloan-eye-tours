import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { checkImageUrl } from "@/utils/common";

interface TestimonialCardProps {
  quote: string;
  testimonial?: string;
  name: string;
  image?: string;
  rating?: number;
  maxRating?: number;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  testimonial,
  name,
  image,
  rating = 5,
  maxRating = 5,
  className = "",
}) => {
  // Generate star rating
  const renderStars = (): React.ReactNode[] => {
    const stars: React.ReactNode[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <Star
            className="w-4 h-4 fill-orange-400 text-orange-400 absolute top-0 left-0 overflow-hidden"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div>
      );
    }

    // Empty stars
    const emptyStars = maxRating - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 border border-gray-100 ${className}`}
    >
      {quote && (
        <div className="mb-4">
          <p className=" text-red font-bold text-sm leading-relaxed text-center">
            &quot;{quote}&quot;
          </p>
        </div>
      )}

      {testimonial && (
        <div className="mb-4">
          <p className="text-sm text-center font-bold italic">{testimonial}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {image ? (
            <Image
              className={`w-8 h-8 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500`}
              src={checkImageUrl(image)}
              alt={name}
              width={40}
              height={40}
            />
          ) : (
            <div
              className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-400 rounded-full text-white`}
            >
              {name && (
                <span>
                  {name
                    .split(" ")
                    .map((word: string) => word[0])
                    .join("")}
                </span>
              )}
            </div>
          )}
          <p className="text-gray-700 font-semibold text-sm">{name}</p>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5">{renderStars()}</div>
          <span className="text-sm font-medium text-gray-700 ml-1">
            {rating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
