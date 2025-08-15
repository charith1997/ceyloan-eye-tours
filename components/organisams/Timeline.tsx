import React from "react";
import Button from "@/components/atoms/Button";
import TimelineItem from "../molecules/TimelineItem";

const trips = [
  {
    day: "Day 01",
    title: "Pinnawala - Kandy",
    imageUrl: "/family tours/Wildlife.jpg",
    points: [
      "Pickup from Airport and proceed to Kandy.",
      "On the way visit the Pinnawala elephant orphanage.",
    ],
    isLeft: false,
  },
  {
    day: "Day 02",
    title: "Kandy - Knuckles",
    imageUrl: "/family tours/Soft Adventure.jpg",
    points: [
      "Early breakfast a visit to the Knuckles mountain range.",
      "The Knuckles Range consists of the Knuckles massif.",
    ],
    isLeft: true,
  },
];

const Timeline = () => {
  return (
    <div className="relative">
      <h2 className="font-work text-[36px] tracking-[0] font-medium text-red text-center mb-8">
        Trip Breakdown
      </h2>
      <div className="relative bg-gray-100 py-10">
        <div className="relative mx-auto w-full max-w-4xl">
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-300 transform -translate-x-1/2 z-0"></div>

          {trips.map((trip, index) => (
            <TimelineItem key={index} {...trip} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button
            label="Show More ..."
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
