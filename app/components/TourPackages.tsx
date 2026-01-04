import AutoScrollCarousel from "@/components/organisams/AutoScrollCarousel";
import { useGetAllPackagesPaginatedQuery } from "@/services/packageApi";
import { formatDuration } from "@/utils/package";
import { ArrowRight, Calendar, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TourPackages = () => {
  const { data } = useGetAllPackagesPaginatedQuery({ page: 1, size: 10 });
  const slides = Array.isArray(data?.data) ? data.data : [];

  return (
    <section className="max-w-[1200px] mx-auto mt-16 mb-4 px-4 text-center">
      <div className="mb-8">
        <h2 className="font-[Carattere] text-5xl text-red leading-none">
          Popular
        </h2>
        <h1 className="text-6xl font-extralight uppercase text-[#1e1e1e] my-2 leading-none">
          tour packages
        </h1>
        <div className="mt-4 mb-8 mx-auto w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
        <p className="text-[16px] leading-[26px]">
          Discover unforgettable journeys with Jwing Tours. We craft exceptional
          tours to the world&apos;s most stunning destinations, offering
          adventure, culture, and perfect relaxation.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <AutoScrollCarousel
          data={slides}
          renderSlide={(slide: any) => (
            <div className="px-3">
              <div className="group relative h-[350px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <Image
                  src="/hero_1.png"
                  alt={slide.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-white drop-shadow-2xl group-hover:scale-105 transition-transform duration-300">
                      {slide.title}
                    </h2>

                    <div className="flex items-center justify-center gap-2 text-white/95">
                      <Calendar size={18} />
                      <span className="text-base font-medium">
                        {formatDuration(slide.duration)}
                      </span>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 pt-2">
                      <Link
                        href={`/packages/${slide.url_prefix}`}
                        className="flex justify-self-center px-4 py-2 gap-1 text-sm text-white bg-white/10 backdrop-blur-md rounded-full border border-white/30 transition-all duration-300"
                      >
                        <span>View Details</span>
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          speed={1}
          stopOnInteraction={false}
          className="w-full"
        />
      </div>
      <div className="flex justify-center mt-12">
        <Link
          href="/packages"
          className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          <span>View All Packages</span>
          <ArrowRight
            className="group-hover:translate-x-1 transition-transform duration-300"
            size={20}
          />
        </Link>
      </div>
    </section>
  );
};

export default TourPackages;
