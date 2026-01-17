"use client";

import React, { useEffect, useState } from "react";
import { useLazyGetAllCategoriesPaginatedQuery } from "@/services/categoryApi";
import CategoriesPage from "@/components/pages/CategoriesPage";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";
import { ActivitiesPageProps } from "@/types/all.types";
import { useLazyGetAllActivitiesPaginatedQuery } from "@/services/activityApi";
import PageContainer from "@/components/containers/PageContainer";
import Jumbotron from "@/components/molecules/Jumbotron";
import PageDetails from "@/components/organisams/PageDetails";
import CardGrid from "@/components/organisams/CardGrid";
import { CARD_DESCRIPTION, CARD_TITLE } from "@/styles/font";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<ActivitiesPageProps[]>([]);
  const [getAllActivitiesPaginated] = useLazyGetAllActivitiesPaginatedQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);

  const dispatch = useDispatch();

  const getAllActivities = async () => {
    const { data } = await getAllActivitiesPaginated({
      page: currentPage,
      size: 9,
    });
    if (data.success) {
      setActivities(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getAllActivities();
    }
  }, [currentPage]);

  return (
    <PageContainer>
      <Jumbotron
        title="Discover Your Perfect Adventure"
        description="Browse curated activities for thrill-seekers, nature lovers, and culture enthusiasts. Find your perfect Sri Lankan experience today."
        imageUrl="/hero images/activities.jpeg"
      />
      <PageDetails
        title="Explore Sri Lanka Activities"
        description="Discover the best activities and experiences in Sri Lanka with Jwing Tours. From thrilling wildlife safaris and whale watching to cultural temple tours, water sports, mountain trekking, and traditional cooking classes—explore handpicked adventures for every type of traveler. Book unforgettable experiences across paradise."
      />
      <div>
        <CardGrid
          data={activities.map((activity) => ({
            cardTitle: activity.name,
            cardDescription: activity.description,
            count: 0,
            ...activity,
          }))}
          isLinked={false}
        >
          {(cardTitle: string, cardDescription: string) => (
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <div className="flex flex-col gap-1">
                <h3 className="text-white text-lg font-bold capitalize">
                  {cardTitle}
                </h3>
                <div className="relative group">
                  <p className="text-white text-sm line-clamp-3">
                    {cardDescription}
                  </p>

                  {cardDescription && cardDescription.length > 100 && (
                    <div className="absolute bottom-full left-0 mb-2 w-auto bg-gray-900 text-white text-sm p-2 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300  z-100">
                      <div
                        className="max-h-36 overflow-y-auto"
                        style={{ scrollBehavior: "smooth" }}
                      >
                        {cardDescription}
                      </div>
                      <div className="absolute top-full left-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardGrid>
      </div>
    </PageContainer>
  );
}
