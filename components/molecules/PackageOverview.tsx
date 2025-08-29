import { PAGE_DESCRIPTION, PAGE_TITLE } from "@/styles/font";
import Image from "next/image";
import React from "react";

interface PackageOverviewProps {
  description: string[];
  images: string[];
}

const PackageOverview = ({ description, images }: PackageOverviewProps) => {
  return (
    <div className="flex-1">
      <h1 className={PAGE_TITLE}>
        Overview
      </h1>
      {description &&
        description.map((paragraph: string, index: number) => (
          <p
            className={PAGE_DESCRIPTION + " mb-4"}
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
