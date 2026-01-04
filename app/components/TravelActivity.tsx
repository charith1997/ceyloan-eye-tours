import { useGetAllActivitiesPaginatedQuery } from "@/services/activityApi";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { checkImageUrl } from "@/utils/common";
import ScaleCarousel from "@/components/organisams/ScaleCarousel";

const TravelActivity = () => {
  const { data } = useGetAllActivitiesPaginatedQuery({
    page: 1,
    size: 10,
  });

  const activities = Array.isArray(data?.data) ? data.data : [];

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-8 text-center">
      <div className="mb-12">
        <h2 className="font-[Carattere] text-[48px] text-red leading-none m-0">
          Travel by
        </h2>
        <h1 className="font-[Work Sans] text-[64px] font-extralight uppercase text-[#222] my-2 leading-none">
          activity
        </h1>
        <div className="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
      </div>

      <div className="relative mb-4">
        <ScaleCarousel
          data={activities.slice(0, 6)}
          renderSlide={(activity: any, index: number, isCentered: boolean) => (
            <div className="pb-8 px-2">
              <div className="group relative h-[350px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                {/* Full focus on image */}
                <Image
                  src={checkImageUrl(activity.image_url)}
                  alt={activity.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="60vw"
                  quality={95}
                  priority={index === 0}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                  <h2
                    className={`text-3xl font-bold text-white mb-3 transform transition-transform duration-300 ${
                      !isCentered && "group-hover:translate-y-[-8px]"
                    }`}
                  >
                    {activity.name}
                  </h2>
                  {isCentered ? (
                    <p className="text-white/90 text-base line-clamp-2 opacity-100 translate-y-0 transition-all duration-300">
                      {activity.description}
                    </p>
                  ) : (
                    <p className="text-white/90 text-base line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      {activity.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          className="w-full"
        />
      </div>

      <div className="flex justify-center">
        <Link
          href="/activities"
          className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          <span>View All Activities</span>
          <ArrowRight
            className="group-hover:translate-x-1 transition-transform duration-300"
            size={20}
          />
        </Link>
      </div>
    </section>
  );
};

export default TravelActivity;
