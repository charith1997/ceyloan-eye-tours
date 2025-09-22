import { useGetAllActivitiesQuery } from "@/services/activityApi";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TravelActivity = () => {
  const { data } = useGetAllActivitiesQuery();
  const [currentSlide, setCurrentSlide] = useState(0);

  const activities = Array.isArray(data?.data) ? data.data : [];
  
  // Show 6 activities per slide
  const itemsPerSlide = 6;
  const totalSlides = Math.ceil(activities.length / itemsPerSlide);
  
  const getCurrentSlideActivities = () => {
    const startIndex = currentSlide * itemsPerSlide;
    const endIndex = startIndex + itemsPerSlide;
    return activities.slice(startIndex, endIndex);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const displayedActivities = getCurrentSlideActivities();

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-8 text-center">
      <div className="mb-8">
        <h2 className="font-[Carattere] text-[48px] text-[#CD1A40] leading-none m-0">
          Travel by
        </h2>
        <h1 className="font-[Work Sans] text-[64px] font-extralight uppercase text-[#222] my-2 leading-none">
          activity
        </h1>
      </div>

      <div className="relative">
        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedActivities.map((activity: any, index: number) => (
            <div
              className="flex-1 relative rounded-xl shadow-md bg-cover bg-center bg-no-repeat group hover:-translate-y-1.5 transition-transform duration-300 cursor-pointer"
              style={{
                backgroundImage: `url(${activity.image_url})`,
                height: "300px",
                width: "100%",
                objectFit: "cover",
              }}
              key={index}
            >
              <div className="absolute inset-0 bg-black/40 rounded-xl z-0" />
              <div className="relative z-10 flex flex-col items-center justify-end h-full p-6 text-white gap-2">
                <div className="text-4xl font-bold leading-none">
                  {activity.name}
                </div>
                <div className="text-lg">{activity.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:shadow-xl"
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:shadow-xl"
            >
              <ChevronRight size={24} className="text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Slide Indicators */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-2 mb-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-[#CD1A40] scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}

      {/* View All Button */}
      <div className="flex justify-center">
        <Link
          href="/activities"
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#CD1A40] to-orange-500 text-white font-semibold rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
        >
          <span>View All Activities</span>
          <svg 
            className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Activity Count */}
      <p className="text-gray-600 mt-4 text-sm">
        {activities.length} total activities available
      </p>
    </section>
  );
};

export default TravelActivity;