import AutoScrollCarousel from "@/components/organisams/AutoScrollCarousel";
import { useGetAllPackagesQuery } from "@/services/packageApi";
import { formatDuration } from "@/utils/package";
import Image from "next/image";

const TourPackages = () => {
  const { data } = useGetAllPackagesQuery();
  const slides = Array.isArray(data?.data) ? data.data : [];

  return (
    <section className="max-w-[1200px] mx-auto my-8 px-4 text-center">
      <div className="mb-8">
        <h2 className="font-[Carattere] text-5xl text-red leading-none">
          Popular
        </h2>
        <h1 className="text-6xl font-extralight uppercase text-[#1e1e1e] my-2 leading-none">
          tour packages
        </h1>
        <p className="text-[16px] leading-[26px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s,
        </p>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <AutoScrollCarousel
          data={slides}
          renderSlide={(slide: any) => (
            <div className="px-2">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src="/hero_1.png"
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-white/90">
                    {formatDuration(slide.duration)}
                  </p>
                </div>
              </div>
            </div>
          )}
          speed={1}
          stopOnInteraction={false}
          className="w-full"
        />
      </div>
    </section>
  );
};

export default TourPackages;
