import React from "react";
import Jumbotron from "../molecules/Jumbotron";
import PageDetails from "../organisams/PageDetails";
import CTAButton from "@/components/molecules/CTAButton";
import CardGrid from "../organisams/CardGrid";
import { CARD_DESCRIPTION, CARD_TITLE } from "@/styles/font";

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
    <section className="pt-24 pb-16 px-4 md:px-16">
      <Jumbotron
        title={heroTitle}
        description={heroDescription}
        imageUrl={imageUrl}
      />
      <PageDetails title={title} description={description} />
      <div>
        <CardGrid
          data={categories.map((category: any) => ({
            cardTitle: category.name,
            cardDescription: "Tours",
            count: category.packageCount,
            ...category,
          }))}
        >
          {(cardTitle: string, cardDescription: string, count: number) => (
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <div className="flex flex-col gap-1">
                <h3 className={CARD_TITLE}>{cardTitle}</h3>
                <p className={CARD_DESCRIPTION}>{cardDescription}</p>
              </div>
              <span className="self-start px-3 py-2 rounded-xl bg-gradient-to-r from-red to-orange text-white text-sm font-medium mt-2">
                {Number(count).toString().padStart(2, "0")} TOURS
              </span>
            </div>
          )}
        </CardGrid>
        <CTAButton />
      </div>
    </section>
  );
};

export default CategoriesPage;
