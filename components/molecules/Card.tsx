"use client";

import { checkImageUrl } from "@/utils/common";
import { useState } from "react";
import { Sparkles } from "lucide-react";

interface CardProps {
  title: string;
  imageUrl: string;
  children?: React.ReactNode;
}

const Card = ({ title, imageUrl, children }: CardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative h-48 md:h-64 rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Loading skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      )}

      <img
        src={checkImageUrl(imageUrl)}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        } ${isHovered ? "scale-110" : "scale-100"}`}
        onLoad={() => setImageLoaded(true)}
      />

      <div
        className={`absolute inset-0 rounded-2xl z-0 transition-all duration-500 ${
          isHovered
            ? "bg-gradient-to-t from-black/85 via-black/50 to-black/20"
            : "bg-gradient-to-t from-black/70 via-black/40 to-transparent"
        }`}
      />

      <div
        className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-2xl transition-opacity duration-700 pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 pointer-events-none ${
          isHovered ? "border-white/30" : "border-transparent"
        }`}
      />

      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
};

export default Card;
