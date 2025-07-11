import React from "react";
import { notFound } from "next/navigation";
import { Users } from "lucide-react";

const validVehicleTypes = ["bus", "van", "car", "layland"];

function MasonryImageGrid() {
  const images = [
    "/rent/wagon 1.jpg",
    "/rent/wagon 2.jpg",
    "/rent/wagon 3.jpg",
    "/rent/wagon 4.jpg",
    "/rent/wagon 5.jpg",
    "/rent/wagon 6.jpg",
    "/rent/wagon 7.jpg",
    "/rent/wagon 8.jpg",
  ];
  return (
    <div className="columns-2 md:columns-3 gap-4 pt-16 pb-8 space-y-4">
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
  params: Promise<{ model: string }>;
}

export default async function VehicleModel({ params }: PageProps) {
  const { model } = await params;

  if (!validVehicleTypes.includes(model)) {
    return notFound();
  }
  return (
    <section className="py-16 px-4 md:px-16">
      <div
        className="rounded-xl shadow-md bg-cover bg-center h-[300px]  inset-0 z-0 relative"
        style={{ backgroundImage: 'url("/rent/Rent Vehicle.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/20 rounded-xl z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white gap-6">
          <p className="font-[Work_Sans] text-[36px] md:text-[64px] font-bold leading-[100%] tracking-[0] whitespace-nowrap">
            Wagon R 2017
          </p>
          <p className="font-[Work_Sans] text-[16px] font-medium leading-[24px] tracking-[0] w-full sm:w-3/5 text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s,
          </p>
        </div>
      </div>
      <MasonryImageGrid />
      <div className="block md:flex py-8">
        <div className="w-full md:w-2/3">
          <h3 className="text-[36px] tracking-[0] font-medium text-red">
            Facilities
          </h3>
          <ul className="list-disc list-inside text-gray-500 text-sm space-y-2 pb-4">
            {facilityList.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          <h3 className="text-[36px] tracking-[0] font-medium text-red py-4">
            Excludes
          </h3>
          <ul className="list-disc list-inside text-gray-500 text-sm space-y-2 pb-4">
            {excludeList.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          <h3 className="text-[36px] tracking-[0] font-medium text-red py-4">
            Terms & Conditions
          </h3>
          <p className="text-[#6c6b6b] leading-relaxed font-work text-[16px] tracking-[0] text-justify pb-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged.
          </p>
        </div>
        <div className="w-full md:w-1/3">
          <div className="bg-red items-center justify-self-center rounded-md p-8 text-white flex flex-col gap-2 ">
            <div className="text-4xl">Start from</div>
            <div className="text-4xl font-bold">$150</div>
            <div className="flex gap-2 items-center">
              <Users width={20} />
              <p className="font-work text-xl font-normal">18 People</p>
            </div>
            <div className="flex pt-2">
              <h3 className="hidden lg:flex text-xl font-semibold tracking-wide">
                Owner Name:
              </h3>
              <h3 className="text-xl tracking-wide lg:pl-2">Chamika</h3>
            </div>
            <div className="text-xl">071 234 567 8</div>
            <div className="text-xl">Galle</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const facilityList = [
  "Spacious and tallboy design offering ample headroom and legroom",
  "Available in both Petrol and CNG variants",
  "Choice of 1.0L and 1.2L engines for better performance",
  "SmartPlay Studio infotainment system with smartphone connectivity",
  "Dual front airbags for enhanced safety",
  "Reverse parking sensors for convenient parking",
  "60:40 split rear seat for increased luggage flexibility",
  "ABS with EBD (Anti-lock Braking System with Electronic Brakeforce Distribution)",
];

const excludeList = [
  "Accommodation",
  "International airfare",
  "Lunch, Dinner & Beverages",
  "Expenses of a personal nature (telephone calls. laundry etc..)",
  "Personal travel and medical insurance",
  "Departure airport tax",
  "Entrance fees at sites and locations as per itinerary",
];
