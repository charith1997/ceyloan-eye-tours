import Button from "@/components/atoms/Button";
import { useGetAllCategoriesQuery } from "@/services/categoryApi";
import Link from "next/link";

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
    className={`${className} relative rounded-xl shadow-lg bg-cover bg-center bg-no-repeat group hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 overflow-hidden`}
    style={{ backgroundImage: `url(${category.image_url})` }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 group-hover:from-black/50 group-hover:via-black/20 group-hover:to-transparent transition-all duration-500 rounded-xl z-0" />

    <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white">
      <p className="font-[Carattere] text-[46px] mb-4 transition-all duration-300 drop-shadow-lg group-hover:scale-110 transform">
        {category.name}
      </p>

      <div className="relative overflow-hidden w-[200px]">
        <Button
          label={`${category.packageCount} Tours`}
          className={`${btnClassNames} group-hover:opacity-0 transition-opacity duration-300`}
        />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0">
          <Link
            href={`/${category.url_prefix}`}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 via-red-500 to-[#cd1a40] text-white font-bold hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 hover:opacity-100 transition-opacity duration-500 animate-shine" />
            <span className="relative z-10">Explore More</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default function TourTypeSection() {
  const { data } = useGetAllCategoriesQuery({});

  const categories = Array.isArray(data?.data) ? data.data.slice(0, 4) : [];

  return (
    <section className="max-w-[1200px] mx-auto mt-8 px-4 py-8 text-center">
      <div className="mb-8">
        <h2 className="font-[Carattere] text-5xl text-red leading-none m-0">
          Choose your
        </h2>
        <h1 className="text-6xl font-extralight uppercase text-[#222] my-2 leading-none">
          TOUR TYPE
        </h1>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-col md:flex-row gap-6 md:h-[60vh]">
          <CategoryCard category={categories[0]} className="flex-1" />

          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6 h-1/2">
              <CategoryCard category={categories[1]} className="flex-1" />
              <CategoryCard category={categories[2]} className="flex-1" />
            </div>

            <CategoryCard category={categories[3]} className="h-1/2" />
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <Link
          href="/categories"
          className="mt-10 inline-flex items-center px-8 py-3 bg-gradient-to-r from-red to-orange-500 text-white font-semibold rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
        >
          <span>View All Categories</span>
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
    </section>
  );
}
