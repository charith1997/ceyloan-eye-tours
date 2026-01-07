import Button from "@/components/atoms/Button";
import { useGetAllCategoriesPaginatedQuery } from "@/services/categoryApi";
import { checkImageUrl } from "@/utils/common";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const btnClassNames =
  "mt-2 w-auto h-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#cd1a40] to-[#ff803c] text-white font-bold hover:opacity-90 transition-opacity";

const CategoryCard = ({
  category,
  className,
  index = 0,
}: {
  category: any;
  className: string;
  index?: number;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${className} relative rounded-2xl shadow-2xl bg-cover bg-center bg-no-repeat group hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 overflow-hidden border-2 border-white/20 ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-12 scale-95"
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
        transition: "all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1)",
      }}
    >
      {/* Loading skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      )}

      <img
        src={checkImageUrl(category.image_url)}
        alt={`Category ${category.id}`}
        className={`absolute w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-all duration-700 ${
          imageLoaded && isVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-110"
        }`}
        style={{
          transitionDelay: `${index * 150 + 200}ms`,
        }}
        onLoad={() => setImageLoaded(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/60 group-hover:via-black/30 transition-all duration-500 rounded-2xl z-0" />

      <div
        className={`relative z-10 flex flex-col items-center justify-center h-full p-8 text-white transition-all duration-700 ${
          imageLoaded && isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
        style={{
          transitionDelay: `${index * 150 + 400}ms`,
        }}
      >
        <p className="font-[Carattere] text-[52px] mb-6 transition-all duration-300 drop-shadow-2xl group-hover:scale-110 transform text-center leading-tight">
          {category.name}
        </p>

        <div className="relative overflow-hidden w-[200px]">
          <Button
            label={`${category.packageCount} Tours Available`}
            className="px-4 py-2 text-sm font-semibold bg-white/10 backdrop-blur-md rounded-full border border-white/30 transition-all duration-300 hover:hidden"
          />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0">
            <Link
              href={`/${category.url_prefix}`}
              className="px-8 py-2 text-sm font-semibold bg-white/10 backdrop-blur-md rounded-full border border-white/30 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore More
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const displayCategories = (categories: any[]) => {
  if (categories.length === 1) {
    return (
      <div className="flex flex-col md:flex-row gap-6 md:h-[60vh]">
        <CategoryCard category={categories[0]} className="flex-1" index={0} />
      </div>
    );
  } else if (categories.length === 2) {
    return (
      <div className="flex flex-col md:flex-row gap-6 md:h-[60vh]">
        <CategoryCard category={categories[0]} className="flex-1" index={0} />
        <CategoryCard category={categories[1]} className="flex-1" index={1} />
      </div>
    );
  } else if (categories.length === 3) {
    return (
      <div className="flex gap-6 md:h-[60vh]">
        <CategoryCard category={categories[0]} className="flex-1" index={0} />
        <div className="flex flex-col flex-1 gap-6">
          <CategoryCard category={categories[1]} className="flex-1" index={1} />
          <CategoryCard category={categories[2]} className="flex-1" index={2} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col md:flex-row gap-6 md:h-[60vh]">
        <CategoryCard category={categories[0]} className="flex-1" index={0} />

        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6 h-1/2">
            {categories.length >= 2 && (
              <CategoryCard
                category={categories[1]}
                className="flex-1"
                index={1}
              />
            )}
            {categories.length >= 3 && (
              <CategoryCard
                category={categories[2]}
                className="flex-1"
                index={2}
              />
            )}
          </div>

          {categories.length >= 4 && (
            <CategoryCard
              category={categories[3]}
              className="h-1/2"
              index={3}
            />
          )}
        </div>
      </div>
    );
  }
};

export default function TourTypeSection() {
  const { data } = useGetAllCategoriesPaginatedQuery({ page: 1, size: 4 });

  const categories = Array.isArray(data?.data) ? data.data : [];

  return (
    <section className="max-w-[1200px] mx-auto mt-8 px-4 py-8 text-center">
      <div className="mb-12">
        <h2 className="font-[Carattere] text-5xl text-red leading-none m-0">
          Choose your
        </h2>
        <h1 className="text-6xl font-extralight uppercase text-[#222] my-2 leading-none">
          TOUR TYPE
        </h1>
        <div className="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
      </div>

      {categories.length > 0 && displayCategories(categories)}

      {categories.length >= 4 && (
        <div className="flex justify-center mt-12">
          <Link
            href="/categories"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>View All Categories</span>
            <ArrowRight
              className="group-hover:translate-x-1 transition-transform duration-300"
              size={20}
            />
          </Link>
        </div>
      )}
    </section>
  );
}
