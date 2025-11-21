"use client";

import Jumbotron from "@/components/molecules/Jumbotron";
import PageRouting from "@/components/molecules/PageRouting";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RentVehicle() {
  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <Jumbotron
        title="Rent a Vehicle"
        description="Find the perfect vehicle for your journey."
        imageUrl="/rent/Rent Vehicle.jpg"
      />
      <div className="py-12">
        <PageRouting />
        <h1 className="text-[28px] md:text-[36px] font-normal leading-[100%] tracking-[0] pb-6 pt-2">
          Vehicles
        </h1>

        <p className="text-[#6c6b6b] leading-relaxed text-[16px] tracking-[0] text-justify pb-4">
          Travel in comfort and style with our wide selection of rental
          vehicles. Whether you’re heading to the airport, exploring local
          attractions, or planning a long-distance trip, we provide safe and
          comfortable rides to suit your needs. From cars and vans to luxury
          vehicles, each option is designed to make your journey smooth and
          enjoyable.
        </p>

        <p className="text-[#6c6b6b] pb-4">Our service ensures:</p>

        <ul className="list-disc list-inside mb-6 text-[#6c6b6b]">
          <li>Clean, well-maintained, and air-conditioned vehicles</li>
          <li>Experienced and friendly drivers</li>
          <li>Flexible packages for daily, weekly, or custom trips</li>
          <li>Affordable pricing with no hidden costs</li>
        </ul>
        <p className="text-[#6c6b6b] pb-6">
          Enjoy stress-free travel while we take care of the driving.
        </p>

        <h1 className="text-[28px] md:text-[36px] font-normal leading-[100%] tracking-[0] pb-6 pt-4">
          Rules and Regulations
        </h1>

        <p className="text-[#6c6b6b] pb-4">
          To make your trip safe and pleasant, we kindly request all passengers
          to follow these simple guidelines:
        </p>

        <ul className="list-disc list-inside mb-6 text-[#6c6b6b]">
          <li>Please wear your seatbelt at all times during the journey.</li>
          <li>
            Eating or drinking inside the vehicle is not encouraged to maintain
            cleanliness.
          </li>
          <li>
            Smoking, alcohol, or any illegal substances are strictly prohibited
            inside the vehicle.
          </li>
          <li>Be respectful to the driver and fellow passengers.</li>
          <li>
            For your safety, avoid distracting the driver while on the road.
          </li>
          <li>
            In case of special requests (extra stops, music, etc.), kindly
            inform the driver in advance.
          </li>
        </ul>
        <p className="text-[#6c6b6b]">
          By following these rules, you help us ensure a comfortable and
          enjoyable travel experience for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
        <Link href={`/rent/bus`}>
          <div className="relative h-80 md:h-100 rounded-xl overflow-hidden shadow-lg group transition-transform hover:scale-105 cursor-pointer">
            <Image
              src="/rent/Bus.jpg"
              alt="Rent Vehicle"
              className="absolute inset-0 w-full h-60 md:h-80 object-cover bg-center bg-cover"
              fill
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

            <div className="absolute bottom-0 w-full bg-red text-white p-4 flex flex-row justify-between gap-1 items-center">
              <div>
                <h3 className="text-md md:text-lg font-extrabold uppercase tracking-widest">
                  Mini Bus
                </h3>
                <p className="text-sm md:text-md font-medium">
                  Starting from $150
                </p>
              </div>
              <div className="text-end">
                <h3 className="text-sm md:text-sm font-normal flex items-center gap-2">
                  <Users />
                  18
                </h3>
                <p className="text-sm md:text-base font-normal">People</p>
              </div>
            </div>
          </div>
        </Link>
        <Link href={`/rent/van`}>
          <div className="relative h-80 md:h-100 rounded-xl overflow-hidden shadow-lg group transition-transform hover:scale-105 cursor-pointer">
            <Image
              src="/rent/Van.jpg"
              alt="Rent Vehicle"
              className="absolute inset-0 w-full h-60 md:h-80 object-cover bg-center bg-cover"
              fill
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

            <div className="absolute bottom-0 w-full bg-red text-white p-4 flex flex-row justify-between gap-1 items-center">
              <div>
                <h3 className="text-md md:text-lg font-extrabold uppercase tracking-widest">
                  Van
                </h3>
                <p className="text-sm md:text-md font-medium">
                  Starting from $100
                </p>
              </div>
              <div className="text-end">
                <h3 className="text-sm md:text-sm font-normal flex items-center gap-2">
                  <Users />8
                </h3>
                <p className="text-sm md:text-base font-normal">People</p>
              </div>
            </div>
          </div>
        </Link>
        <Link href={`/rent/car`}>
          <div className="relative h-80 md:h-100 rounded-xl overflow-hidden shadow-lg group transition-transform hover:scale-105 cursor-pointer">
            <Image
              src="/rent/Car.jpg"
              alt="Rent Vehicle"
              className="absolute inset-0 w-full h-60 md:h-80 object-cover bg-center bg-cover"
              fill
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

            <div className="absolute bottom-0 w-full bg-red text-white p-4 flex flex-row justify-between gap-1 items-center">
              <div>
                <h3 className="text-md md:text-lg font-extrabold uppercase tracking-widest">
                  Car
                </h3>
                <p className="text-sm md:text-md font-medium">
                  Starting from $50
                </p>
              </div>
              <div className="text-end">
                <h3 className="text-sm md:text-sm font-normal flex items-center gap-2">
                  <Users />4
                </h3>
                <p className="text-sm md:text-base font-normal">People</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
