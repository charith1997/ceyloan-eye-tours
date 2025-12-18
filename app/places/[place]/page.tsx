"use client";

import PlacePage from "@/components/pages/PlacePage";
import { setTotalPages } from "@/features/paginatorSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useLazyGetPlaceByUrlPrefixPaginatedQuery } from "@/services/placesApi";
import { getLastParam } from "@/utils/common";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Place() {
  const [placeData, setPlaceData] = useState<any>({});
  const [getPlaceByUrlPrefixPaginated] =
    useLazyGetPlaceByUrlPrefixPaginatedQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);

  const lastSegment = getLastParam();
  const dispatch = useDispatch();

  const getPlaceData = async () => {
    const { data } = await getPlaceByUrlPrefixPaginated({
      slug: lastSegment,
      page: currentPage,
      size: 9,
    });
    if (data.success) {
      setPlaceData(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getPlaceData();
    }
  }, [currentPage]);

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
