import React from "react";
import { notFound } from "next/navigation";
import VehicleType from "./VehicleType";

const validVehicleTypes = ["bus", "van", "car"];

interface PageProps {
  params: Promise<{ vehicle: string }>;
}

export default async function RentVehicle({ params }: PageProps) {
  const { vehicle } = await params;

  if (!validVehicleTypes.includes(vehicle)) {
    return notFound();
  }
  return (
    <section className="py-16 px-4 md:px-16">
      <div
        className="rounded-xl shadow-md bg-cover bg-center h-[300px]  inset-0 z-0 relative"
        style={{ backgroundImage: 'url("/rent/Rent Vehicle.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/20 rounded-xl z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white gap-6">
          <p className="font-[Work_Sans] text-[36px] md:text-[64px] font-bold leading-[100%] tracking-[0] whitespace-nowrap">
            Vans
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
          <span className="font-work text-[14px] md:text-[16px] text-black font-semibold leading-[100%] tracking-wide">
            Rent a vehicle
          </span>
          <span className="mx-1">{">"}</span>
          <span className="font-work text-[14px] md:text-[16px] text-red font-semibold leading-[100%] tracking-wide">
            Van
          </span>
        </div>

        <h1 className="text-[28px] md:text-[36px] font-normal leading-[100%] tracking-[0] pb-6 pt-2">
          Vans
        </h1>

        <p className="text-[#6c6b6b] leading-relaxed font-work text-[16px] font-bold tracking-[0] text-justify pb-6">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <VehicleType />
        <VehicleType />
        <VehicleType />
        <VehicleType />
      </div>
    </section>
  );
}
