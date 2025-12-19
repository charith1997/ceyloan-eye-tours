"use client";

import { useLazyGetAllCategoriesPaginatedQuery } from "@/services/categoryApi";
import React, { useEffect, useState } from "react";
import CategoriesPage from "@/components/pages/CategoriesPage";
import { CategoriesPageProps } from "@/types/all.types";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";

const DayTours = () => {
  const [categories, setCategories] = useState<CategoriesPageProps[]>([]);
  const [getAllCategoriesPaginated] = useLazyGetAllCategoriesPaginatedQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);

  const dispatch = useDispatch();

  const getAllCategories = async () => {
    const { data } = await getAllCategoriesPaginated({
      page: currentPage,
      size: 10,
      tourType: "1",
    });
    if (data.success) {
      setCategories(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getAllCategories();
    }
  }, [currentPage]);

  return (
    <CategoriesPage
      heroTitle="Perfect Single Day Tours"
      heroDescription="Explore Sri Lanka's highlights with expertly planned day tours for every traveler's interest."
      imageUrl="/hero images/day_tours.jpeg"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      categories={categories}
      title="Sri Lanka Tours"
    />
  );
};

export default DayTours;
