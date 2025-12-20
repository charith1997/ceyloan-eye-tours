import React, { useEffect, useState } from "react";
import Jumbotron from "../molecules/Jumbotron";
import PageDetails from "../organisams/PageDetails";
import { useLazyGetAllHotelsPaginatedQuery } from "@/services/hotelApi";
import { renderStars } from "@/utils/common";
import DetailCardGrid from "../organisams/DetailCardGrid";
import PageContainer from "../containers/PageContainer";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";

function HotelsPage() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [getAllHotelsPaginated] = useLazyGetAllHotelsPaginatedQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);

  const dispatch = useDispatch();

  const getAllHotels = async () => {
    const { data } = await getAllHotelsPaginated({
      page: currentPage,
      size: 9,
    });
    if (data.success) {
      setHotels(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getAllHotels();
    }
  }, [currentPage]);
  return (
    <PageContainer>
      <Jumbotron
        title="Comfortable Accommodation Options"
        description="Find perfect stays from luxury resorts to cozy guesthouses across Sri Lanka's destinations."
        imageUrl="/hero images/hotels.jpeg"
      />
      <PageDetails
        title="Tour Hotels and Accommodations"
        description="Discover a selection of carefully curated hotels and accommodations designed to enhance your travel experience in Sri Lanka. From luxury resorts overlooking the Indian Ocean to cozy boutique stays nestled in the hill country and eco-friendly lodges near national parks, we partner with properties that offer comfort, authenticity, and convenience. Our team personally inspects each location to ensure high standards of hospitality, cleanliness, and service, so you can relax and immerse yourself fully in your journey. Whether you seek a romantic getaway, a family-friendly retreat, or an adventurous base camp, our accommodation options cater to all preferences and budgets, making every night of your tour as memorable as the days. Book with confidence and enjoy stays that reflect the spirit and beauty of Sri Lanka."
      />
      <div>
        <DetailCardGrid data={hotels}>
          {(item: any) => (
            <div className="absolute bottom-0 w-full bg-red text-white p-4 flex flex-row justify-between gap-1 items-center">
              <div>
                <h3 className="text-md md:text-lg font-extrabold uppercase tracking-widest">
                  {item.name}
                </h3>
                <p className="text-sm md:text-base font-medium">
                  {item.Place.name}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {renderStars(item.rating, 5)}
              </div>
            </div>
          )}
        </DetailCardGrid>
      </div>
    </PageContainer>
  );
}

export default HotelsPage;
