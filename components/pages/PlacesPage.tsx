import React from "react";
import Jumbotron from "../molecules/Jumbotron";
import PageDetails from "../organisams/PageDetails";
import CTAButton from "../molecules/CTAButton";
import CardGrid from "../organisams/CardGrid";
import { useGetAllPlacesWithHotelsQuery } from "@/services/placesApi";

function PlacesPage() {
  const { data } = useGetAllPlacesWithHotelsQuery();
  const places = Array.isArray(data?.data) ? data.data : [];
  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <Jumbotron
        title="Places Page"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        imageUrl="/round tours/round-tours_main.png"
      />
      <PageDetails
        title="Tour Places"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      />
      <div>
        <CardGrid
          data={places.map((place: any) => ({
            cardTitle: place.name,
            cardDescription: place.location,
            count: place.hotelCount,
            ...place,
          }))}
        >
          {(cardTitle: string, cardDescription: string, count: number) => (
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <div>
                <h3 className="text-white text-3xl md:text-4xl uppercase font-bold tracking-wider">
                  {cardTitle}
                </h3>
                <p className="text-white text-xl">{cardDescription}</p>
              </div>
              <span className="self-start px-3 py-2 rounded-lg bg-gradient-to-r from-red to-orange text-white text-sm font-medium mt-2 uppercase">
                {Number(count).toString().padStart(2, "0")}{" "}
                {count === 1 ? "Hotel" : "Hotels"}
              </span>
            </div>
          )}
        </CardGrid>
        <CTAButton />
      </div>
    </section>
  );
}

export default PlacesPage;
