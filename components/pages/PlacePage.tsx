import React from "react";
import Jumbotron from "../molecules/Jumbotron";
import PageDetails from "../organisams/PageDetails";
import DetailCardGrid from "@/components/organisams/DetailCardGrid";
import CTAButton from "../molecules/CTAButton";
import { formatDuration } from "@/utils/package";
import CardGrid from "../organisams/CardGrid";
import { renderStars } from "@/utils/common";
import PageRouting from "../molecules/PageRouting";
import PageContent from "../molecules/PageContent";
import { PAGE_DESCRIPTION, PAGE_TITLE } from "@/styles/font";

interface PlacePageProps {
  heroTitle: string;
  heroDescription: string;
  hotels: any[];
  description: string;
  imageUrl: string;
  title: string;
  location: string;
}

const PlacePage = ({
  heroTitle,
  heroDescription,
  hotels,
  description,
  imageUrl,
  title,
  location,
}: PlacePageProps) => {
  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <Jumbotron
        title={heroTitle}
        description={heroDescription}
        imageUrl={imageUrl}
      />
      <div className="py-12">
        <PageRouting />
        <h1 className="text-3xl md:text-4xl font-semibold capitalize pt-2 pb-1">
          {title}
        </h1>
        <p className="text-gray-700 tracking-wide">{location}</p>
        <p className="text-gray-500 leading-relaxed text-justify pt-6">
          {description}
        </p>
      </div>
      <div>
        <CardGrid
          data={hotels.map((hotel: any) => ({
            cardTitle: hotel.name,
            cardDescription: "",
            count: hotel.rating,
            image_url:
              hotel.images.length > 0 ? hotel.images[0] : "/default-image.jpg",
            ...hotel,
          }))}
        >
          {(cardTitle: string, cardDescription: string, count: number) => (
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <div className="flex justify-between items-center">
                <p className="text-white text-3xl md:text-4xl font-bold uppercase">
                  {cardTitle}
                </p>
                <h3 className="text-white text-xl">{cardDescription}</h3>
                <span className="flex self-start px-3 py-2 rounded-xl text-white text-sm font-medium mt-2 uppercase">
                  {renderStars(count, 5)}
                </span>
              </div>
            </div>
          )}
        </CardGrid>
        <CTAButton />
      </div>
    </section>
  );
};

export default PlacePage;
