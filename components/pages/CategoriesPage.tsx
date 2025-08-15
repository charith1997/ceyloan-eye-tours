import React from "react";
import Jumbotron from "../molecules/Jumbotron";
import PageDetails from "../organisams/PageDetails";
import CategoryGrid from "../organisams/CategoryGrid";
import CTAButton from "@/components/molecules/CTAButton";

interface CategoriesPageProps {
  heroTitle: string;
  heroDescription: string;
  categories: any[];
  description: string;
  imageUrl: string;
  title: string;
}

const CategoriesPage = ({
  heroTitle,
  title,
  categories,
  description,
  heroDescription,
  imageUrl,
}: CategoriesPageProps) => {
  return (
    <section className="py-16 px-4 md:px-16">
      <Jumbotron
        title={heroTitle}
        description={heroDescription}
        imageUrl={imageUrl}
      />
      <PageDetails title={title} description={description} />
      <div className="min-h-screen">
        <CategoryGrid categories={categories} />
        <CTAButton />
      </div>
    </section>
  );
};

export default CategoriesPage;
