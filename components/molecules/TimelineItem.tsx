import React from "react";
import TripCard from "./TripCard";

interface TimelineItemProps {
  trip: any;
  id: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ trip, id }) => {
  return (
    <div
      className={`relative flex w-full my-4 ${
        id % 2 === 0 ? "justify-end" : "justify-start"
      }`}
    >
      <span className="absolute w-3 h-3 bg-red-500 rounded-full left-1/2 -translate-x-1/2 hidden lg:block cursor-pointer"></span>
      <TripCard trip={trip} id={id} />
    </div>
  );
};

export default TimelineItem;
