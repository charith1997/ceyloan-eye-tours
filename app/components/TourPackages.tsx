import Carousel from "@/components/organisams/Carousel";

const TourPackages = () => {

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

      <Carousel />
    </section>
  );
};

export default TourPackages;
