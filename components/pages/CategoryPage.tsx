import React from "react";
import Jumbotron from "../molecules/Jumbotron";
import PageDetails from "../organisams/PageDetails";
import DetailCardGrid from "@/components/organisams/DetailCardGrid";
import CTAButton from "../molecules/CTAButton";
import { formatDuration } from "@/utils/package";

interface CategoryPageProps {
  heroTitle: string;
  heroDescription: string;
  packages: any[];
  description: string;
  imageUrl: string;
  title: string;
}

const CategoryPage = ({
  heroTitle,
  heroDescription,
  packages,
  description,
  imageUrl,
  title,
}: CategoryPageProps) => {
  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <Jumbotron
        title={heroTitle}
        description={heroDescription}
        imageUrl={imageUrl}
      />
      <PageDetails title={title} description={description} />
      <div>
        <DetailCardGrid data={packages}>
          {(item: any) => (
            <div className="absolute bottom-0 w-full bg-red text-white p-4 flex flex-row justify-between gap-1 items-center">
              <div>
                <h3 className="text-md md:text-lg font-extrabold uppercase tracking-widest">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base font-medium">
                  {formatDuration(item.duration)}
                </p>
              </div>
              <div className="text-end">
                <h3 className="text-sm md:text-sm font-normal">
                  Starting from
                </h3>
                <p className="text-sm md:text-base font-normal">
                  ${item.price}
                </p>
              </div>
            </div>
          )}
        </DetailCardGrid>
        <CTAButton />
      </div>
    </section>
  );
};

export default CategoryPage;
