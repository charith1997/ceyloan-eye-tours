import React from "react";
import { notFound } from "next/navigation";
import VehicleType from "./VehicleType";
import Jumbotron from "@/components/molecules/Jumbotron";
import PageDetails from "@/components/organisams/PageDetails";

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
      <Jumbotron
        title="Vans"
        description="Find the perfect vehicle for your journey."
        imageUrl="/rent/Rent Vehicle.jpg"
      />
      <PageDetails
        title="Vans"
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
        <VehicleType />
        <VehicleType />
        <VehicleType />
        <VehicleType />
      </div>
    </section>
  );
}
