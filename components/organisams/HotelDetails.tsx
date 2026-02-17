import { checkImageUrl } from "@/utils/common";
import {
  BriefcaseBusiness,
  Star,
  Sparkles,
  CheckCircle2,
  Users,
  Maximize,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface HotelDetailsProps {
  hotelData: any;
}

const HotelDetails = ({ hotelData }: HotelDetailsProps) => {
  return (
    <div className="py-6 sm:py-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="flex-1 min-w-0">
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#cd1a40]" />
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Overview
              </h1>
            </div>

            <div className="space-y-4">
              {hotelData?.description?.map((des: any, idx: number) => (
                <p
                  className="text-gray-600 leading-relaxed text-sm sm:text-base"
                  key={idx}
                >
                  {des}
                </p>
              ))}
            </div>
          </div>

          {hotelData?.images && (
            <div className="mb-10 sm:mb-12">
              <MasonryImageGrid images={hotelData.images} />
            </div>
          )}

          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Available Rooms
              </h1>
            </div>
            <div className="w-20 h-1 bg-gradient-to-r from-[#cd1a40] to-[#ff803c] rounded-full mb-6" />

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {hotelData?.rooms_details?.map((room: any, index: number) => (
                <HotelRoom key={index} room={room} />
              ))}
            </div>
          </div>
        </div>

        {hotelData && (
          <div className="lg:w-80 lg:flex-shrink-0 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 sm:p-8 shadow-xl border border-orange-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-[#cd1a40] to-[#ff803c] rounded-xl">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#cd1a40] to-[#ff803c] bg-clip-text text-transparent">
                  Facilities
                </h3>
              </div>

              <ul className="space-y-3">
                {hotelData?.facilities?.map((point: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 group"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#cd1a40] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelDetails;

function MasonryImageGrid({ images }: { images: string[] }) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-[#cd1a40] rounded-full" />
        Photo Gallery
      </h2>
      <div className="columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
        {images?.map((src: string, idx: number) => (
          <div
            key={idx}
            className="relative group overflow-hidden rounded-xl break-inside-avoid shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
          >
            {!loadedImages.has(idx) && (
              <div className="w-full h-48 sm:h-56 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            )}
            <Image
              src={checkImageUrl(src)}
              alt={`Hotel Image ${idx + 1}`}
              className={`w-full h-48 sm:h-56 object-cover rounded-xl transition-all duration-700 group-hover:scale-110 ${
                loadedImages.has(idx) ? "opacity-100" : "opacity-0"
              }`}
              width={300}
              height={200}
              onLoad={() => setLoadedImages((prev) => new Set(prev).add(idx))}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl flex items-end p-3">
              <span className="text-white text-xs font-semibold">
                Photo {idx + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface RoomData {
  id: string;
  room_type: string;
  description: string[];
  beds: number;
  size: string;
  members: number;
  image: string;
}

const HotelRoom = ({ room }: { room: RoomData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-xl group transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        )}

        <Image
          src={room.image ? checkImageUrl(room.image) : "/default-image.jpg"}
          alt={room.room_type}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            isHovered ? "scale-110 brightness-75" : "scale-100 brightness-100"
          } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          fill
          onLoad={() => setImageLoaded(true)}
        />

        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-50"
          }`}
        />

        {/* Room type badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-[#cd1a40] to-[#ff803c] px-3 py-1.5 rounded-xl shadow-lg">
          <span className="text-white font-bold text-xs capitalize">
            {room.room_type}
          </span>
        </div>
      </div>

      {/* Room Details */}
      <div className="bg-gradient-to-r from-[#cd1a40] to-[#ff803c] text-white p-4 sm:p-5 relative overflow-hidden">
        {/* Shimmer effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ${
            isHovered ? "translate-x-full" : "-translate-x-full"
          }`}
        />

        {/* Room Title */}
        <h3 className="text-sm sm:text-base md:text-lg font-bold tracking-wide mb-3 capitalize relative z-10">
          {room.room_type}
        </h3>

        {/* Stats chips */}
        <div className="grid grid-cols-3 gap-2 mb-3 relative z-10">
          <div className="flex items-center gap-1.5 text-xs bg-white/10 rounded-lg px-2 py-1.5 backdrop-blur-sm">
            <Maximize className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{room.size}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs bg-white/10 rounded-lg px-2 py-1.5 backdrop-blur-sm">
            <Users className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Sleeps {room.members}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs bg-white/10 rounded-lg px-2 py-1.5 backdrop-blur-sm">
            <BriefcaseBusiness className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{room.beds} beds</span>
          </div>
        </div>

        <div className="relative z-10 space-y-1 mb-3">
          {room.description.map((desc, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-xs text-white/90"
            >
              <div className="w-1 h-1 bg-white/70 rounded-full flex-shrink-0" />
              <span>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
