import React from "react";
import { BedDouble, Users, Maximize2 } from "lucide-react";
import { checkImageUrl } from "@/utils/common";

interface RoomDescription {
  room_type: string;
  description: string[];
  beds: number;
  size: string;
  members: number;
  image?: string; // Optional image URL
}

interface RoomDetailsProps {
  rooms: RoomDescription[];
}

export default function RoomDetails({ rooms }: RoomDetailsProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 w-full">
      <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-6">
        Room Details
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {room.image && (
              <div className="relative w-full h-40 md:h-48 overflow-hidden">
                <img
                  src={checkImageUrl(room.image)}
                  alt={room.room_type}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            <div className="p-4 md:p-5">
              <h5 className="text-base md:text-lg font-bold text-gray-900 mb-3 capitalize">
                {room.room_type}
              </h5>

              <div className="flex flex-wrap gap-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-1.5 text-sm text-gray-700">
                  <BedDouble size={16} className="text-blue-500" />
                  <span>
                    {room.beds} Bed{room.beds > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-gray-700">
                  <Maximize2 size={16} className="text-green-500" />
                  <span>{room.size}</span>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-gray-700">
                  <Users size={16} className="text-purple-500" />
                  <span>
                    {room.members} Member{room.members > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-600 mb-2 uppercase">
                  Options
                </p>
                <ul className="space-y-1.5">
                  {room.description.map((desc, descIdx) => (
                    <li
                      key={descIdx}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-green-500 font-bold mt-0.5">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {rooms.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No room details available</p>
        </div>
      )}
    </div>
  );
}
