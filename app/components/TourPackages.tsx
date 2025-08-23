import Carousel from "@/components/organisams/Carousel";
// import { useGetAllPackagesQuery } from "@/services/packageApi";
// import Image from "next/image";

const TourPackages = () => {
  // const { data, error, isLoading } = useGetAllPackagesQuery();
  // const packages = Array.isArray(data?.data) ? data.data : [];

  return (
    <section className="max-w-[1200px] mx-auto my-8 px-4 text-center">
      <div className="mb-8">
        <h2 className="font-[Carattere] text-[48px] font-normal text-[#CD1A40] leading-none">
          Popular
        </h2>
        <h1 className="font-[Work Sans] text-[64px] font-extralight uppercase text-[#1e1e1e] my-2 leading-none">
          tour packages
        </h1>
        <p className="font-[Work Sans] text-[16px] font-normal leading-[26px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s,
        </p>
      </div>

      <Carousel />
    </section>
  );
};

export default TourPackages;
