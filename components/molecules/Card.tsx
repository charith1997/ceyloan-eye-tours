"use client";

import { checkImageUrl } from "@/utils/common";
import { useState } from "react";

interface CardProps {
  title: string;
  imageUrl: string;
  children?: React.ReactNode;
}

const Card = ({ title, imageUrl, children }: CardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative h-48 md:h-64 rounded-md overflow-hidden">
      {/* Loading skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 rounded-md bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      )}

      <img
        src={checkImageUrl(imageUrl)}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImageLoaded(true)}
      />
      <div className="absolute inset-0 bg-black/50 rounded-xl z-0" />

      {children}
    </div>
  );
};

export default Card;
