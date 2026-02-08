import React from "react";
import Button from "@/components/atoms/Button";
import TimelineItem from "../molecules/TimelineItem";
import { MapIcon, ChevronDown, ChevronUp } from "lucide-react";

interface TimelineProps {
  places: any[];
}

const Timeline = ({ places }: TimelineProps) => {
  const [showFullItinerary, setShowFullItinerary] = React.useState(false);

  return (
    <div className="relative">
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex items-center justify-center gap-3 mb-3">
          <MapIcon className="w-7 h-7 sm:w-8 sm:h-8 text-red" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-red to-orange bg-clip-text text-transparent">
            Trip Breakdown
          </h2>
        </div>
        <p className="text-gray-600 mt-3 text-sm sm:text-base">
          Discover your journey day by day
        </p>
      </div>

      <div className="relative bg-gradient-to-br from-white to-orange-50/30 rounded-2xl p-0 sm:p-6 md:p-8 shadow-xl mb-8 border border-orange-100/50">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100/40 to-transparent rounded-2xl blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-red-100/40 to-transparent rounded-2xl blur-2xl" />

        <div className="relative mx-auto w-full max-w-4xl">
          <div className="absolute left-1/2 h-full w-1 bg-gradient-to-b from-red via-orange to-red -translate-x-1/2 hidden lg:block rounded-full shadow-lg" />

          {places?.length >= 2 &&
            !showFullItinerary &&
            places
              .slice(0, 2)
              .map((trip: any, index: number) => (
                <TimelineItem key={index} trip={trip} id={index} />
              ))}

          {places?.length > 2 &&
            showFullItinerary &&
            places.map((trip: any, index: number) => (
              <TimelineItem key={index} trip={trip} id={index} />
            ))}
        </div>

        {places?.length > 2 && (
          <div className="flex justify-center mt-8 sm:mt-10 relative">
            <div className="relative group">
              <Button
                label={
                  <span className="flex items-center gap-2 relative z-10">
                    {showFullItinerary ? (
                      <>
                        <ChevronUp className="w-5 h-5" />
                        <span className="font-semibold">Show Less</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-5 h-5" />
                        <span className="font-semibold">
                          Show More ({places.length - 2} more days)
                        </span>
                      </>
                    )}
                  </span>
                }
                className="relative bg-gradient-to-r from-red to-orange text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setShowFullItinerary(!showFullItinerary)}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full text-sm text-gray-700 shadow-md">
          <span className="w-2 h-2 bg-red rounded-full animate-pulse" />
          <span className="font-medium">
            Total: {places?.length} days of adventure
          </span>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
