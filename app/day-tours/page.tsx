"use client";

import CategoryGrid from "@/components/organisams/CategoryGrid";
import { useGetAllCategoriesQuery } from "@/services/categoryApi";
import React from "react";
import CTAButton from "../components/CTAButton";
import Jumbotron from "@/components/molecules/Jumbotron";
import PageDetails from "@/components/organisams/PageDetails";

const DayTours = () => {
  const { data, error, isLoading } = useGetAllCategoriesQuery({
    tourType: "1",
  });
  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories</div>;

  const categories = Array.isArray(data?.data) ? data.data : [];

  return (
    <section className="py-16 px-4 md:px-16">
      <Jumbotron
        title="Day Tours"
        description="Explore the beauty of Sri Lanka with our curated day tours."
        imageUrl="/round tours/round-tours_main.png"
      />
      <PageDetails
        title="Sri Lanka Tours"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum."
      />
      <div className="min-h-screen">
        <CategoryGrid categories={categories} />
        <CTAButton />
      </div>
    </section>
  );
};

export default DayTours;
