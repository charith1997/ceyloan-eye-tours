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
      size: 9,
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
      description="Experience the best of Sri Lanka in a single day with our specially designed day tours. These curated excursions offer a perfect introduction to the island's highlights, ideal for travelers with limited time or those seeking to add focused adventures to their itinerary. From the ancient rock fortress of Sigiriya and the sacred Temple of the Tooth in Kandy to wildlife safaris in Minneriya and scenic train rides through tea plantations, our day tours are packed with iconic sights and authentic local encounters. Each tour includes an expert local guide, and thoughtfully planned activities to ensure a seamless, enriching, and unforgettable experience. Whether you're exploring cultural treasures, natural wonders, or coastal charm, our day tours provide a memorable snapshot of Sri Lanka's diverse beauty."
      categories={categories}
      title="Sri Lanka Tours"
    />
  );
};

export default DayTours;
