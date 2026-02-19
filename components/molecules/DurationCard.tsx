import { displayTourType } from "@/utils/common";
import { formatDuration } from "@/utils/package";
import React from "react";
import { Clock, Compass } from "lucide-react";

interface DurationCardProps {
  duration: string;
  tour_type: number;
}

const DurationCard = ({ duration, tour_type }: DurationCardProps) => {
  return (
    <div className="pt-8 sm:pt-12 pb-6 sm:pb-8">
      <div className="relative group">
        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-gradient-to-r from-red to-orange text-white px-4 sm:px-6 py-4 rounded-2xl shadow-xl w-full sm:w-fit overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          <div className="flex items-center gap-3 sm:gap-4 relative z-10 pb-3 sm:pb-0">
            <div className="p-2 sm:p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs sm:text-sm text-white/90 mb-1">Duration</p>
              <div className="font-bold text-base sm:text-lg md:text-xl">
                {formatDuration(duration)}
              </div>
            </div>
          </div>

          <span className="hidden sm:block h-12 md:h-14 border-l-2 border-white/30 mx-4 md:mx-6 lg:mx-8" />
          <div className="block sm:hidden w-full h-px bg-white/30 my-3" />

          <div className="flex items-center gap-3 sm:gap-4 relative z-10 pt-3 sm:pt-0">
            <div className="p-2 sm:p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs sm:text-sm text-white/90 mb-1">Tour Type</p>
              <div className="font-bold text-base sm:text-lg md:text-xl">
                {displayTourType(tour_type)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DurationCard;
