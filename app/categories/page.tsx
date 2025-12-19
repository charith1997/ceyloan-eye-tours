"use client";

import React, { useEffect, useState } from "react";
import { useLazyGetAllCategoriesPaginatedQuery } from "@/services/categoryApi";
import CategoriesPage from "@/components/pages/CategoriesPage";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";
import { CategoriesPageProps } from "@/types/all.types";

export default function Categories() {
  const [categories, setCategories] = useState<CategoriesPageProps[]>([]);
  const [getAllCategoriesPaginated] = useLazyGetAllCategoriesPaginatedQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);

  const dispatch = useDispatch();

  const getAllCategories = async () => {
    const { data } = await getAllCategoriesPaginated({
      page: currentPage,
      size: 10,
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
      heroTitle="Explore Sri Lanka Tours"
      heroDescription="Discover diverse tour experiences across Sri Lanka's breathtaking landscapes and rich cultural heritage."
      imageUrl="/hero images/categories.jpeg"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
      categories={categories}
      title="Tour Categories"
    />
  );
}
