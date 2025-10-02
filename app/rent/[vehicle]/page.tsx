"use client";

import React from "react";
import VehicleType from "./VehicleType";
import Jumbotron from "@/components/molecules/Jumbotron";
import PageDetails from "@/components/organisams/PageDetails";
import { useGetAllVehiclesQuery } from "@/services/vehicleApi";
import { usePathname } from "next/navigation";

function RentVehicle() {
  const { data } = useGetAllVehiclesQuery();
  const vehicles = Array.isArray(data?.data) ? data.data : [];
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <Jumbotron
        title={
          <span className="capitalize">{segments[segments.length - 1]}</span>
        }
        description="Find the perfect vehicle for your journey."
        imageUrl="/rent/Rent Vehicle.jpg"
      />
      <PageDetails
        title={segments[segments.length - 1]}
        description="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {vehicles.length > 0
          ? vehicles.map((vehicle: any) => (
              <VehicleType key={vehicle.id} {...vehicle} />
            ))
          : null}
      </div>
    </section>
  );
}

export default RentVehicle;
