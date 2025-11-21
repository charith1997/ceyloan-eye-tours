"use client";

import HotelPage from "@/components/pages/HotelPage";
import { useGetHotelByUrlPrefixQuery } from "@/services/hotelApi";
import { getLastParam } from "@/utils/common";
import React from "react";

function Hotel() {
  const lastSegment = getLastParam();
  const { data } = useGetHotelByUrlPrefixQuery(lastSegment);
  const hotelData = data?.data ?? {};
  return (
    <HotelPage
      heroTitle={hotelData.name}
      heroDescription="Hero Description"
      imageUrl={hotelData.image_url}
      hotelData={hotelData}
    />
  );
}

export default Hotel;
