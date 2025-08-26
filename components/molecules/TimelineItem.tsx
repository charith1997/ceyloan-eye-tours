import React from "react";
import TripCard from "./TripCard";

interface TimelineItemProps {
  trip: any;
  id: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ trip, id }) => {
  return (
    <div
      className={`flex w-full my-4 ${
        id % 2 === 0 ? "justify-end" : "justify-start"
      }`}
    >
      <TripCard trip={trip} id={id}/>
    </div>
  );
};

export default TimelineItem;
