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
      size: 10,
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
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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
