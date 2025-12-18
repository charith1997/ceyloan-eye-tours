"use client";

import HotelTypePage from "@/components/pages/HotelTypePage";
import { setTotalPages } from "@/features/paginatorSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useLazyGetHotelTypeByUrlPrefixPaginatedQuery } from "@/services/hotelTypeApi";
import { getLastParam } from "@/utils/common";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function SingleHotelType() {
  const [hotelTypeData, setHotelTypeData] = useState<any>({});
  const [getHotelTypeByUrlPrefixPaginated] =
    useLazyGetHotelTypeByUrlPrefixPaginatedQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);

  const lastSegment = getLastParam();
  const dispatch = useDispatch();

  const getHotelTypeData = async () => {
    const { data } = await getHotelTypeByUrlPrefixPaginated({
      slug: lastSegment,
      page: currentPage,
      size: 9,
    });
    if (data.success) {
      setHotelTypeData(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getHotelTypeData();
    }
  }, [currentPage]);

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
