"use client";

import React from "react";
import Jumbotron from "../molecules/Jumbotron";
import PageDetails from "../organisams/PageDetails";
import CTAButton from "@/components/molecules/CTAButton";
import CardGrid from "../organisams/CardGrid";
import { CARD_TITLE } from "@/styles/font";
import { useGetAllPackagesQuery } from "@/services/packageApi";
import { formatDuration } from "@/utils/package";

const PackagesPage = () => {
  const { data } = useGetAllPackagesQuery();
  const packages = Array.isArray(data?.data) ? data.data : [];
  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <Jumbotron
        title="Packages Page"
        description="Explore our exclusive packages"
        imageUrl="/tour packages/package_1.jpg"
      />
      <PageDetails
        title="Packages"
        description="Explore our exclusive packages"
      />
      <div>
        <CardGrid
          data={packages.map((pkg: any) => ({
            cardTitle: pkg.title,
            cardDescription: formatDuration(pkg.duration),
            count: pkg.price,
            image_url:
              pkg.Images.length > 0
                ? pkg.Images[0].image_url
                : "/default-image.jpg",
            name: pkg.title,
            ...pkg,
          }))}
        >
          {(cardTitle: string, cardDescription: string, count: number) => (
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <div className="flex flex-col gap-2">
                <h3 className={CARD_TITLE}>{cardTitle}</h3>
                <p className="text-white text-lg">{cardDescription}</p>
              </div>
              {/* <span className="self-start px-3 py-2 rounded-xl bg-gradient-to-r from-red to-orange text-white font-medium mt-2">
                $ {Number(count).toString().padStart(2, "0")}
              </span> */}
            </div>
          )}
        </CardGrid>
        <CTAButton />
      </div>
    </section>
  );
};

export default PackagesPage;
