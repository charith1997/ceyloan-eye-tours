import React, { useState } from "react";
import Image from "next/image";
import { checkImageUrl } from "@/utils/common";
import { Calendar, MapPin, Clock } from "lucide-react";

interface TripCardProps {
  trip: any;
  id: number;
  isHovered?: boolean;
}

const TripCard: React.FC<TripCardProps> = ({ trip, id, isHovered = false }) => {
  const { place, packagePlace } = trip;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex flex-col w-full max-w-md p-3 animate-fadeIn">
      <div
        className={`w-full p-4 shadow-xl bg-white border border-gray-100 transition-all duration-500 ${
          id % 2 === 0
            ? "rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
            : "rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
        } ${isHovered ? "shadow-2xl scale-105" : "scale-100"} group overflow-hidden`}
      >
        <div className="relative overflow-hidden rounded-xl">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          )}

          <img
            src={checkImageUrl(place.image_url)}
            alt={place.name}
            className={`rounded-xl object-cover w-full h-64 sm:h-72 transition-all duration-700 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
            } group-hover:scale-110`}
            onLoad={() => setImageLoaded(true)}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

          <div
            className={`absolute top-0 left-0 bg-gradient-to-r from-[#cd1a40] to-[#ff803c] text-white px-4 py-2.5 text-sm font-bold shadow-lg transition-all duration-500 ${
              id % 2 === 0
                ? "rounded-tr-xl rounded-bl-xl rounded-br-xl"
                : "rounded-tl-xl rounded-bl-xl rounded-br-xl"
            } ${isHovered ? "scale-105" : "scale-100"}`}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Day {packagePlace.day_no}</span>
            </div>
          </div>

          <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-lg border border-gray-100 transition-all duration-500 group-hover:bg-white">
            <div className="flex items-center gap-2 text-gray-800">
              <MapPin className="w-4 h-4 text-[#cd1a40] flex-shrink-0" />
              <span className="font-bold text-sm truncate">{place.name}</span>
              <span className="text-gray-400">•</span>
              <span className="text-xs text-gray-600 truncate">
                {place.location}
              </span>
            </div>
          </div>
        </div>

        <div className="md:hidden mt-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-gradient-to-r from-[#cd1a40] to-[#ff803c] rounded-lg">
              <Clock className="w-3.5 h-3.5 text-white" />
            </div>
            <h6 className="font-bold text-gray-800 text-sm">
              Today's Activities
            </h6>
          </div>

          <ul className="space-y-2 text-gray-700 text-sm pl-2">
            {packagePlace.events.map((point: any, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#cd1a40] to-[#ff803c] rounded-full mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-1000 pointer-events-none rounded-2xl ${
            isHovered ? "translate-x-full" : ""
          }`}
        />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TripCard;
