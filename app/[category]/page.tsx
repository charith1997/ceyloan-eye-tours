"use client";

import { useLazyGetCategoryByUrlPrefixPaginatedQuery } from "@/services/categoryApi";
import { getLastParam } from "@/utils/common";
import CategoryPage from "@/components/pages/CategoryPage";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";

export default function Category() {
  const [categoryData, setCategoryData] = useState<any>({});
  const [getCategoryByUrlPrefixPaginated] =
    useLazyGetCategoryByUrlPrefixPaginatedQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);

  const lastSegment = getLastParam();
  const dispatch = useDispatch();

  const getCategoryData = async () => {
    const { data } = await getCategoryByUrlPrefixPaginated({
      slug: lastSegment,
      page: currentPage,
      size: 9,
    });
    if (data.success) {
      setCategoryData(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getCategoryData();
    }
  }, [currentPage]);

  return (
    <CategoryPage
      heroTitle={categoryData.name}
      heroDescription={categoryData.hero_description}
      packages={categoryData.Packages}
      description={categoryData.description}
      imageUrl={categoryData.image_url}
      title={categoryData.name}
    />
  );
}
