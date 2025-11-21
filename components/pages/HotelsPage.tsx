import React from "react";
import Jumbotron from "../molecules/Jumbotron";
import PageDetails from "../organisams/PageDetails";
import CTAButton from "../molecules/CTAButton";
import CardGrid from "../organisams/CardGrid";
import { useGetAllHotelsQuery } from "@/services/hotelApi";
import { renderStars } from "@/utils/common";

function HotelsPage() {
  const { data } = useGetAllHotelsQuery();

  const hotels = Array.isArray(data?.data) ? data.data : [];
  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <Jumbotron
        title="Hotels"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        imageUrl="/round tours/round-tours_main.png"
      />
      <PageDetails
        title="Tour Hotels and Accommodations"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      />
      <div>
        <CardGrid
          data={hotels.map((hotel: any) => ({
            cardTitle: hotel.name,
            cardDescription: hotel.Place.name,
            count: hotel.rating,
            image_url:
              hotel.images.length > 0 ? hotel.images[0] : "/default-image.jpg",
            ...hotel,
          }))}
        >
          {(cardTitle: string, cardDescription: string, count: number) => (
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <p className="text-white text-3xl md:text-4xl font-bold uppercase">
                {cardTitle}
              </p>
              <div className="flex justify-between items-center">
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
}

export default HotelsPage;
