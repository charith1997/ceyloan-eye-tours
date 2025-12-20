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
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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
