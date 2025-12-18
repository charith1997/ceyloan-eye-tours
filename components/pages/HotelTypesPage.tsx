import React, { useEffect, useState } from "react";
import Jumbotron from "../molecules/Jumbotron";
import PageDetails from "../organisams/PageDetails";
import CardGrid from "../organisams/CardGrid";
import { CARD_DESCRIPTION, CARD_TITLE } from "@/styles/font";
import { useLazyGetAllHotelTypesWithHotelsPaginatedQuery } from "@/services/hotelTypeApi";
import PageContainer from "../containers/PageContainer";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";

function HotelTypesPage() {
  const [hotelTypes, setHotelTypes] = useState<any[]>([]);
  const [getAllHotelTypesWithHotelsPaginated] =
    useLazyGetAllHotelTypesWithHotelsPaginatedQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);

  const dispatch = useDispatch();

  const getAllHotelTypes = async () => {
    const { data } = await getAllHotelTypesWithHotelsPaginated({
      page: currentPage,
      size: 10,
    });
    if (data.success) {
      setHotelTypes(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getAllHotelTypes();
    }
  }, [currentPage]);
  return (
    <PageContainer>
      <Jumbotron
        title="Accommodation"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        imageUrl="/round tours/round-tours_main.png"
      />
      <PageDetails
        title="Tour Hotels and Accommodations"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      />
      <div>
        <CardGrid
          data={hotelTypes.map((hotelType: any) => ({
            cardTitle: "In the",
            cardDescription: hotelType.name,
            count: hotelType.hotelCount,
            ...hotelType,
          }))}
        >
          {(cardTitle: string, cardDescription: string, count: number) => (
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <div>
                <h3 className={CARD_DESCRIPTION}>{cardTitle}</h3>
                <p className={CARD_TITLE}>{cardDescription}</p>
              </div>
              <span className="self-start px-3 py-2 rounded-xl bg-gradient-to-r from-red to-orange text-white text-sm font-medium mt-2 uppercase">
                {Number(count).toString().padStart(2, "0")} hotels
              </span>
            </div>
          )}
        </CardGrid>
      </div>
    </PageContainer>
  );
}

export default HotelTypesPage;
