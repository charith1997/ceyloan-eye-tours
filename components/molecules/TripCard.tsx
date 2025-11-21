import React from "react";
import Image from "next/image";
import { checkImageUrl } from "@/utils/common";

interface TripCardProps {
  trip: any;
  id: number;
}

const TripCard: React.FC<TripCardProps> = ({ trip, id }) => {
  const { place, packagePlace } = trip;

  return (
    <div className="flex flex-col w-full max-w-md p-3">
      <div
        className={`w-full p-3 shadow-lg bg-white ${
          id % 2 === 0
            ? "rounded-tr-xl rounded-bl-xl rounded-br-xl"
            : "rounded-tl-xl rounded-bl-xl rounded-br-xl"
        }`}
      >
        <div className="relative">
          <img
            src={checkImageUrl(place.image_url)}
            alt={place.name}
            className="rounded-xl object-cover w-md h-72"
          />
          <div
            className={`w-full absolute top-0 left-0 bg-orange text-white px-4 py-2 text-sm font-semibold ${
              id % 2 === 0
                ? "rounded-tr-lg rounded-bl-lg rounded-br-lg"
                : "rounded-tl-lg rounded-bl-lg rounded-br-lg"
            } text-left`}
          >
            <span className="pr-2">{`Day ${packagePlace.day_no}`}</span> |{" "}
            <span className="pl-2">{`${place.name} - ${place.location}`}</span>
          </div>
        </div>
        <ul className="mt-2 text-gray-800 text-sm list-disc pl-4 justify-items-start md:hidden">
          {packagePlace.events.map((point: any, idx: number) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TripCard;
