"use client";

import PlacePage from "@/components/pages/PlacePage";
import { useGetPlaceByUrlPrefixQuery } from "@/services/placesApi";
import { getLastParam } from "@/utils/common";
import React from "react";

function Place() {
  const lastSegment = getLastParam();
  const { data } = useGetPlaceByUrlPrefixQuery(lastSegment);
  const placeData = data?.data ?? {};

  return (
    <PlacePage
      heroTitle={placeData.name}
      heroDescription="Hero Description"
      imageUrl={placeData.image_url}
      hotels={placeData.Hotels || []}
      title={placeData.name}
      description={placeData.description}
      location={placeData.location}
    />
  );
}

export default Place;
