"use client";

import React from "react";
import { Users } from "lucide-react";
import Image from "next/image";
import Jumbotron from "@/components/molecules/Jumbotron";
import { checkImageUrl, getLastParam } from "@/utils/common";
import { useGetVehicleByPrefixQuery } from "@/services/vehicleApi";
import { PAGE_DESCRIPTION, PAGE_TITLE } from "@/styles/font";

function MasonryImageGrid({ images }: { images: any }) {
  return (
    <div className="columns-2 md:columns-3 gap-4 pt-16 pb-8 space-y-4">
      {images.map((src: any, idx: number) => (
        <Image
          key={idx}
          src={checkImageUrl(src)}
          alt={`Hotel Image ${idx + 1}`}
          className="w-full rounded-lg mb-4"
          width={300}
          height={200}
        />
      ))}
    </div>
  );
}

function VehicleModel() {
  const lastSegment = getLastParam();
  const { data } = useGetVehicleByPrefixQuery(lastSegment);
  const vehicleDetails = data?.data || null;

  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      {vehicleDetails && (
        <>
          <Jumbotron
            title={vehicleDetails.name}
            description="Find the perfect vehicle for your journey."
            imageUrl="/rent/Rent Vehicle.jpg"
          />
          <>
            <h1 className={`${PAGE_TITLE} mt-8`}>Description</h1>
            {vehicleDetails.descriptions.map((des: any, index: number) => (
              <p className={PAGE_DESCRIPTION} key={index}>
                {des}
              </p>
            ))}
          </>
          <MasonryImageGrid images={vehicleDetails.images} />
          <div className="block md:flex py-8">
            <div className="w-full md:w-2/3">
              <h3 className="text-[36px] tracking-[0] font-medium text-red">
                Facilities
              </h3>
              <ul className="list-disc text-gray-500 text-sm space-y-2 pb-4 ml-4">
                {vehicleDetails.facilities.map((point: any, i: number) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <h3 className="text-[36px] tracking-[0] font-medium text-red py-4">
                Excludes
              </h3>
              <ul className="list-disc text-gray-500 text-sm space-y-2 pb-4 ml-4">
                {vehicleDetails.excludes.map((point: any, i: number) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <h3 className="text-[36px] tracking-[0] font-medium text-red py-4">
                Terms & Conditions
              </h3>
              <ul className="list-disc text-gray-500 text-sm space-y-2 pb-4 ml-4">
                {vehicleDetails.terms.map((term: any, i: number) => (
                  <li key={i}>{term}</li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-red items-center justify-self-center rounded-md p-8 text-white flex flex-col gap-2 ">
                <div className="text-4xl">Start from</div>
                <div className="text-4xl font-bold">
                  $ {vehicleDetails.price}
                </div>
                <div className="flex gap-2 items-center">
                  <Users width={20} />
                  <p className="text-xl font-normal">
                    {vehicleDetails.passenger_capacity} People
                  </p>
                </div>
                <div className="flex pt-2">
                  <h3 className="hidden lg:flex text-xl font-semibold tracking-wide">
                    Owner Name:
                  </h3>
                  <h3 className="text-xl tracking-wide lg:pl-2">
                    {vehicleDetails.owner}
                  </h3>
                </div>
                <div className="text-xl">{vehicleDetails.owner_contact}</div>
                <div className="text-xl">{vehicleDetails.location}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default VehicleModel;
