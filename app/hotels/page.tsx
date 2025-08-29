"use client";

import HotelTypesPage from "@/components/pages/HotelTypesPage";
import { useGetAllHotelTypesQuery } from "@/services/hotelTypeApi";
import React from "react";

function HotelTypes() {
  const { data, error } = useGetAllHotelTypesQuery();

  if (error) return <div>Error loading hotel types</div>;

  const hotelTypes = Array.isArray(data?.data) ? data.data : [];
  return (
    <HotelTypesPage
      heroTitle="Accommodation"
      heroDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      imageUrl="/round tours/round-tours_main.png"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      hotelTypes={hotelTypes}
      title="Tour Hotels and Accommodations"
    />
  );
}

export default HotelTypes;
