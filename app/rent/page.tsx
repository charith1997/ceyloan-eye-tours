import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RentVehicle() {
  return (
    <section className="py-16 px-4 md:px-16">
      <div
        className="rounded-xl shadow-md bg-cover bg-center h-[300px]  inset-0 z-0 relative"
        style={{ backgroundImage: 'url("/rent/Rent Vehicle.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/20 rounded-xl z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white gap-6">
          <p className="font-[Work_Sans] text-[36px] md:text-[64px] font-bold leading-[100%] tracking-[0] whitespace-nowrap">
            Rent a vehicle
          </p>
          <p className="font-[Work_Sans] text-[16px] font-medium leading-[24px] tracking-[0] w-full sm:w-3/5 text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s,
          </p>
        </div>
      </div>
      <div className="py-12">
        <div className="mb-4 text-sm font-medium text-gray-700">
          <span className="font-work text-[14px] md:text-[16px] text-black font-semibold leading-[100%] tracking-wide">
            Home
          </span>
          <span className="mx-1">{">"}</span>
          <span className="font-work text-[14px] md:text-[16px] text-red font-semibold leading-[100%] tracking-wide">
            Rent a vehicle
          </span>
        </div>

        <h1 className="text-[28px] md:text-[36px] font-normal leading-[100%] tracking-[0] pb-6 pt-2">
          Vehicles
        </h1>

        <p className="text-[#6c6b6b] leading-relaxed font-work text-[16px] tracking-[0] text-justify pb-6">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into typesetting, remaining
          essentially unchanged.
        </p>

        <h1 className="text-[28px] md:text-[36px] font-normal leading-[100%] tracking-[0] pb-6 pt-2">
          Rules and Regulations
        </h1>

        <p className="text-[#6c6b6b] leading-relaxed font-work text-[16px] tracking-[0] text-justify">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into typesetting, remaining
          essentially unchanged.
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
                <h3 className="font-work text-md md:text-lg font-extrabold uppercase tracking-widest">
                  Mini Bus
                </h3>
                <p className="font-work text-sm md:text-md font-medium">
                  Starting from $150
                </p>
              </div>
              <div className="text-end">
                <h3 className="font-work text-sm md:text-sm font-normal flex items-center gap-2">
                  <Users />
                  18
                </h3>
                <p className="font-work text-sm md:text-base font-normal">
                  People
                </p>
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
                <h3 className="font-work text-md md:text-lg font-extrabold uppercase tracking-widest">
                  Van
                </h3>
                <p className="font-work text-sm md:text-md font-medium">
                  Starting from $100
                </p>
              </div>
              <div className="text-end">
                <h3 className="font-work text-sm md:text-sm font-normal flex items-center gap-2">
                  <Users />8
                </h3>
                <p className="font-work text-sm md:text-base font-normal">
                  People
                </p>
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
                <h3 className="font-work text-md md:text-lg font-extrabold uppercase tracking-widest">
                  Car
                </h3>
                <p className="font-work text-sm md:text-md font-medium">
                  Starting from $50
                </p>
              </div>
              <div className="text-end">
                <h3 className="font-work text-sm md:text-sm font-normal flex items-center gap-2">
                  <Users />4
                </h3>
                <p className="font-work text-sm md:text-base font-normal">
                  People
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
