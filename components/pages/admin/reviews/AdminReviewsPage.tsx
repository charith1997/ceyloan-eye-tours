import React from "react";
import { BookText, Component, Star } from "lucide-react";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import DetailContainer from "@/components/containers/DetailContainer";
import Image from "next/image";
import { useGetAllReviewsQuery } from "@/services/reviewApi";

const AdminReviewsPage = () => {
  const { data } = useGetAllReviewsQuery();
  const reviews = Array.isArray(data?.data) ? data.data : [];

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder="Search Reviews..."
          title="Reviews"
          buttonName="Add Review"
          isDisplayActionButton={false}
        />
        <DetailContainer className="max-h-[calc(100vh-307px)] md:max-h-[calc(100vh-182px)]">
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
                        className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500`}
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
                <div className="flex flex-col gap-2 text-sm">
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
                          className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500`}
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
