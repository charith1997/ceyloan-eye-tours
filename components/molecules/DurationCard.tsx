import { displayTourType } from "@/utils/common";
import { formatDuration } from "@/utils/package";
import React from "react";

interface DurationCardProps {
  duration: string;
  tour_type: number;
}

const DurationCard = ({ duration, tour_type }: DurationCardProps) => {
  return (
    <div className="pt-12 pb-8">
      <div className="flex flex-row justify-between bg-gradient-to-r from-red to-orange text-white px-4 md:px-6 py-3 rounded-md w-full md:w-fit">
        <div className="flex flex-col">
          <p>Duration</p>
          <div className="font-semibold">
            {formatDuration(duration)}
          </div>
        </div>
        <span className="h-auto border-l border-white mx-4 md:mx-8" />
        <div className="flex flex-col">
          <p>Tour Type</p>
          <div className="font-semibold">
            {displayTourType(tour_type)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DurationCard;
