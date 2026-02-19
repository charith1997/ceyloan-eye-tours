import React, { useEffect, useState } from "react";
import Jumbotron from "../molecules/Jumbotron";
import PageDetails from "../organisams/PageDetails";
import CardGrid from "../organisams/CardGrid";
import { useLazyGetAllHotelTypesWithHotelsPaginatedQuery } from "@/services/hotelTypeApi";
import PageContainer from "../containers/PageContainer";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";
import { Hotel } from "lucide-react";

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
            <div className="absolute inset-0 flex flex-col justify-end z-10">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent rounded-md" />

              <div className="relative z-10 p-4 sm:p-5 md:p-6">
                <p className="text-white/70 text-xs sm:text-sm font-medium uppercase tracking-widest mb-1">
                  {cardTitle}
                </p>

                <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold uppercase leading-tight drop-shadow-lg mb-3">
                  {cardDescription}
                </h3>

                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red to-orange text-white text-xs sm:text-sm font-bold shadow-lg uppercase tracking-wide">
                  <Hotel className="w-3.5 h-3.5" />
                  {Number(count).toString().padStart(2, "0")} Hotels
                </span>
              </div>
            </div>
          )}
        </CardGrid>
      </div>
    </PageContainer>
  );
}

export default HotelTypesPage;
