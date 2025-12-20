import React, { useEffect, useState } from "react";
import Jumbotron from "../molecules/Jumbotron";
import PageDetails from "../organisams/PageDetails";
import CardGrid from "../organisams/CardGrid";
import { useLazyGetAllPlacesWithHotelPaginatedQuery } from "@/services/placesApi";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";
import PageContainer from "../containers/PageContainer";

function PlacesPage() {
  const [places, setPlaces] = useState<any[]>([]);
  const [getAllPlacesWithHotelPaginated] =
    useLazyGetAllPlacesWithHotelPaginatedQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);

  const dispatch = useDispatch();

  const getAllPlaces = async () => {
    const { data } = await getAllPlacesWithHotelPaginated({
      page: currentPage,
      size: 9,
    });
    if (data.success) {
      setPlaces(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getAllPlaces();
    }
  }, [currentPage]);
  return (
    <PageContainer>
      <Jumbotron
        title="Amazing Places To Visit"
        description="Uncover Sri Lanka's hidden gems, from ancient temples to pristine beaches and mountains."
        imageUrl="/hero images/places.jpeg"
      />
      <PageDetails
        title="Tour Places"
        description="Explore the most captivating destinations in Sri Lanka with our guide to essential tour places. Each location has been selected for its unique charm, cultural significance, and natural beauty, offering a diverse range of experiences for every traveler. From sun-soaked coastal towns and lush hill country retreats to historic cities rich in heritage, these places form the heart of unforgettable itineraries. Our detailed overviews help you discover what makes each spot special—whether it’s adventure, relaxation, history, or local cuisine—so you can plan a journey that perfectly matches your interests. Dive into Sri Lanka’s vibrant landscapes and stories through the destinations we love and recommend."
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
      </div>
    </PageContainer>
  );
}

export default PlacesPage;
