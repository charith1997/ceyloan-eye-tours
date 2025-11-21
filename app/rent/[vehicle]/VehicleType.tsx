"use client";

import { checkImageUrl } from "@/utils/common";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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

  return (
    <div className="w-full">
      <Link href={navigationLink} className="flex h-52">
        <div className="w-3/5 bg-red rounded-l-md">
          <Image
            src={checkImageUrl(images?.[0])}
            alt="Rent Vehicle"
            className="h-52 w-full object-cover rounded-l-md rounded-t-md"
            width={100}
            height={100}
            style={{ position: "relative" }}
          />
        </div>
        <div className="w-2/5 bg-red text-white p-3 rounded-r-md">
          <h3 className="text-md md:text-lg font-extrabold uppercase">
            {name}
          </h3>
          <p className="text-sm md:text-md font-medium py-2">
            Starting from ${price}
          </p>
          <div className="flex gap-2 items-center">
            <Users width={16} />
            <p className="text-sm font-normal">{passenger_capacity} People</p>
          </div>
          <div className="flex pt-2">
            <h3 className="hidden lg:flex text-sm font-semibold tracking-wide">
              Owner Name:
            </h3>
            <h3 className="text-sm tracking-wide lg:pl-2">{owner}</h3>
          </div>
          <div className="flex">
            <div className="hidden lg:flex text-sm font-semibold tracking-wide">
              Contact number:
            </div>
            <div className="text-sm tracking-wide lg:pl-2">{owner_contact}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VehicleType;
