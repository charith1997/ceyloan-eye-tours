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
      <div className="flex flex-row bg-gradient-to-r from-red to-orange text-white px-6 py-3 rounded-md w-fit">
        <div className="flex flex-col">
          <p className="font-normal text-md">Duration</p>
          <div className="font-bold text-xl tracking-[1px]">
            {formatDuration(duration)}
          </div>
        </div>
        <span className="h-auto border-l border-white mx-8" />
        <div className="flex flex-col">
          <p className="font-normal text-md">Tour Type</p>
          <div className="font-bold text-xl tracking-[1px]">
            {displayTourType(tour_type)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DurationCard;
