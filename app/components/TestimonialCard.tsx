import React from "react";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  testimonial?: string;
  name: string;
  location?: string;
  rating?: number;
  maxRating?: number;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  testimonial,
  name,
  location,
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
          <p className="text-[#7A7A7A] text-sm leading-relaxed text-center font-bold italic">
            {testimonial}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-900 text-sm">{name}</p>
          <p className="text-gray-500 text-xs tracking-wide">{location}</p>
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
