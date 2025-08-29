import Button from "@/components/atoms/Button";
import { useGetAllCategoriesQuery } from "@/services/categoryApi";
import Link from "next/link";

const btnClassNames =
  "cursor-pointer mt-2 w-[100px] h-[48px] rounded-[18px] bg-gradient-to-r from-[#cd1a40] to-[#ff803c] text-white font-medium hover:opacity-90 transition-opacity";

export default function TourTypeSection() {
  const { data, error } = useGetAllCategoriesQuery({});
  if (error) return <div>Error loading categories</div>;

  const categories = Array.isArray(data?.data) ? data.data.slice(0, 4) : [];

  return (
    <section className="max-w-[1200px] mx-auto mt-8 px-4 py-8 text-center">
      <div className="mb-8">
        <h2 className="font-[Carattere] text-[48px] font-normal text-[#CD1A40] leading-none m-0">
          Choose your
        </h2>
        <h1 className="font-[Work Sans] text-[64px] font-extralight uppercase text-[#222] my-2 leading-none">
          TOUR TYPE
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-[70vh]">
        <Link
          href={`/${categories[0].url_prefix}`}
          className="flex-1 relative rounded-xl shadow-md bg-cover bg-center bg-no-repeat group hover:-translate-y-1.5 transition-transform duration-300 cursor-pointer"
          style={{ backgroundImage: `url(${categories[0].image_url})` }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-xl z-0" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white">
            <p className="font-[Carattere] text-[46px]">{categories[0].name}</p>
            <Button
              label={`${categories[0].packageCount} Tours`}
              className={btnClassNames}
            />
          </div>
        </Link>

        <div className="flex-1 flex flex-col gap-6">
          <div className="flex gap-6 h-1/2">
            <Link
              href={`/${categories[1].url_prefix}`}
              className="flex-1 relative rounded-xl shadow-md bg-cover bg-center bg-no-repeat group hover:-translate-y-1.5 transition-transform duration-300 cursor-pointer"
              style={{ backgroundImage: `url(${categories[1].image_url})` }}
            >
              <div className="absolute inset-0 bg-black/40 rounded-xl z-0" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white">
                <p className="font-[Carattere] text-[46px]">
                  {categories[1].name}
                </p>
                <Button
                  label={`${categories[1].packageCount} Tours`}
                  className={btnClassNames}
                />
              </div>
            </Link>

            <Link
              href={`/${categories[2].url_prefix}`}
              className="flex-1 relative rounded-xl shadow-md bg-cover bg-center bg-no-repeat group hover:-translate-y-1.5 transition-transform duration-300 cursor-pointer"
              style={{ backgroundImage: `url(${categories[2].image_url})` }}
            >
              <div className="absolute inset-0 bg-black/40 rounded-xl z-0" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white">
                <p className="font-[Carattere] text-[46px]">
                  {categories[2].name}
                </p>
                <Button
                  label={`${categories[2].packageCount} Tours`}
                  className={btnClassNames}
                />
              </div>
            </Link>
          </div>

          <Link
            href={`/${categories[3].url_prefix}`}
            className="h-1/2 relative rounded-xl shadow-md bg-cover bg-center bg-no-repeat group hover:-translate-y-1.5 transition-transform duration-300 cursor-pointer"
            style={{ backgroundImage: `url(${categories[3].image_url})` }}
          >
            <div className="absolute inset-0 bg-black/40 rounded-xl z-0" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white">
              <p className="font-[Carattere] text-[46px]">
                {categories[3].name}
              </p>
              <Button
                label={`${categories[3].packageCount} Tours`}
                className={btnClassNames}
              />
            </div>
          </Link>
        </div>
      </div>

      <Button
        label={<Link href="/categories">VIEW MORE</Link>}
        className="mt-8 px-4 py-2 rounded-[14px] bg-gradient-to-r from-[#cd1a40] to-[#ff803c] text-white font-[Work Sans] text-[14px] font-normal hover:opacity-90 transition-opacity cursor-pointer"
      />
    </section>
  );
}
