import Image from "next/image";
import React from "react";

interface PackageOverviewProps {
  description: string[];
  images: string[];
}

const PackageOverview = ({ description, images }: PackageOverviewProps) => {
  return (
    <div className="flex-1">
      <h1 className="font-work text-[36px] md:text-[36px] font-semibold leading-[100%] tracking-[0] pb-6 pt-2">
        Overview
      </h1>
      {description &&
        description.map((paragraph: string, index: number) => (
          <p
            className="leading-relaxed font-work text-[16px] font-normal tracking-[0] text-justify mb-6"
            key={index}
          >
            {paragraph}
          </p>
        ))}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images?.map((src: string, i: number) => (
          <Image
            key={i}
            src={src}
            alt={`tour-${i}`}
            className="rounded-lg object-cover w-full h-52"
            width={300}
            height={200}
          />
        ))}
      </div>
    </div>
  );
};

export default PackageOverview;
