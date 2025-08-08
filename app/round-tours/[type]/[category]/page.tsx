import { notFound } from "next/navigation";
import Timeline from "./Timeline";
import Image from "next/image";
import CTAButton from "@/app/components/CTAButton";
import Button from "@/components/atoms/Button";

const validTourTypes = [
  "secrets-of-lanka",
  "wildlife",
  "love-island",
  "soft-adventure",
  "mini-adventure",
  "down-south",
  "bird-watching",
];

const highlights = [
  "Pinnawala Elephant Orphanage",
  "Kandy Temple Of The Tooth",
  "Hike The Knuckles Mountain Range",
  "Meet The Veddas In Mahiyanganaya",
  "Ella Rock",
  "9 Arch Bridge",
  "Udawalawe National Park",
  "Sinharaja Forest Trekking",
  "Relax In The Beach",
  "White Water Rafting & Waterfall Climbing",
];

const images = [
  "/family tours/Secrets of Lanka Tour.jpg",
  "/tour types/Rectangle 17.png",
  "/tour types/Rectangle 19.png",
  "/round tours/Adventure Tours.jpg",
  "/round tours/Luxury Tours.jpg",
  "/round tours/General Tours.jpg",
];

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function TourCategoryPage({ params }: PageProps) {
  const { category } = await params;

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

      <div className="pt-12 pb-8">
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

      <div className="text-sm font-medium text-gray-700">
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
      <div className="py-10 max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <h1 className="font-work text-[36px] md:text-[36px] font-semibold leading-[100%] tracking-[0] pb-6 pt-2">
              Overview
            </h1>
            <p className="leading-relaxed font-work text-[16px] font-normal tracking-[0] text-justify mb-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <p className="leading-relaxed font-work text-[16px] font-normal tracking-[0] text-justify mb-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={`tour-${i}`}
                  className="rounded-lg object-cover w-full h-52"
                  width={300}
                  height={200}
                />
              ))}
            </div>
          </div>

          <div className="lg:w-1/4 lg:self-end">
            <h3 className="font-work text-[36px] tracking-[0] font-medium text-red mb-4">
              Tour Highlights
            </h3>
            <ul className="list-disc list-inside text-sm space-y-2">
              {highlights.map((point, i) => (
                <li className="font-semibold" key={i}>
                  {point}
                </li>
              ))}
            </ul>
            <Button
              label="BOOK NOW"
              className="mt-6 w-full bg-gradient-to-r from-pink-600 to-orange-400 text-white py-3 rounded-md font-semibold"
            />
          </div>
        </div>
      </div>
      <Timeline />
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-6">
          <h2 className="font-work text-[36px] tracking-[0] font-medium text-red mb-4">
            Tour Price Includes
          </h2>
          <ul className="list-disc list-inside space-y-2 font-work text-[16px]">
            <li>Meet and assistance at the Colombo International Airport.</li>
            <li>Transportation by an air-conditioned vehicle with driver.</li>
            <li>All fuel, insurance and license fees of the vehicle.</li>
            <li>Replacement of vehicle in case of breakdown or emergency.</li>
            <li>Accommodation on double/twin room sharing basis.</li>
            <li>Meals on Bed & Breakfast basis at the hotels reserved.</li>
          </ul>

          <h2 className="font-work text-[36px] tracking-[0] font-medium text-red mb-4 mt-8">
            Tour Price Excludes
          </h2>
          <ul className="list-disc list-inside space-y-2 font-work text-[16px]">
            <li>
              Air ticket expenses from your country to Sri Lanka and return
              journey.
            </li>
            <li>Extra items consumed / facilities utilized in Hotels.</li>
            <li>Tips to service men and drivers.</li>
            <li>Expenses of personal nature such as liquor, cigarettes etc.</li>
            <li>
              Camera Charges and video recording charges payable at the sites.
            </li>
          </ul>
        </div>
        <div className="relative lg:w-1/2 p-6 xl:mx-32">
          <Image
            src="/round tours/Map.png"
            alt="Map of Tour"
            width={500}
            height={300}
            className="rounded-lg object-fill w-full h-120"
          />
        </div>
      </div>
      <CTAButton />
    </section>
  );
}
