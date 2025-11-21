"use client";

import Jumbotron from "../molecules/Jumbotron";
import { renderStars } from "@/utils/common";
import PageRouting from "../molecules/PageRouting";
import HotelDetails from "../organisams/HotelDetails";

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
      <div className="pt-8">
        <PageRouting />
        {hotelData.rating && (
          <div className="flex items-center gap-1 mt-2">
            <div className="flex items-center gap-0.5">
              {renderStars(hotelData.rating, 5)}
            </div>
          </div>
        )}
        <div className="text-sm font-semibold mt-2">
          {hotelData?.Place?.name}
        </div>
      </div>
      <HotelDetails hotelData={hotelData} />
    </section>
  );
};

export default HotelPage;
