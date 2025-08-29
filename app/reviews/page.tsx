"use client";

import React from "react";
import TestimonialCard from "../components/TestimonialCard";
import Jumbotron from "@/components/molecules/Jumbotron";
import PageDetails from "@/components/organisams/PageDetails";
import { useGetAllReviewsQuery } from "@/services/reviewApi";

const ReviewsPage: React.FC = () => {
  const { data, error } = useGetAllReviewsQuery();

  if (error) return <div>Error loading categories</div>;

  const reviews = Array.isArray(data?.data) ? data.data : [];
  console.log("reviews", reviews);

  return (
    <section className="py-16 px-4 md:px-16">
      <Jumbotron
        title="Customer Reviews"
        description="See what our customers have to say about their experiences."
        imageUrl="/round tours/round-tours_main.png"
      />
      <PageDetails
        title="Reviews"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum."
      />
      <div className="max-w-full">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((review: any, index: number) => (
            <div key={index} className="break-inside-avoid mb-6">
              <TestimonialCard
                quote={review.review}
                testimonial={review.testimonial}
                name={review.User.name}
                location={review.User.email}
                rating={review.rating}
                className="hover:shadow-lg transition-shadow duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsPage;
