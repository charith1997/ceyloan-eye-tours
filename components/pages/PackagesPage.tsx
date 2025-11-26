"use client";

import React from "react";
import Jumbotron from "../molecules/Jumbotron";
import PageDetails from "../organisams/PageDetails";
import CTAButton from "@/components/molecules/CTAButton";
import { useGetAllPackagesQuery } from "@/services/packageApi";
import { formatDuration } from "@/utils/package";
import DetailCardGrid from "../organisams/DetailCardGrid";

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
        <DetailCardGrid
          data={packages.map((pkg: any) => ({
            ...pkg,
            images:
              pkg && pkg.Images && pkg.Images.map((img: any) => img.image_url),
          }))}
        >
          {(item: any) => (
            <div className="absolute bottom-0 w-full h-24 bg-red text-white p-4 flex flex-row justify-between gap-1 items-center">
              <div>
                <h3 className="md:text-lg font-semibold md:font-bold tracking-wide md:tracking-wider">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base">
                  {formatDuration(item.duration)}
                </p>
              </div>
              <div className="text-end">
                <h3 className="text-sm md:text-sm text-nowrap">
                  Starting from
                </h3>
                <p className="text-sm md:text-base">$ {item.price}</p>
              </div>
            </div>
          )}
        </DetailCardGrid>
        <CTAButton />
      </div>
    </section>
  );
};

export default PackagesPage;
