"use client";

import React, { useEffect, useState } from "react";
import { useLazyGetAllCategoriesPaginatedQuery } from "@/services/categoryApi";
import CategoriesPage from "@/components/pages/CategoriesPage";
import { CategoriesPageProps } from "@/types/all.types";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";

export default function RoundTours() {
  const [categories, setCategories] = useState<CategoriesPageProps[]>([]);
  const [getAllCategoriesPaginated] = useLazyGetAllCategoriesPaginatedQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);

  const dispatch = useDispatch();

  const getAllCategories = async () => {
    const { data } = await getAllCategoriesPaginated({
      page: currentPage,
      size: 9,
      tourType: "0",
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
      heroTitle="Multi-Destination Round Tours"
      heroDescription="Experience comprehensive island tours covering multiple destinations in one seamless adventure journey."
      imageUrl="/hero images/round_tours.jpeg"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      categories={categories}
      title="Sri Lanka Tours"
    />
  );
}
