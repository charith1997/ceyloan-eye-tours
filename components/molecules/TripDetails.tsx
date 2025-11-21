import React from "react";

interface TripDetailsProps {
  events: any[];
  id: number;
}

function TripDetails({ events, id }: TripDetailsProps) {
  return (
    <div
      className={`flex flex-col w-sm p-4 shadow-lg bg-white absolute ${
        id % 2 === 0
          ? "rounded-tl-xl rounded-bl-xl rounded-br-xl right-4"
          : "rounded-tr-xl rounded-bl-xl rounded-br-xl left-4"
      }`}
    >
      <div>
        <h6 className="font-semibold">Trip Details</h6>
        <ul className="mt-4 text-gray-800 text-sm list-disc pl-4 justify-items-start">
          {events.map((point: any, idx: number) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TripDetails;
