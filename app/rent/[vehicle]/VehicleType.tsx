"use client";

import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const VehicleType = () => {
  const pathname = usePathname();

  return (
    <Link href={`${pathname}/layland`}>
      <div className="flex h-44">
        <div className="w-2/5 bg-red rounded-l-md">
          <Image
            src="/rent/Van Type1.jpg"
            alt="Rent Vehicle"
            className="h-44 w-full object-cover rounded-l-md rounded-t-md"
            width={100}
            height={100}
            style={{ position: "relative" }}
          />
        </div>
        <div className="w-3/5 bg-red text-white p-3 rounded-r-md">
          <h3 className="text-md md:text-lg font-extrabold uppercase tracking-widest">
            Model
          </h3>
          <p className="text-sm md:text-md font-medium py-2">
            Starting from $150
          </p>
          <div className="flex gap-2 items-center">
            <Users width={16} />
            <p className="text-sm font-normal">18 People</p>
          </div>
          <div className="flex pt-2">
            <h3 className="hidden lg:flex text-sm font-semibold tracking-wide">
              Owner Name:
            </h3>
            <h3 className="text-sm tracking-wide lg:pl-2">Chamika</h3>
          </div>
          <div className="flex">
            <div className="hidden lg:flex text-sm font-semibold tracking-wide">
              Contact number:
            </div>
            <div className="text-sm tracking-wide lg:pl-2">077-1234567</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VehicleType;
