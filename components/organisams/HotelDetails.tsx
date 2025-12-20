import { checkImageUrl } from "@/utils/common";
import { BriefcaseBusiness, ThumbsUp, Wind } from "lucide-react";
import Image from "next/image";
import React from "react";

interface HotelDetailsProps {
  hotelData: any;
}

const HotelDetails = ({ hotelData }: HotelDetailsProps) => {
  return (
    <div className="py-8">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <div className="pb-4">
            <h1 className="text-3xl md:text-4xl font-semibold pb-4 pt-2">
              Overview
            </h1>
            {hotelData?.description?.map((des: any, idx: number) => (
              <p className="text-gray-700 mb-3" key={idx}>
                {des}
              </p>
            ))}
          </div>

          {hotelData && <MasonryImageGrid images={hotelData.images} />}

          <h1 className="text-3xl md:text-4xl pb-6 pt-2">Available Rooms</h1>
          <p className="text-justify">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8">
            <HotelRoom />
            <HotelRoom />
          </div>
        </div>

        {hotelData && (
          <div className="lg:w-1/4">
            <h3 className="text-3xl md:text-4xl text-red mb-4">Facilities</h3>
            <ul className="list-disc text-gray-700 text-sm space-y-2 ml-4">
              {hotelData?.facilities?.map((point: string, i: number) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelDetails;

function MasonryImageGrid({ images }: { images: string[] }) {
  return (
    <div className="columns-2 md:columns-3 gap-4 py-4 space-y-4">
      {images?.map((src: string, idx: number) => (
        <Image
          key={idx}
          src={checkImageUrl(src)}
          alt={`Hotel Image ${idx + 1}`}
          className="w-80 h-80 object-cover rounded-lg mb-4 "
          width={300}
          height={200}
        />
      ))}
    </div>
  );
}

const HotelRoom = () => {
  return (
    <div className="relative h-80 md:h-100 rounded-lg overflow-hidden shadow-lg group transition-transform hover:scale-105 cursor-pointer">
      <Image
        src="/hotels/Rectangle 70.png"
        alt="Hotel Image"
        className="absolute inset-0 w-full h-60 md:h-80 object-cover bg-center bg-cover"
        fill
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition" />

      <div className="absolute bottom-0 w-full bg-red text-white p-4 flex flex-row justify-between gap-1 items-center">
        <div>
          <h3 className="text-md md:text-lg tracking-wider mb-4">
            Standard twin ben, Multiple beds
          </h3>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex gap-2 text-sm">
              <span>
                <BriefcaseBusiness className="w-5" />
              </span>
              <span>300 sq ft</span>
            </div>
            <div className="flex gap-2 text-sm">
              <span>
                <Wind className="w-5" />
              </span>
              <span>Sleeps 3</span>
            </div>
            <div className="flex gap-2 text-sm">
              <span>
                <ThumbsUp className="w-5" />
              </span>
              <span>1 double bed and 1 twin bed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
