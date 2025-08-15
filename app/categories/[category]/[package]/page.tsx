"use client";

import Image from "next/image";
import CTAButton from "@/app/components/CTAButton";
import Button from "@/components/atoms/Button";
import Jumbotron from "@/components/molecules/Jumbotron";
import Timeline from "@/components/organisams/Timeline";
import { displayTourType, getLastParam, ROUND_TOURS } from "@/utils/common";
import { useGetPackageByUrlPrefixQuery } from "@/services/packageApi";
import { formatDuration } from "@/utils/package";
import PageRouting from "@/components/molecules/PageRouting";

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

export default function PackagePage() {
  const lastParam = getLastParam();
  console.log("lastParam", lastParam);

  const { data, error, isLoading } = useGetPackageByUrlPrefixQuery(lastParam);
  console.log("data", data?.data);

  const packageData = data?.data ?? {};
  return (
    <section className="py-16 px-4 md:px-16">
      <Jumbotron
        title={packageData.title}
        description={packageData.description}
        imageUrl={packageData.imageUrl}
      />
      <div className="pt-12 pb-8">
        <div className="flex flex-row bg-gradient-to-r from-red to-orange text-white px-6 py-3 rounded-md w-fit">
          <div className="flex flex-col">
            <p className="font-normal text-md font-sans">Duration</p>
            <div className="font-bold text-xl font-sans">
              {formatDuration(packageData.duration)}
            </div>
          </div>
          <span className="h-auto border-l border-white mx-8" />
          <div className="flex flex-col">
            <p className="font-normal text-md font-sans">Tour Type</p>
            <div className="font-bold text-xl font-[Work_Sans]">
              {displayTourType(packageData.tour_type)}
            </div>
          </div>
        </div>
      </div>

      <PageRouting />

      <div className="py-5 max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <h1 className="font-work text-[36px] md:text-[36px] font-semibold leading-[100%] tracking-[0] pb-6 pt-2">
              Overview
            </h1>
            {packageData.description &&
              packageData.description.map(
                (paragraph: string, index: number) => (
                  <p
                    className="leading-relaxed font-work text-[16px] font-normal tracking-[0] text-justify mb-6"
                    key={index}
                  >
                    {paragraph}
                  </p>
                )
              )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {packageData.Images?.map((src: string, i: number) => (
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
              {packageData.package_highlights?.map(
                (point: string, i: number) => (
                  <li className="font-semibold" key={i}>
                    {point}
                  </li>
                )
              )}
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
            {packageData.includes?.map((point: string, i: number) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          <h2 className="font-work text-[36px] tracking-[0] font-medium text-red mb-4 mt-8">
            Tour Price Excludes
          </h2>
          <ul className="list-disc list-inside space-y-2 font-work text-[16px]">
            {packageData.excludes?.map((point: string, i: number) => (
              <li key={i}>{point}</li>
            ))}
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
