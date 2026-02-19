"use client";

import { checkImageUrl } from "@/utils/common";
import { Users, ArrowRight, Phone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface VehicleTypeProps {
  name: string;
  price: number;
  passenger_capacity: number;
  owner: string;
  owner_contact: string;
  images: string[];
  url_prefix: string;
}

const VehicleType = ({
  name,
  price,
  passenger_capacity,
  owner,
  owner_contact,
  images,
  url_prefix,
}: VehicleTypeProps) => {
  const pathname = usePathname();
  const navigationLink = `${pathname}/${url_prefix}`;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={navigationLink}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col sm:flex-row h-auto sm:h-60 md:h-64 group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
        <div className="w-full sm:w-3/5 relative overflow-hidden bg-gray-100 h-48 sm:h-full">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          )}

          <Image
            src={checkImageUrl(images?.[0])}
            alt={name}
            fill
            className={`object-cover transition-all duration-700 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } ${isHovered ? "scale-110" : "scale-100"}`}
            onLoad={() => setImageLoaded(true)}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm shadow-lg">
            <Users className="w-4 h-4 text-red" />
            <span className="text-xs font-bold text-gray-700">
              {passenger_capacity} Seats
            </span>
          </div>
        </div>

        <div className="w-full sm:w-2/5 bg-gradient-to-br from-white to-gray-50 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 pointer-events-none ${
              isHovered ? "translate-x-full" : "-translate-x-full"
            }`}
          />

          <div className="relative z-10 space-y-3">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase text-gray-900 leading-tight">
              {name}
            </h3>

            <div className="flex items-baseline gap-1.5">
              <span className="text-xs sm:text-sm text-gray-500">From</span>
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red to-orange bg-clip-text text-transparent">
                ${price}
              </span>
              {/* <span className="text-xs sm:text-sm text-gray-500">/day</span> */}
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-600 truncate">
                  {owner}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-600">
                  {owner_contact}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`relative z-10 mt-4 transition-all duration-500 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-100 translate-y-0 sm:opacity-0 SM:translate-y-2"
            }`}
          >
            <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red to-orange text-white text-sm font-bold shadow-lg">
              <span>View Details</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VehicleType;
