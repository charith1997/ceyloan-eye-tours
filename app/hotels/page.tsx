"use client";

import HotelsPage from "@/components/pages/HotelsPage";
import { useGetAllHotelsQuery } from "@/services/hotelApi";
import React from "react";

function Hotels() {
  const { data, error, isLoading } = useGetAllHotelsQuery();

  if (isLoading) return <div>Loading hotels...</div>;
  if (error) return <div>Error loading hotels</div>;

  const hotels = Array.isArray(data?.data) ? data.data : [];
  return (
    <HotelsPage
      heroTitle="Accommodation"
      heroDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      imageUrl="/round tours/round-tours_main.png"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      hotels={hotels}
      title="Tour Hotels"
    />
  );
}

export default Hotels;
