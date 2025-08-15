import React from "react";
import Jumbotron from "../molecules/Jumbotron";
import PageDetails from "../organisams/PageDetails";
import DetailCardGrid from "@/app/components/DetailCardGrid";
import CTAButton from "../molecules/CTAButton";

interface CategoryPageProps {
  heroTitle: string;
  heroDescription: string;
  packages: any[];
  description: string;
  imageUrl: string;
  title: string;
}

const CategoryPage = ({
  heroTitle,
  heroDescription,
  packages,
  description,
  imageUrl,
  title,
}: CategoryPageProps) => {
  return (
    <section className="py-16 px-4 md:px-16">
      <Jumbotron
        title={heroTitle}
        description={heroDescription}
        imageUrl={imageUrl}
      />
      <PageDetails title={title} description={description} />
      <div className="min-h-screen">
        <DetailCardGrid packages={packages} />
        <CTAButton />
      </div>
    </section>
  );
};

export default CategoryPage;
