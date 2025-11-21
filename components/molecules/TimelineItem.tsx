import React from "react";
import TripCard from "./TripCard";
import TripDetails from "./TripDetails";

interface TimelineItemProps {
  trip: any;
  id: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ trip, id }) => {
  return (
    <div
      className={`relative flex w-full my-4 flex-col ${
        id % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div className="w-full relative items-center hidden md:flex">
        <TripDetails events={trip.packagePlace.events} id={id} />
      </div>
      <span className="absolute w-3 h-3 bg-red rounded-full left-1/2 -translate-x-1/2 hidden lg:block cursor-pointer"></span>
      <div className="w-full">
        <TripCard trip={trip} id={id} />
      </div>
    </div>
  );
};

export default TimelineItem;
