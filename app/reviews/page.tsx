import React from 'react'
import TestimonialCard from '../components/TestimonialCard';

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
            testimonial: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            name: "John D",
            location: "UK",
            rating: 4.5
        },
        {
            quote: "Very friendly, communicative, reliable",
            testimonial: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            name: "John D",
            location: "UK",
            rating: 4.5
        },
        {
            quote: "Very friendly, communicative, reliable",
            testimonial: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            name: "John D",
            location: "UK",
            rating: 4.5
        },
        {
            quote: "Very friendly, communicative, reliable",
            testimonial: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            name: "John D",
            location: "UK",
            rating: 4.5
        },
        {
            quote: "Very friendly, communicative, reliable",
            testimonial: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            name: "John D",
            location: "UK",
            rating: 4.5
        },
        {
            quote: "Very friendly, communicative, reliable",
            testimonial: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            name: "John D",
            location: "UK",
            rating: 4.5
        },
        {
            quote: "Very friendly, communicative, reliable",
            testimonial: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            name: "John D",
            location: "UK",
            rating: 4.5
        },
        {
            quote: "Very friendly, communicative, reliable",
            testimonial: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            name: "John D",
            location: "UK",
            rating: 4.5
        },
        {
            quote: "Very friendly, communicative, reliable",
            testimonial: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            name: "John D",
            location: "UK",
            rating: 4.5
        }
    ];

    return (

        <section className="py-16 px-4 md:px-16">
            <div
                className="rounded-xl shadow-md bg-cover bg-center h-[300px]  inset-0 z-0 relative"
                style={{ backgroundImage: 'url("/round tours/round-tours_main.png")' }}
            >
                <div className="absolute inset-0 bg-black/20 rounded-xl z-0" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white gap-6">
                    <p className="font-[Work_Sans] text-[36px] md:text-[64px] font-bold leading-[100%] tracking-[0] whitespace-nowrap">
                        Reviews
                    </p>
                    <p className="font-[Work_Sans] text-[16px] font-medium leading-[24px] tracking-[0] w-full sm:w-3/5 text-center">
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry&apos;s standard dummy
                        text ever since the 1500s,
                    </p>
                </div>
            </div>
            <div className="py-12">
                <div className="mb-4 text-sm font-medium text-gray-700">
                    <span className="font-work text-[14px] md:text-[16px] text-black font-semibold leading-[100%] tracking-wide">
                        Home
                    </span>
                    <span className="mx-1">{">"}</span>
                    <span className="font-work text-[14px] md:text-[16px] text-red font-semibold leading-[100%] tracking-wide">
                        Reviews
                    </span>
                </div>

                <h1 className="font-work text-[28px] md:text-[36px] font-semibold leading-[100%] tracking-[0] pb-6 pt-2">
                    Reviews
                </h1>

                <p className="text-[#6c6b6b] leading-relaxed font-work text-[16px] font-bold tracking-[0] text-justify">
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever
                    since the 1500s, when an unknown printer took a galley of type and
                    scrambled it to make a type specimen book. It has survived not only
                    five centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged.
                </p>
            </div>
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

export default ReviewsPage