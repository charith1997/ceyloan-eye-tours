"use client";

import Jumbotron from "@/components/molecules/Jumbotron";
import PageRouting from "@/components/molecules/PageRouting";
import { Users, CheckCircle2, AlertCircle, Car } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function VehicleCard({
  href,
  image,
  name,
  price,
  capacity,
}: {
  href: string;
  image: string;
  name: string;
  price: number;
  capacity: number;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-80 sm:h-[22rem] md:h-[26rem] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        )}

        <Image
          src={image}
          alt={name}
          fill
          className={`object-cover transition-all duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          } ${isHovered ? "scale-110" : "scale-100"}`}
          onLoad={() => setImageLoaded(true)}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm shadow-lg z-10">
          <Users className="w-4 h-4 text-red" />
          <span className="text-xs font-bold text-gray-700">
            {capacity} Seats
          </span>
        </div>

        <div
          className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-2xl transition-opacity duration-700 pointer-events-none ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="bg-gradient-to-r from-red to-orange p-4 sm:p-5 relative overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 pointer-events-none ${
                isHovered ? "translate-x-full" : "-translate-x-full"
              }`}
            />

            <div className="flex justify-between items-center relative z-10">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold uppercase tracking-widest text-white drop-shadow-lg truncate">
                  {name}
                </h3>
                <p className="text-sm sm:text-base text-white/90 mt-1">
                  Starting from <span className="font-bold">${price}</span>/day
                </p>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
                <Users className="w-4 h-4 text-white" />
                <span className="text-white font-bold text-sm">{capacity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function RentVehicle() {
  const vehicles = [
    {
      href: "/rent/bus",
      image: "/rent/Bus.jpg",
      name: "Mini Bus",
      price: 150,
      capacity: 18,
    },
    {
      href: "/rent/van",
      image: "/rent/Van.jpg",
      name: "Van",
      price: 100,
      capacity: 8,
    },
    {
      href: "/rent/car",
      image: "/rent/Car.jpg",
      name: "Car",
      price: 50,
      capacity: 4,
    },
  ];

  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <Jumbotron
        title="Rent Your Perfect Vehicle"
        description="Choose from cars, vans, and buses with experienced drivers for comfortable island exploration."
        imageUrl="/hero images/rent.jpeg"
      />

      <div className="py-8 sm:py-10 md:py-12">
        <PageRouting />

        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <Car className="w-6 h-6 sm:w-7 sm:h-7 text-red" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Our Vehicles
            </h1>
          </div>
          {/* <div className="w-20 h-1 bg-gradient-to-r from-red to-orange rounded-full mb-6" /> */}

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-4 max-w-4xl">
            Travel in comfort and style with our wide selection of rental
            vehicles. Whether you're heading to the airport, exploring local
            attractions, or planning a long-distance trip, we provide safe and
            comfortable rides to suit your needs. From cars and vans to luxury
            vehicles, each option is designed to make your journey smooth and
            enjoyable.
          </p>
        </div>

        <div className="mb-10 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-red rounded-full" />
            Our Service Ensures
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              "Clean, well-maintained, and air-conditioned vehicles",
              "Experienced and friendly drivers",
              "Flexible packages for daily, weekly, or custom trips",
              "Affordable pricing with no hidden costs",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 sm:p-4 bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-xl border border-green-100"
              >
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm sm:text-base">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm sm:text-base mt-4 italic">
            Enjoy stress-free travel while we take care of the driving.
          </p>
        </div>

        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Rules & Regulations
            </h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-red to-orange rounded-full mb-6" />

          <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-4xl">
            To make your trip safe and pleasant, we kindly request all
            passengers to follow these simple guidelines:
          </p>

          <div className="bg-gradient-to-br from-red-50 to-orange-50/50 rounded-2xl p-5 sm:p-6 border border-red-100">
            <ul className="space-y-3">
              {[
                "Please wear your seatbelt at all times during the journey.",
                "Eating or drinking inside the vehicle is not encouraged to maintain cleanliness.",
                "Smoking, alcohol, or any illegal substances are strictly prohibited inside the vehicle.",
                "Be respectful to the driver and fellow passengers.",
                "For your safety, avoid distracting the driver while on the road.",
                "In case of special requests (extra stops, music, etc.), kindly inform the driver in advance.",
              ].map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-red rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {rule}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-gray-600 text-sm mt-4 pt-4 border-t border-red-200 italic">
              By following these rules, you help us ensure a comfortable and
              enjoyable travel experience for everyone.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Choose Your Vehicle
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 py-4">
          {vehicles.map((vehicle, index) => (
            <VehicleCard key={index} {...vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
