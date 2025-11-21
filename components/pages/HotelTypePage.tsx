"use client";

import Jumbotron from "../molecules/Jumbotron";
import PageDetails from "../organisams/PageDetails";
import DetailCardGrid from "@/components/organisams/DetailCardGrid";
import CTAButton from "../molecules/CTAButton";
import { renderStars } from "@/utils/common";

interface HotelTypePageProps {
  heroTitle: string;
  heroDescription: string;
  hotels: any[];
  description: string;
  imageUrl: string;
  title: string;
}

const HotelTypePage = ({
  heroTitle,
  heroDescription,
  hotels,
  description,
  imageUrl,
  title,
}: HotelTypePageProps) => {
  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <Jumbotron
        title={heroTitle}
        description={heroDescription}
        imageUrl={imageUrl}
      />
      <PageDetails title={title} description={description} />
      <div>
        <DetailCardGrid data={hotels}>
          {(item: any) => (
            <div className="absolute bottom-0 w-full bg-red text-white p-4 flex flex-row justify-between gap-1 items-center">
              <div>
                <h3 className="text-md md:text-lg font-extrabold uppercase tracking-widest">
                  {item.name}
                </h3>
                <p className="text-sm md:text-base font-medium">
                  {item.Place.name}
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

export default HotelTypePage;
