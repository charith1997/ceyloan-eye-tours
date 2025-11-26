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
import { useGetAllPlacesWithHotelsQuery } from "@/services/placesApi";

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
  const { data } = useGetAllPlacesWithHotelsQuery();
  const places = Array.isArray(data?.data) ? data.data : [];

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
        <DetailCardGrid data={hotels}>
          {(item: any) => (
            <div className="absolute bottom-0 w-full bg-red text-white p-4 flex flex-row justify-between gap-1 items-center">
              <div>
                <h3 className="text-md md:text-lg font-extrabold uppercase tracking-widest">
                  {item.name}
                </h3>
                <p className="text-sm md:text-base font-medium">
                  {
                    places.find((place: any) => place.id === item.place_id)
                      ?.name
                  }
                </p>
              </div>
              <div className="flex items-center gap-1">
                {renderStars(item.rating, 5)}
              </div>
            </div>
          )}
        </DetailCardGrid>
        <CTAButton />
      </div>
    </section>
  );
};

export default PlacePage;
