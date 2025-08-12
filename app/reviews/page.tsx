import React from "react";
import TestimonialCard from "../components/TestimonialCard";
import Jumbotron from "@/components/molecules/Jumbotron";
import PageDetails from "@/components/organisams/PageDetails";

interface TestimonialData {
  quote: string;
  testimonial: string;
  name: string;
  location: string;
  rating: number;
}

const ReviewsPage: React.FC = () => {
  const testimonials: TestimonialData[] = [
    {
      quote: "Very friendly, communicative, reliable",
      testimonial:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      name: "John D",
      location: "UK",
      rating: 4.5,
    },
    {
      quote: "Very friendly, communicative, reliable",
      testimonial:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      name: "John D",
      location: "UK",
      rating: 4.5,
    },
    {
      quote: "Very friendly, communicative, reliable",
      testimonial:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      name: "John D",
      location: "UK",
      rating: 4.5,
    },
    {
      quote: "Very friendly, communicative, reliable",
      testimonial:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      name: "John D",
      location: "UK",
      rating: 4.5,
    },
    {
      quote: "Very friendly, communicative, reliable",
      testimonial:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      name: "John D",
      location: "UK",
      rating: 4.5,
    },
    {
      quote: "Very friendly, communicative, reliable",
      testimonial:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      name: "John D",
      location: "UK",
      rating: 4.5,
    },
    {
      quote: "Very friendly, communicative, reliable",
      testimonial:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      name: "John D",
      location: "UK",
      rating: 4.5,
    },
    {
      quote: "Very friendly, communicative, reliable",
      testimonial:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      name: "John D",
      location: "UK",
      rating: 4.5,
    },
    {
      quote: "Very friendly, communicative, reliable",
      testimonial:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      name: "John D",
      location: "UK",
      rating: 4.5,
    },
  ];

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
          {testimonials.map((testimonial: TestimonialData, index: number) => (
            <div key={index} className="break-inside-avoid mb-6">
              <TestimonialCard
                quote={testimonial.quote}
                testimonial={testimonial.testimonial}
                name={testimonial.name}
                location={testimonial.location}
                rating={testimonial.rating}
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
