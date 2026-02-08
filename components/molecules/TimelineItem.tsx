import React, { useState } from "react";
import TripCard from "./TripCard";
import TripDetails from "./TripDetails";

interface TimelineItemProps {
  trip: any;
  id: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ trip, id }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex w-full my-6 md:my-8 flex-col ${
        id % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full relative items-center hidden md:flex">
        <TripDetails
          events={trip.packagePlace.events}
          id={id}
          isHovered={isHovered}
        />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center z-20">
        <div
          className={`relative transition-all duration-500 ${isHovered ? "scale-125" : "scale-100"}`}
        >
          <div
            className={`absolute inset-0 w-5 h-5 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-gradient-to-r from-red to-orange rounded-full blur-md transition-opacity duration-500 ${
              isHovered ? "opacity-80 animate-pulse" : "opacity-50"
            }`}
          />

          <div className="absolute inset-0 w-5 h-5 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-white rounded-full" />

          <div className="relative w-4 h-4 bg-gradient-to-br from-red to-orange rounded-full cursor-pointer shadow-lg" />
        </div>
      </div>

      <div className="w-full">
        <TripCard trip={trip} id={id} isHovered={isHovered} />
      </div>
    </div>
  );
};

export default TimelineItem;
