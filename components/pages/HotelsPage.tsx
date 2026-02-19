import React, { useEffect, useState } from "react";
import Jumbotron from "../molecules/Jumbotron";
import PageDetails from "../organisams/PageDetails";
import { useLazyGetAllHotelsPaginatedQuery } from "@/services/hotelApi";
import { renderStarsWhite } from "@/utils/common";
import DetailCardGrid from "../organisams/DetailCardGrid";
import PageContainer from "../containers/PageContainer";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";
import { MapPin } from "lucide-react";

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
          {(item: any) => <HotelCardContent item={item} />}
        </DetailCardGrid>
      </div>
    </PageContainer>
  );
}

export default HotelsPage;

export function HotelCardContent({ item }: { item: any }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10">
      <div className="bg-gradient-to-r from-red to-orange p-3 sm:p-4 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

        <div className="flex flex-row justify-between gap-2 items-center relative z-10">
          <div className="min-w-0 flex-1">
            <h3 className="text-white text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-widest truncate leading-tight">
              {item.name}
            </h3>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-white/80 flex-shrink-0" />
              <p className="text-white/90 text-xs sm:text-sm font-medium truncate">
                {item.Place?.name}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
            <div className="flex items-center gap-0.5">
              {renderStarsWhite(item.rating, 5)}
            </div>
            {item.rating && (
              <span className="text-white/80 text-xs font-semibold">
                {item.rating}/5
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
