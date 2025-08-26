import React from "react";
import Button from "@/components/atoms/Button";
import TimelineItem from "../molecules/TimelineItem";

interface TimelineProps {
  places: any[];
}

const Timeline = ({ places }: TimelineProps) => {
  const [showFullItinerary, setShowFullItinerary] = React.useState(false);

  return (
    <div className="relative">
      <h2 className="text-[36px] tracking-[0] font-medium text-red text-center mb-8">
        Trip Breakdown
      </h2>
      <div className="relative bg-gray-100 py-8">
        <div className="relative mx-auto w-full max-w-4xl">
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-300 transform -translate-x-1/2 z-0"></div>

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
          <div className="flex justify-center mt-8">
            <Button
              label={`${showFullItinerary ? "Show Less ..." : "Show More ..."}`}
              className="bg-gradient-to-r from-red to-orange text-white px-6 py-2 rounded-xl"
              onClick={() => {
                if (showFullItinerary) {
                  setShowFullItinerary(false);
                } else {
                  setShowFullItinerary(true);
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
