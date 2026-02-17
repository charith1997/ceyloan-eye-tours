import React from "react";
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
    <div className="space-y-8 sm:space-y-12 lg:space-y-16">
      <div className="py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <PackageOverview description={description} images={images} />
          <PackageHighlights
            highlights={highlights}
            handleBooking={handleBooking}
          />
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <Timeline places={places} />

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 py-4 sm:py-6">
        <IncludesAndExcludes includes={includes} excludes={excludes} />

        <div className="lg:w-1/2 lg:sticky lg:top-24 lg:self-start">
          {places.length > 0 && (
            <MapWithLines
              places={places.map((item) => ({
                coordinates: [
                  parseFloat(item.place.longitude).toFixed(
                    4,
                  ) as unknown as number,
                  parseFloat(item.place.latitude).toFixed(
                    4,
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
    </div>
  );
};

export default PackageDetails;
