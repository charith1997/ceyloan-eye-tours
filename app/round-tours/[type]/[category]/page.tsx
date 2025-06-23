import { notFound } from "next/navigation";

const validTourTypes = [
  "secrets-of-lanka",
  "wildlife",
  "love-island",
  "soft-adventure",
  "mini-adventure",
  "down-south",
  "bird-watching",
];

export default async function TourCategoryPage({
  params,
}: {
  params: { type: string; category: string };
}) {
  const { category } = params;

  if (!validTourTypes.includes(category)) {
    return notFound();
  }

  return (
    <section className="py-16 px-4 md:px-16">
      <div
        className="rounded-xl shadow-md bg-cover bg-center h-[300px] relative inset-0 z-0"
        style={{
          backgroundImage: 'url("/family tours/Secrets of Lanka Tour.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/50 rounded-xl z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white gap-6">
          <p className="font-[Work_Sans] text-[36px] md:text-[64px] font-bold leading-[100%] tracking-[0] whitespace-nowrap">
            Secrets of Lanka Tour
          </p>
          <p className="font-[Work_Sans] text-[16px] font-medium leading-[24px] tracking-[0] w-full sm:w-3/5 text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s,
          </p>
        </div>
      </div>

      <div className="py-12">
        <div className="flex flex-row bg-gradient-to-r from-red to-orange text-white px-6 py-3 rounded-md w-fit">
          <div className="flex flex-col">
            <p className="font-normal text-md font-sans">Duration</p>
            <div className="font-bold text-xl font-sans">
              14 Days / 13 Nights
            </div>
          </div>
          <span className="h-auto border-l border-white mx-8" />
          <div className="flex flex-col">
            <p className="font-normal text-md font-sans">Tour Type</p>
            <div className="font-bold text-xl font-[Work_Sans]">
              Romantic Tours
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-20 lg:px-4 py-12">
        <div className="mb-4 text-sm font-medium text-gray-700">
          <span className="font-work text-[14px] md:text-[16px] text-black font-semibold leading-[100%] tracking-wide">
            Home
          </span>
          <span className="mx-1">{">"}</span>
          <span className="font-work text-[14px] md:text-[16px] text-black font-semibold leading-[100%] tracking-wide">
            Round Tours
          </span>
          <span className="mx-1">{">"}</span>
          <span className="font-work text-[14px] md:text-[16px] text-black font-semibold leading-[100%] tracking-wide">
            Family
          </span>
          <span className="mx-1">{">"}</span>
          <span className="font-work text-[14px] md:text-[16px] text-red font-semibold leading-[100%] tracking-wide">
            {category
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </span>
        </div>

        <h1 className="font-work text-[28px] md:text-[36px] font-semibold leading-[100%] tracking-[0] pb-6 pt-2">
          Family Tours in Sri Lanka
        </h1>

        <p className="text-[#6c6b6b] leading-relaxed font-work text-[16px] font-normal tracking-[0] text-justify">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
      <div className="px-6 md:px-16 py-10 max-w-[1400px] mx-auto">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-400 my-4">
          {/* {breadcrumbs.map((item, i) => (
                        <span key={i}>
                            {i > 0 && <span className="mx-1">{">"}</span>}
                            <span className={i === breadcrumbs.length - 1 ? "text-red-500 font-semibold" : ""}>
                                {item}
                            </span>
                        </span>
                    ))} */}
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Content */}
          <div className="flex-1">
            {/* <h2 className="text-3xl font-semibold mb-4">{title}</h2>
                        <p className="text-gray-300 leading-relaxed mb-6">{description}</p>
                        <p className="text-gray-300 leading-relaxed mb-10">{description}</p> */}

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* {images.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt={`tour-${i}`}
                                    className="rounded-lg object-cover w-full h-52"
                                />
                            ))} */}
            </div>
          </div>

          {/* Highlights Sidebar */}
          <div className="lg:w-1/3">
            <h3 className="text-xl font-bold text-red-500 mb-4">
              Tour Highlights
            </h3>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
              {/* {highlights.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))} */}
            </ul>
            <button className="mt-6 w-full bg-gradient-to-r from-pink-600 to-orange-400 text-white py-3 rounded-md font-semibold">
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
