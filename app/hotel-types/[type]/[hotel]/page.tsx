"use client";

import { getLastParam } from "@/utils/common";
import { useGetHotelByUrlPrefixQuery } from "@/services/hotelApi";
import HotelPage from "@/components/pages/HotelPage";

export default function TourCategoryPage() {
  const lastSegment = getLastParam();
  const { data } = useGetHotelByUrlPrefixQuery(lastSegment);
  const hotelData = data?.data ?? {};

  return (
    <>
      <HotelPage
        heroTitle={hotelData.name}
        heroDescription="Hero Description"
        imageUrl={hotelData.image_url}
        hotelData={hotelData}
      />
    </>
  );
}
