"use client";

import React, { useEffect, useState } from "react";
import TestimonialCard from "../components/TestimonialCard";
import Jumbotron from "@/components/molecules/Jumbotron";
import PageDetails from "@/components/organisams/PageDetails";
import { useLazyGetPaginatedReviewsQuery } from "@/services/reviewApi";
import PageContainer from "@/components/containers/PageContainer";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";

function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [getPaginatedReviews] = useLazyGetPaginatedReviewsQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);

  const dispatch = useDispatch();

  const getAllReviews = async () => {
    const { data } = await getPaginatedReviews({
      page: currentPage,
      size: 9,
    });
    if (data.success) {
      setReviews(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getAllReviews();
    }
  }, [currentPage]);

  return (
    <PageContainer isDisplayPlan={false}>
      <Jumbotron
        title="What Travelers Say"
        description="Read authentic experiences from travelers who explored Sri Lanka with our expertly crafted tours."
        imageUrl="/hero images/reviews.jpeg"
      />
      <PageDetails
        title="Reviews"
        description="Hear directly from our travelers about their unforgettable experiences exploring Sri Lanka. Our reviews reflect the genuine stories, cherished moments, and honest feedback from those who have journeyed with us across the island. From the awe-inspiring sunrise at Sigiriya and the tranquil beauty of Ella's hills to the vibrant wildlife encounters in Yala and the warm hospitality in coastal towns, these shared experiences highlight the quality and care we put into every tour. We believe in transparency and trust, and there is no better testament to our service than the voices of our guests. Read on to discover why so many travelers choose us to create their Sri Lankan adventures."
      />
      <div className="max-w-full">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((review: any, index: number) => (
            <div key={index} className="break-inside-avoid mb-6">
              <TestimonialCard
                quote={review.review}
                testimonial={review.description}
                name={review.User.name}
                image={review.User.profile_image}
                rating={review.rating}
                className="hover:shadow-lg transition-shadow duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

export default ReviewsPage;
