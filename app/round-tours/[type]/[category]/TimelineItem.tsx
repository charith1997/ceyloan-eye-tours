import React from "react";
import TripCard from "./TripCard";

interface TimelineItemProps {
  day: string;
  title: string;
  imageUrl: string;
  points: string[];
  isLeft?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = (props) => {
  const { isLeft = false } = props;
  return (
    <div
      className={`flex w-full ${isLeft ? "justify-start" : "justify-end"} my-4`}
    >
      <TripCard {...props} />
    </div>
  );
};

export default TimelineItem;
