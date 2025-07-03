import React from "react";
import Image from "next/image";

interface TripCardProps {
  day: string;
  title: string;
  imageUrl: string;
  points: string[];
  isLeft?: boolean;
}

const TripCard: React.FC<TripCardProps> = ({
  day,
  title,
  imageUrl,
  points,
  isLeft,
}) => {
  return (
    <div
      className={`flex flex-col w-full max-w-md p-3 shadow-lg rounded-lg bg-white ${isLeft ? "items-start text-left" : "items-end text-right"
        }`}
    >
      <div className="w-full">
        <div className="relative">
          <Image
            src={imageUrl}
            alt={title}
            width={600}
            height={400}
            className="rounded-md object-cover"
          />
          <div className="w-full absolute top-0 left-0 bg-gradient-to-r from-red to-orange font-work text-white px-4 py-2 text-sm font-semibold rounded-tr-lg rounded-bl-lg text-left">
            <span className="pr-8">{day}</span> | <span className="pl-8">{title.toUpperCase()}</span>
          </div>
        </div>
        <ul className="mt-2 text-gray-800 text-sm list-disc pl-4 justify-items-start">
          {points.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TripCard;
