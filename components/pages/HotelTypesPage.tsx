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
      size: 9,
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
        title="Hotels For Every Budget"
        description="Browse accommodation styles from boutique hotels to beach resorts matching your travel preferences."
        imageUrl="/hero images/hotel_types.jpeg"
      />
      <PageDetails
        title="Tour Hotels and Accommodations"
        description="Discover a selection of carefully curated hotels and accommodations designed to enhance your travel experience in Sri Lanka. From luxury resorts overlooking the Indian Ocean to cozy boutique stays nestled in the hill country and eco-friendly lodges near national parks, we partner with properties that offer comfort, authenticity, and convenience. Our team personally inspects each location to ensure high standards of hospitality, cleanliness, and service, so you can relax and immerse yourself fully in your journey. Whether you seek a romantic getaway, a family-friendly retreat, or an adventurous base camp, our accommodation options cater to all preferences and budgets, making every night of your tour as memorable as the days. Book with confidence and enjoy stays that reflect the spirit and beauty of Sri Lanka."
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
