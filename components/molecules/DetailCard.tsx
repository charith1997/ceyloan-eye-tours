"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { checkImageUrl } from "@/utils/common";
import { ArrowUpRight } from "lucide-react";

interface DetailCardProps {
  title: string;
  imageUrl: string;
  price: string;
  slug: string;
  children: React.ReactNode;
}

export default function DetailCard({
  title,
  imageUrl,
  slug,
  children,
}: DetailCardProps) {
  const pathname = usePathname();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`${pathname}/${slug}`}>
      <div
        className="relative h-80 sm:h-[22rem] md:h-[26rem] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl group cursor-pointer transition-all duration-500 transform hover:-translate-y-2 border border-white/10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        )}

        <img
          src={imageUrl ? checkImageUrl(imageUrl) : "/default-image.jpg"}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          } ${isHovered ? "scale-110" : "scale-100"}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500" />

        <div
          className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transition-opacity duration-700 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute inset-0 rounded-2xl border-2 pointer-events-none transition-all duration-500 ${
            isHovered ? "border-white/25" : "border-transparent"
          }`}
        />

        <div
          className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {children}
        </div>
      </div>
    </Link>
  );
}
