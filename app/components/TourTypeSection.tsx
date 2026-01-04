import Button from "@/components/atoms/Button";
import { useGetAllCategoriesPaginatedQuery } from "@/services/categoryApi";
import { checkImageUrl } from "@/utils/common";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const btnClassNames =
  "mt-2 w-auto h-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#cd1a40] to-[#ff803c] text-white font-bold hover:opacity-90 transition-opacity";

const CategoryCard = ({
  category,
  className,
}: {
  category: any;
  className: string;
}) => (
  <div
    className={`${className} relative rounded-2xl shadow-2xl bg-cover bg-center bg-no-repeat group hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 overflow-hidden border-2 border-white/20`}
  >
    <img
      src={checkImageUrl(category.image_url)}
      alt={`Category ${category.id}`}
      className="absolute w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/60 group-hover:via-black/30 transition-all duration-500 rounded-2xl z-0" />

    <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-white">
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
            {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" /> */}
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

const displayCategories = (categories: any[]) => {
  if (categories.length === 1) {
    return (
      <div className="flex flex-col md:flex-row gap-6 md:h-[60vh]">
        <CategoryCard category={categories[0]} className="flex-1" />
      </div>
    );
  } else if (categories.length === 2) {
    return (
      <div className="flex flex-col md:flex-row gap-6 md:h-[60vh]">
        <CategoryCard category={categories[0]} className="flex-1" />
        <CategoryCard category={categories[1]} className="flex-1" />
      </div>
    );
  } else if (categories.length === 3) {
    return (
      <div className="flex gap-6 md:h-[60vh]">
        <CategoryCard category={categories[0]} className="flex-1" />
        <div className="flex flex-col flex-1 gap-6">
          <CategoryCard category={categories[0]} className="flex-1" />
          <CategoryCard category={categories[0]} className="flex-1" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col md:flex-row gap-6 md:h-[60vh]">
        <CategoryCard category={categories[0]} className="flex-1" />

        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6 h-1/2">
            {categories.length >= 2 && (
              <CategoryCard category={categories[1]} className="flex-1" />
            )}
            {categories.length >= 3 && (
              <CategoryCard category={categories[2]} className="flex-1" />
            )}
          </div>

          {categories.length >= 4 && (
            <CategoryCard category={categories[3]} className="h-1/2" />
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
