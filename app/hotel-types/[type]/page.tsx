"use client";

import HotelTypePage from "@/components/pages/HotelTypePage";
import { useGetHotelTypeByUrlPrefixQuery } from "@/services/hotelTypeApi";
import { getLastParam } from "@/utils/common";

export default function SingleHotelType() {
  const lastSegment = getLastParam();

  const { data } = useGetHotelTypeByUrlPrefixQuery(lastSegment);

  const hotelTypeData = data?.data ?? {};
  console.log("hotelTypeData", hotelTypeData);

  return (
    <HotelTypePage
      heroTitle={hotelTypeData.name}
      heroDescription={hotelTypeData.description}
      hotels={hotelTypeData.Hotels || []}
      description={hotelTypeData.description}
      imageUrl={hotelTypeData.image_url}
      title={hotelTypeData.name}
    />
  );
}
