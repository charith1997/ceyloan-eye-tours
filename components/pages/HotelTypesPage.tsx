import React from "react";
import Jumbotron from "../molecules/Jumbotron";
import PageDetails from "../organisams/PageDetails";
import CTAButton from "../molecules/CTAButton";
import CardGrid from "../organisams/CardGrid";
import { CARD_DESCRIPTION, CARD_TITLE } from "@/styles/font";

interface HotelsPageProps {
  heroTitle: string;
  heroDescription: string;
  imageUrl: string;
  title: string;
  description: string;
  hotelTypes: any[];
}

function HotelTypesPage({
  heroTitle,
  heroDescription,
  imageUrl,
  title,
  description,
  hotelTypes,
}: HotelsPageProps) {
  return (
    <section className="py-16 px-4 md:px-16">
      <Jumbotron
        title={heroTitle}
        description={heroDescription}
        imageUrl={imageUrl}
      />
      <PageDetails title={title} description={description} />
      <div className="min-h-screen">
        <CardGrid
          data={hotelTypes.map((hotelType: any) => ({
            cardTitle: "In the",
            cardDescription: hotelType.name,
            ...hotelType,
          }))}
        >
          {(cardTitle: string, cardDescription: string) => (
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <div>
                <h3 className={CARD_DESCRIPTION}>{cardTitle}</h3>
                <p className={CARD_TITLE}>{cardDescription}</p>
              </div>
            </div>
          )}
        </CardGrid>
        <CTAButton />
      </div>
    </section>
  );
}

export default HotelTypesPage;
