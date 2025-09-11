import Image from "next/image";
import React from "react";
import Button from "../atoms/Button";
import PackageOverview from "../molecules/PackageOverview";
import PackageHighlights from "../molecules/PackageHighlights";
import Timeline from "./Timeline";
import IncludesAndExcludes from "../molecules/IncludesAndExcludes";
import MapWithLines from "../molecules/MapWithLines";

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
        <div className="relative lg:w-1/2">
          {places.length > 0 && (
            <MapWithLines
              places={places.map((item) => ({
                coordinates: [
                  parseFloat(item.place.longitude).toFixed(
                    4
                  ) as unknown as number,
                  parseFloat(item.place.latitude).toFixed(
                    4
                  ) as unknown as number,
                ] as [number, number],
                name: item.place.name,
                description: item.place.description,
                details:
                  "Population: ~750,000 | Major port city and financial center",
                color: "green",
              }))}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PackageDetails;
