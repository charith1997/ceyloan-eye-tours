"use client";

import React, { useEffect, useState } from "react";
import Jumbotron from "../molecules/Jumbotron";
import PageDetails from "../organisams/PageDetails";
import CTAButton from "@/components/molecules/CTAButton";
import { formatDuration } from "@/utils/package";
import DetailCardGrid from "../organisams/DetailCardGrid";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useLazyGetAllPackagesPaginatedQuery } from "@/services/packageApi";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";

const PackagesPage = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [getAllPackagesPaginated] = useLazyGetAllPackagesPaginatedQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);

  const dispatch = useDispatch();

  const getAllPackages = async () => {
    const { data } = await getAllPackagesPaginated({
      page: currentPage,
      size: 10,
    });
    if (data.success) {
      setPackages(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getAllPackages();
    }
  }, [currentPage]);

  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <Jumbotron
        title="Complete Travel Packages"
        description="Curated tour packages combining accommodation, transport, and guided experiences for unforgettable journeys."
        imageUrl="/hero images/packages.jpeg"
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
