"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { checkImageUrl } from "@/utils/common";

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

  return (
    <Link href={`${pathname}/${slug}`}>
      <div className="relative h-80 md:h-100 rounded-xl overflow-hidden shadow-lg group transition-transform hover:scale-105 cursor-pointer">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 w-full h-60 md:h-80 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        )}

        <img
          src={imageUrl ? checkImageUrl(imageUrl) : "/default-image.jpg"}
          alt={title}
          className={`absolute inset-0 w-full h-60 md:h-80 object-cover bg-center bg-cover group-hover:scale-110 transition-all duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

        <div
          className={`transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {children}
        </div>
      </div>
    </Link>
  );
}
