import { usePathname } from "next/navigation";
import React from "react";
import { Star } from "lucide-react";

export const ROUND_TOURS = 1;
export const DAY_TOURS = 0;

export const getLastParam = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").filter(Boolean).pop() ?? "";
  return lastSegment;
};

export const displayTourType = (type: number) => {
  if (ROUND_TOURS === type) {
    return "Round Tours";
  }
  return "Day Tours";
};

export const checkImageUrl = (url: string) => {
  if (url.includes("http") || url.includes("https")) {
    return url;
  }
  if (url.includes("uploads")) {
    return `https://service.techsolutions.site${url}`;
  }
  return url;
};

// Reusable star renderer for ratings
export const renderStars = (
  rating: number = 5,
  maxRating: number = 5,
  filledClass: string = "w-5 h-5 fill-orange-400 text-orange-400",
  emptyClass: string = "w-5 h-5 text-gray-300"
): React.ReactNode[] => {
  const stars: React.ReactNode[] = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(React.createElement(Star, { key: `full-${i}`, className: filledClass }));
  }

  if (hasHalfStar) {
    stars.push(
      React.createElement(
        "div",
        { key: "half", className: "relative" },
        React.createElement(Star, { className: emptyClass }),
        React.createElement(Star, {
          className: filledClass + " absolute top-0 left-0 overflow-hidden",
          style: { clipPath: "inset(0 50% 0 0)" },
        })
      )
    );
  }

  const emptyStars = maxRating - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(React.createElement(Star, { key: `empty-${i}`, className: emptyClass }));
  }

  return stars;
};
