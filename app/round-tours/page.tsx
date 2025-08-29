"use client";

import React from "react";
import { useGetAllCategoriesQuery } from "@/services/categoryApi";
import CategoriesPage from "@/components/pages/CategoriesPage";

export default function RoundTours() {
  const { data, error } = useGetAllCategoriesQuery({
    tourType: "0",
  });
  if (error) return <div>Error loading categories</div>;

  const categories = Array.isArray(data?.data) ? data.data : [];

  return (
    <CategoriesPage
      heroTitle="Round Tours"
      heroDescription="Explore our exciting round tours."
      imageUrl="/round tours/round-tours_main.png"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      categories={categories}
      title="Sri Lanka Tours"
    />
  );
}
