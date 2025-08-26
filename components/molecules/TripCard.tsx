import React from "react";
import Image from "next/image";

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
          <Image
            src={place.image_url}
            alt={place.name}
            width={600}
            height={400}
            className="rounded-md object-cover"
          />
          <div className="w-full absolute top-0 left-0 bg-gradient-to-r from-red to-orange text-white px-4 py-2 text-sm font-semibold rounded-tr-lg rounded-bl-lg text-left">
            <span className="pr-8">{`Day ${packagePlace.day_no}`}</span> |{" "}
            <span className="pl-8">{`${place.name.toUpperCase()} - ${place.location.toUpperCase()}`}</span>
          </div>
        </div>
        <ul className="mt-2 text-gray-800 text-sm list-disc pl-4 justify-items-start">
          {packagePlace.events.map((point: any, idx: number) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TripCard;
