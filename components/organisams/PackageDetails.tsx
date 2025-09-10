import Image from "next/image";
import React from "react";
import Button from "../atoms/Button";
import PackageOverview from "../molecules/PackageOverview";
import PackageHighlights from "../molecules/PackageHighlights";
import Timeline from "./Timeline";
import IncludesAndExcludes from "../molecules/IncludesAndExcludes";

interface PackageDetailsProps {
  description: string[];
  highlights: string[];
  includes: string[];
  excludes: string[];
  images: string[];
  places: any[];
  handleBooking: () => void;
}

const PackageDetails = ({
  description,
  images,
  highlights,
  includes,
  excludes,
  places,
  handleBooking,
}: PackageDetailsProps) => {
  return (
    <>
      <div className="py-5 max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-10">
          <PackageOverview description={description} images={images} />

          <PackageHighlights
            highlights={highlights}
            handleBooking={handleBooking}
          />
        </div>
      </div>

      <Timeline places={places} />

      <div className="flex flex-col lg:flex-row">
        <IncludesAndExcludes includes={includes} excludes={excludes} />
        <div className="relative lg:w-1/2 p-6 xl:mx-32">
          <Image
            src="/round tours/Map.png"
            alt="Map of Tour"
            width={500}
            height={300}
            className="rounded-lg object-fill w-full h-120"
          />
        </div>
      </div>
    </>
  );
};

export default PackageDetails;
