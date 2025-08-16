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
  hotels: any[];
}

function HotelsPage({
  heroTitle,
  heroDescription,
  imageUrl,
  title,
  description,
  hotels,
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
          data={hotels.map((hotel: any) => ({
            cardTitle: hotel.name,
            cardDescription: hotel.Place.name,
            url_prefix: "hotel-id",
            ...hotel,
          }))}
        >
          {(cardTitle: string, cardDescription: string) => (
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <div>
                <h3 className={CARD_TITLE}>{cardTitle}</h3>
                <p className={CARD_DESCRIPTION}>{cardDescription}</p>
              </div>
            </div>
          )}
        </CardGrid>
        <CTAButton />
      </div>
    </section>
  );
}

export default HotelsPage;
