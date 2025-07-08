import { notFound } from "next/navigation";
import {
  Star,
  HouseWifi,
  BriefcaseBusiness,
  Wind,
  Waves,
  CircleParking,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";

const validTourTypes = [
  "tamaravila-wilpattu",
  "wild-coast-tented-lodge",
  "back-of-beyond-dune-camp",
  "gaga-bees-yala",
  "the-elephant-corridor",
];

const facilityList = [
  "Airport Shuttle Service",
  "Free toiletries",
  "Air conditioning",
  "Private Bathroom",
  "BBQ facilities",
  "Outdoor fireplace",
  "Comfort stay in a Luxury Tented Chalet",
  "Daily game drives in the morning",
  "Customized safari viewing vehicles",
  "All park entry fees",
  "Refreshments during game drives",
  "Plunge pool",
];

const facilities = [
  {
    name: "Free Wi-Fi",
    icon: <HouseWifi />,
  },
  {
    name: "Business Services",
    icon: <BriefcaseBusiness />,
  },
  {
    name: "Air Conditioning",
    icon: <Wind />,
  },
  {
    name: "Swimming Pool",
    icon: <Waves />,
  },
  {
    name: "Parking Available",
    icon: <CircleParking />,
  },
  {
    name: "Top rated in area",
    icon: <ThumbsUp />,
  },
];
function MasonryImageGrid() {
  const images = [
    "/hotels/Rectangle 22.png",
    "/hotels/Rectangle 18.png",
    "/hotels/Rectangle 17.png",
    "/hotels/Rectangle 8.png",
    "/hotels/Rectangle 21.png",
    "/hotels/Rectangle 23.png",
    "/hotels/Rectangle 20.png",
    "/hotels/Rectangle 19.png",
  ];
  return (
    <div className="columns-2 md:columns-3 gap-4 py-4 space-y-4">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Hotel Image ${idx + 1}`}
          className="w-full rounded-lg mb-4"
        />
      ))}
    </div>
  );
}

interface PageProps {
  params: Promise<{ hotel: string }>;
}

export default async function TourCategoryPage({ params }: PageProps) {
  const { hotel } = await params;

  if (!validTourTypes.includes(hotel)) {
    return notFound();
  }
  const rating = 4.5;
  const maxRating = 5;

  const renderStars = (): React.ReactNode[] => {
    const stars: React.ReactNode[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <Star
            className="w-4 h-4 fill-orange-400 text-orange-400 absolute top-0 left-0 overflow-hidden"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div>
      );
    }

    // Empty stars
    const emptyStars = maxRating - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

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
            Tamaravila Wilpattu
          </p>
          <p className="font-[Work_Sans] text-[16px] font-medium leading-[24px] tracking-[0] w-full sm:w-3/5 text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s,
          </p>
        </div>
      </div>

      <div className="text-sm font-medium text-gray-700 mt-8">
        <span className="font-work text-[14px] md:text-[16px] text-black font-semibold leading-[100%] tracking-wide">
          Home
        </span>
        <span className="mx-1">{">"}</span>
        <span className="font-work text-[14px] md:text-[16px] text-black font-semibold leading-[100%] tracking-wide">
          Hotels
        </span>
        <span className="mx-1">{">"}</span>
        <span className="font-work text-[14px] md:text-[16px] text-black font-semibold leading-[100%] tracking-wide">
          In the wild
        </span>
        <span className="mx-1">{">"}</span>
        <span className="font-work text-[14px] md:text-[16px] text-red font-semibold leading-[100%] tracking-wide">
          {hotel
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </span>
        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center gap-0.5">{renderStars()}</div>
          <span className="text-sm font-semibold ml-1">
            {rating} (1200 reviews)
          </span>
        </div>
        <div className="text-sm font-semibold mt-2">
          Lorem ipsum road, Tantruim-2322,
        </div>
      </div>
      <div className="py-8 max-w-[1400px]">
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
            <p className="leading-relaxed font-work text-[16px] font-normal tracking-[0] text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.
            </p>
            <div className="py-8">
              <div className="text-[18px] font-semibold tracking-wider">
                Top Facilities
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {facilities.map((facility, i) => (
                  <div className="flex gap-2" key={i}>
                    <span className="text-red">{facility.icon}</span>
                    <span className="text-gray-700 text-[15px]">
                      {facility.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <MasonryImageGrid />

            <h1 className="text-[36px] md:text-[36px] leading-[100%] tracking-[0] pb-6 pt-2">
              Available Rooms
            </h1>
            <p className="leading-relaxed font-work text-[16px] font-normal tracking-[0] text-justify">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8">
              <HotelRoom />
              <HotelRoom />
            </div>
          </div>

          <div className="lg:w-1/4">
            <h3 className="font-work text-[36px] tracking-[0] font-medium text-red mb-4">
              Facilities
            </h3>
            <ul className="list-disc list-inside text-gray-500 text-sm space-y-2">
              {facilityList.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
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
          <h3 className="text-md md:text-lg tracking-widest mb-4">
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
