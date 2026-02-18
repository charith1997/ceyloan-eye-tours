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

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      React.createElement(Star, {
        key: `full-${i}`,
        className: `${filledClass} transition-all duration-300 hover:scale-110 drop-shadow-md`,
      })
    );
  }

  // Half star
  if (hasHalfStar) {
    stars.push(
      React.createElement(
        "div",
        { key: "half", className: "relative" },
        React.createElement(Star, {
          className: `${emptyClass} drop-shadow-sm`,
        }),
        React.createElement(Star, {
          className: `${filledClass} absolute top-0 left-0 overflow-hidden drop-shadow-md transition-all duration-300 hover:scale-110`,
          style: { clipPath: "inset(0 50% 0 0)" },
        })
      )
    );
  }

  // Empty stars
  const emptyStars = maxRating - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      React.createElement(Star, {
        key: `empty-${i}`,
        className: `${emptyClass} transition-all duration-300 hover:scale-110`,
      })
    );
  }

  return stars;
};

// Enhanced render stars specifically for white/gradient backgrounds
export const renderStarsWhite = (
  rating: number = 5,
  maxRating: number = 5
): React.ReactNode[] => {
  return renderStars(
    rating,
    maxRating,
    "w-4 h-4 sm:w-5 sm:h-5 fill-white text-white drop-shadow-lg",
    "w-4 h-4 sm:w-5 sm:h-5 text-white/40"
  );
};

// Enhanced render with glow effect for colored backgrounds
export const renderStarsGlow = (
  rating: number = 5,
  maxRating: number = 5
): React.ReactNode[] => {
  const stars: React.ReactNode[] = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Full stars with glow
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      React.createElement(
        "div",
        { key: `full-${i}`, className: "relative" },
        // Glow layer
        React.createElement("div", {
          className:
            "absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 bg-yellow-300 rounded-full blur-sm opacity-50",
        }),
        // Star
        React.createElement(Star, {
          className:
            "relative w-4 h-4 sm:w-5 sm:h-5 fill-white text-white drop-shadow-xl transition-all duration-300 hover:scale-125 hover:rotate-12",
        })
      )
    );
  }

  // Half star with glow
  if (hasHalfStar) {
    stars.push(
      React.createElement(
        "div",
        { key: "half", className: "relative" },
        // Glow layer
        React.createElement("div", {
          className:
            "absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 bg-yellow-300 rounded-full blur-sm opacity-30",
        }),
        // Empty star base
        React.createElement(Star, {
          className: "relative w-4 h-4 sm:w-5 sm:h-5 text-white/40",
        }),
        // Filled half
        React.createElement(Star, {
          className:
            "absolute top-0 left-0 w-4 h-4 sm:w-5 sm:h-5 fill-white text-white drop-shadow-xl overflow-hidden transition-all duration-300 hover:scale-125",
          style: { clipPath: "inset(0 50% 0 0)" },
        })
      )
    );
  }

  // Empty stars
  const emptyStars = maxRating - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      React.createElement(Star, {
        key: `empty-${i}`,
        className:
          "w-4 h-4 sm:w-5 sm:h-5 text-white/30 transition-all duration-300 hover:scale-110 hover:text-white/50",
      })
    );
  }

  return stars;
};
