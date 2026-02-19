import Button from "@/components/atoms/Button";
import { useGetAllCategoriesPaginatedQuery } from "@/services/categoryApi";
import { checkImageUrl } from "@/utils/common";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
  const [isHovered, setIsHovered] = useState(false);
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
      },
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${className} relative rounded-3xl shadow-2xl bg-cover bg-center bg-no-repeat group cursor-pointer transition-all duration-700 overflow-hidden border border-white/10 ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-12 scale-95"
      } ${isHovered ? "-translate-y-3 shadow-[0_25px_60px_rgba(0,0,0,0.3)]" : ""}`}
      style={{
        transitionDelay: `${index * 150}ms`,
        transition: "all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1)",
      }}
    >
      {/* Loading skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      )}

      {/* Background Image */}
      <img
        src={checkImageUrl(category.image_url)}
        alt={`Category ${category.id}`}
        className={`absolute w-full h-full object-cover rounded-3xl transition-all duration-700 ${
          imageLoaded && isVisible ? "opacity-100" : "opacity-0"
        } ${isHovered ? "scale-110" : "scale-100"}`}
        style={{
          transitionDelay: `${index * 150 + 200}ms`,
        }}
        onLoad={() => setImageLoaded(true)}
      />

      {/* Gradient Overlays */}
      <div
        className={`absolute inset-0 rounded-3xl z-0 transition-all duration-500 ${
          isHovered
            ? "bg-gradient-to-t from-black/85 via-black/50 to-black/20"
            : "bg-gradient-to-t from-black/75 via-black/40 to-transparent"
        }`}
      />

      {/* Content Container */}
      <div
        className={`relative z-10 flex flex-col items-center justify-end h-full p-8 text-white transition-all duration-700 ${
          imageLoaded && isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
        style={{
          transitionDelay: `${index * 150 + 400}ms`,
        }}
      >
        {/* Category Name */}
        <div className="text-center mb-6 transform transition-transform duration-500 group-hover:scale-105">
          <h3 className="font-[Carattere] text-4xl md:text-5xl leading-none mb-2 drop-shadow-2xl tracking-wide capitalize">
            {category.name}
          </h3>
        </div>

        {/* Button Container */}
        <div className="relative w-full max-w-[280px]">
          {/* Default Button State */}
          <div
            className={`transition-all duration-500 ${
              isHovered
                ? "opacity-0 translate-y-4 pointer-events-none"
                : "opacity-100 translate-y-0"
            }`}
          >
            <div className="px-6 py-3 text-sm font-semibold bg-white/15 backdrop-blur-md rounded-full border border-white/30 transition-all duration-300 text-center shadow-lg">
              <span className="flex items-center justify-center gap-2">
                <MapPin size={16} />
                {category.packageCount} Tours Available
              </span>
            </div>
          </div>

          {/* Hover Button State */}
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <Link
              href={`/${category.url_prefix}`}
              className="block px-8 py-3.5 text-sm font-bold bg-gradient-to-r from-red to-orange rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/50 text-center transform hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                Explore Tours
                <ArrowRight
                  size={18}
                  className={`transition-transform duration-300 ${
                    isHovered ? "translate-x-1" : ""
                  }`}
                />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle shine effect on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl transition-opacity duration-700 pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

const displayCategories = (categories: any[]) => {
  if (categories.length === 1) {
    return (
      <div className="flex flex-col md:flex-row gap-8 md:h-[65vh]">
        <CategoryCard category={categories[0]} className="flex-1" index={0} />
      </div>
    );
  } else if (categories.length === 2) {
    return (
      <div className="flex flex-col md:flex-row gap-8 md:h-[65vh]">
        <CategoryCard category={categories[0]} className="flex-1" index={0} />
        <CategoryCard category={categories[1]} className="flex-1" index={1} />
      </div>
    );
  } else if (categories.length === 3) {
    return (
      <div className="flex flex-col md:flex-row gap-8 md:h-[65vh]">
        <CategoryCard category={categories[0]} className="flex-1" index={0} />
        <div className="flex flex-col flex-1 gap-8">
          <CategoryCard category={categories[1]} className="flex-1" index={1} />
          <CategoryCard category={categories[2]} className="flex-1" index={2} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col md:flex-row gap-8 md:h-[65vh]">
        <CategoryCard category={categories[0]} className="flex-1" index={0} />

        <div className="flex-1 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-8 h-1/2">
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
    <section className="max-w-[1200px] mx-auto mt-8 px-4 py-12 text-center">
      {/* Section Header */}
      <div className="mb-16 relative">
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-orange-100/30 to-red-100/30 rounded-full blur-3xl -z-10" />

        <h2 className="font-[Carattere] text-6xl text-red leading-none m-0 mb-2 drop-shadow-sm">
          Choose your
        </h2>
        <h1 className="text-7xl font-light uppercase text-[#1a1a1a] my-3 leading-none tracking-wider">
          TOUR TYPE
        </h1>
        <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto font-light">
          Discover extraordinary adventures tailored to your passion
        </p>
        <div className="mt-6 mx-auto w-32 h-1.5 bg-gradient-to-r from-red via-orange to-red rounded-full shadow-lg" />
      </div>

      {/* Category Grid */}
      {categories.length > 0 && displayCategories(categories)}

      {/* View All Button */}
      {categories.length >= 4 && (
        <div className="flex justify-center mt-16">
          <Link
            href="/categories"
            className="group relative inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-red to-orange text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:shadow-orange-500/50 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
          >
            {/* Animated background shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <span className="relative z-10 text-lg">View All Categories</span>
            <ArrowRight
              className="relative z-10 group-hover:translate-x-2 transition-transform duration-300"
              size={22}
            />
          </Link>
        </div>
      )}
    </section>
  );
}
