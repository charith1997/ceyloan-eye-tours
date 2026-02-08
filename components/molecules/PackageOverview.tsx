import { PAGE_DESCRIPTION, PAGE_TITLE } from "@/styles/font";
import Image from "next/image";
import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { checkImageUrl } from "@/utils/common";

interface PackageOverviewProps {
  description: string[];
  images: string[];
}

const PackageOverview = ({ description, images }: PackageOverviewProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  return (
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-2">
        <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-red" />
        <h1 className={PAGE_TITLE}>Overview</h1>
      </div>

      <div className="mb-8 sm:mb-10 space-y-4">
        {description &&
          description.map((paragraph: string, index: number) => (
            <p className={PAGE_DESCRIPTION} key={index}>
              {paragraph}
            </p>
          ))}
      </div>

      {images && images.length > 0 && (
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#cd1a40] rounded-full" />
            Photo Gallery
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {images?.map((img: any, i: number) => (
              <div
                key={i}
                className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
              >
                {!loadedImages.has(i) && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                )}

                <Image
                  src={checkImageUrl(img.image_url)}
                  alt={`tour-${i}`}
                  className={`rounded-xl object-cover w-full h-48 sm:h-52 transition-all duration-700 ${
                    loadedImages.has(i)
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-110"
                  } group-hover:scale-110`}
                  width={300}
                  height={200}
                  onLoad={() => handleImageLoad(i)}
                />

                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageOverview;
