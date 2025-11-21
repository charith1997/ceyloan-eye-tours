import { useGetAllActivitiesQuery } from "@/services/activityApi";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { checkImageUrl } from "@/utils/common";
import ScaleCarousel from "@/components/organisams/ScaleCarousel";

const TravelActivity = () => {
  const { data } = useGetAllActivitiesQuery();

  const activities = Array.isArray(data?.data) ? data.data : [];

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
        <ScaleCarousel
          data={activities}
          renderSlide={(activity: any) => (
            <div className="py-8">
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <Image
                  src={checkImageUrl(activity.image_url)}
                  alt={activity.name}
                  fill
                  className="object-cover"
                  sizes="60vw"
                  quality={90}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {activity.name}
                  </h2>
                  <p className="text-white/90 text-lg line-clamp-3 w-full text-center">
                    {activity.description}
                  </p>
                </div>
              </div>
            </div>
          )}
          className="w-full"
        />
      </div>

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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
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
