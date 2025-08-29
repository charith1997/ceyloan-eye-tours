"use client";

import PlacesPage from "@/components/pages/PlacesPage";
import { useGetAllPlacesQuery } from "@/services/placesApi";
import React from "react";

function Destinations() {
  const { data, error } = useGetAllPlacesQuery();

  if (error) return <div>Error loading places</div>;

  const places = Array.isArray(data?.data) ? data.data : [];
  return (
    <PlacesPage
      heroTitle="Places Page"
      heroDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      imageUrl="/round tours/round-tours_main.png"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      places={places}
      title="Tour Places"
    />
  );
}

export default Destinations;
