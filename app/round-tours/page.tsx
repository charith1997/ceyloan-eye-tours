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
      description="Discover the ultimate convenience of exploring the entire island with our meticulously planned round tours in Sri Lanka. We create seamless itineraries that connect the iconic highlights and hidden treasures from coast to coast. Journey from the ancient cultural sites in the Cultural Triangle to the lush, misty hills of the tea country, and onward to the serene southern beaches—all in one unforgettable trip. Our round tours are crafted for travelers who wish to experience Sri Lanka’s diverse landscapes, rich heritage, and vibrant local life without the hassle of planning each leg. Each tour includeing knowledgeable local guides to ensure a smooth, immersive, and enriching adventure. Whether you have a week or a fortnight, we offer complete journeys that tell the full story of this beautiful island."
      categories={categories}
      title="Sri Lanka Tours"
    />
  );
}
