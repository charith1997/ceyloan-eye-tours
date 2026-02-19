"use client";

import React, { useEffect, useState, useRef } from "react";
import TestimonialCard from "../components/TestimonialCard";
import Jumbotron from "@/components/molecules/Jumbotron";
import PageDetails from "@/components/organisams/PageDetails";
import { useLazyGetPaginatedReviewsQuery } from "@/services/reviewApi";
import PageContainer from "@/components/containers/PageContainer";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";
import { MessageSquareQuote } from "lucide-react";

function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [getPaginatedReviews] = useLazyGetPaginatedReviewsQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
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

  useEffect(() => {
    const observers = cardRefs.current.map((cardRef, index) => {
      if (!cardRef) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set(prev).add(index));
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "50px" },
      );

      observer.observe(cardRef);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [reviews]);

  const getAnimationClass = (index: number, isVisible: boolean) => {
    const patterns = [
      isVisible
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 translate-y-16 scale-95",
      isVisible
        ? "opacity-100 translate-x-0 scale-100"
        : "opacity-0 -translate-x-16 scale-95",
      isVisible
        ? "opacity-100 translate-x-0 scale-100"
        : "opacity-0 translate-x-16 scale-95",
    ];
    return patterns[index % patterns.length];
  };

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

      <div className="max-w-full pb-4">
        {reviews.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
            {reviews.map((review: any, index: number) => (
              <div
                key={index}
                ref={(el: any) => (cardRefs.current[index] = el)}
                className={`break-inside-avoid mb-4 sm:mb-6 transition-all duration-700 ease-out ${getAnimationClass(
                  index,
                  visibleCards.has(index),
                )}`}
                style={{
                  transitionDelay: `${(index % 3) * 100}ms`,
                }}
              >
                <TestimonialCard
                  quote={review.review}
                  testimonial={review.description}
                  name={review.User.name}
                  image={review.User.profile_image}
                  rating={review.rating}
                  className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-br from-[#cd1a40]/20 to-[#ff803c]/20 rounded-full blur-xl" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
                  <MessageSquareQuote className="w-9 h-9 text-gray-400" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-gray-700">
                No reviews yet
              </h3>
              <p className="text-sm sm:text-base text-gray-500 max-w-sm mx-auto leading-relaxed">
                Be the first to share your experience with us!
              </p>

              <div className="flex justify-center gap-2 pt-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-[#cd1a40] to-[#ff803c] animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default ReviewsPage;
