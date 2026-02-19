"use client";

import Jumbotron from "../molecules/Jumbotron";
import { renderStars } from "@/utils/common";
import PageRouting from "../molecules/PageRouting";
import HotelDetails from "../organisams/HotelDetails";
import { MapPin } from "lucide-react";

interface HotelPageProps {
  heroTitle: string;
  heroDescription: string;
  imageUrl: string;
  hotelData: any;
}

const HotelPage = ({
  heroTitle,
  heroDescription,
  imageUrl,
  hotelData,
}: HotelPageProps) => {
  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <Jumbotron
        title={heroTitle}
        description={heroDescription}
        imageUrl={imageUrl}
      />

      <div className="pt-6 sm:pt-8">
        <PageRouting />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-2 pb-6 border-b border-gray-200">
          <div className="space-y-2">
            {hotelData.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {renderStars(hotelData.rating, 5)}
                </div>
                <span className="text-sm font-semibold text-gray-600">
                  {hotelData.rating} / 5
                </span>
              </div>
            )}

            {hotelData?.Place?.name && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red flex-shrink-0" />
                <span className="text-sm sm:text-base font-semibold text-gray-700">
                  {hotelData.Place.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <HotelDetails hotelData={hotelData} />
    </section>
  );
};

export default HotelPage;
