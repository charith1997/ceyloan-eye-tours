import React, { useEffect, useState } from "react";
import { BookText, Star } from "lucide-react";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import DetailContainer from "@/components/containers/DetailContainer";
import Image from "next/image";
import { useLazyGetPaginatedReviewsQuery } from "@/services/reviewApi";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setCurrentPage, setTotalPages } from "@/features/paginatorSlice";

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [getPaginatedReviews] = useLazyGetPaginatedReviewsQuery();
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.paginator
  );
  const dispatch = useDispatch();

  const getAllReviews = async () => {
    const params: any = {
      page: currentPage,
      size: 10,
    };

    if (searchQuery.trim()) {
      params.search = searchQuery.trim();
    }

    const { data } = await getPaginatedReviews(params);

    if (data?.success) {
      setReviews(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getAllReviews();
    }
  }, [currentPage, searchQuery]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (totalPages) {
      if (currentPage > totalPages) {
        dispatch(setCurrentPage(1));
      }
    }
  }, [totalPages]);

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder="Search Reviews..."
          title="Reviews"
          buttonName="Add Review"
          isDisplayActionButton={false}
          onSearchChange={handleSearchChange}
        />
        <DetailContainer className="max-h-[calc(100vh-360px)] md:max-h-[calc(100vh-245px)]">
          {reviews.map((review: any, index: number) => (
            <div key={index}>
              <div className="hidden md:flex w-full items-center py-4 px-8 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-8 w-3/4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-md font-bold uppercase">
                      <div className="flex text-yellow-500">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            fill="currentColor"
                            strokeWidth={0}
                          />
                        ))}
                      </div>
                    </h3>
                    <p className="flex text-sm gap-2 items-center">
                      {review.review}
                    </p>
                    <span className="flex text-sm gap-2 items-center">
                      <BookText width={16} />
                      {review.description}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 items-center w-1/4">
                  <span className="flex text-sm gap-2 items-center">
                    {review.User && review?.User?.profile_image ? (
                      <Image
                        className={`w-8 h-8 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500`}
                        src={review.User?.profile_image}
                        alt="Bordered avatar"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div
                        className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500 text-white`}
                      >
                        <span>
                          {review.User?.name
                            .split(" ")
                            .map((word: string) => word[0])
                            .join("")}
                        </span>
                      </div>
                    )}
                  </span>
                  <p className="flex text-sm gap-2 items-center">
                    {review.User?.name}
                  </p>
                </div>
              </div>

              <div className="flex md:hidden w-full items-center justify-between p-4 gap-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col gap-3 text-sm">
                  <div className="text-md font-bold uppercase">
                    <div className="flex text-yellow-500">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          fill="currentColor"
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="flex text-sm gap-2 items-center">
                    {review.review}
                  </p>
                  <span className="flex text-sm gap-2 items-center">
                    <BookText width={16} />
                    {review.description}
                  </span>
                  <div className="flex gap-2 items-center">
                    <span className="flex text-sm gap-2 items-center">
                      {review.User && review?.User?.profile_image ? (
                        <Image
                          className={`w-8 h-8 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500`}
                          src={review.User?.profile_image}
                          alt="Bordered avatar"
                          width={40}
                          height={40}
                        />
                      ) : (
                        <div
                          className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500 text-white`}
                        >
                          <span>
                            {review.User?.name
                              .split(" ")
                              .map((word: string) => word[0])
                              .join("")}
                          </span>
                        </div>
                      )}
                    </span>
                    <p className="flex text-sm gap-2 items-center">
                      {review.User?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </DetailContainer>
      </NavigationContainer>
    </>
  );
};

export default AdminReviewsPage;
