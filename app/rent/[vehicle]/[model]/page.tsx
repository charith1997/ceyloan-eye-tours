"use client";

import React, { useState } from "react";
import {
  Users,
  Phone,
  MapPin,
  DollarSign,
  CheckCircle2,
  XCircle,
  FileText,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Jumbotron from "@/components/molecules/Jumbotron";
import { checkImageUrl, getLastParam } from "@/utils/common";
import { useGetVehicleByPrefixQuery } from "@/services/vehicleApi";
import PageRouting from "@/components/molecules/PageRouting";

function MasonryImageGrid({ images }: { images: any }) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  return (
    <div className="mt-8 sm:mt-10 mb-8 sm:mb-10">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-red rounded-full" />
        Photo Gallery
      </h2>
      <div className="columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
        {images.map((src: any, idx: number) => (
          <div
            key={idx}
            className="relative group overflow-hidden rounded-xl break-inside-avoid shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
          >
            {!loadedImages.has(idx) && (
              <div className="w-full h-48 sm:h-56 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            )}

            <Image
              src={checkImageUrl(src)}
              alt={`Vehicle Image ${idx + 1}`}
              className={`w-full h-48 sm:h-56 object-cover rounded-xl transition-all duration-700 group-hover:scale-110 ${
                loadedImages.has(idx) ? "opacity-100" : "opacity-0"
              }`}
              width={300}
              height={200}
              onLoad={() => handleImageLoad(idx)}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl flex items-end p-3">
              <span className="text-white text-xs font-semibold">
                Photo {idx + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VehicleModel() {
  const lastSegment = getLastParam();
  const { data } = useGetVehicleByPrefixQuery(lastSegment);
  const vehicleDetails = data?.data || null;

  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      {vehicleDetails && (
        <>
          <Jumbotron
            title={vehicleDetails.name}
            description="Find the perfect vehicle for your journey."
            imageUrl="/rent/Rent Vehicle.jpg"
          />

          <div className="py-8 sm:py-10">
            <PageRouting />
          </div>

          <div className="mb-8 sm:mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-red" />
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Description
              </h1>
            </div>
            {/* <div className="w-20 h-1 bg-gradient-to-r from-red to-orange rounded-full mb-6" /> */}

            <div className="space-y-4">
              {vehicleDetails.descriptions.map((des: any, index: number) => (
                <p
                  className="text-gray-600 leading-relaxed text-sm sm:text-base"
                  key={index}
                >
                  {des}
                </p>
              ))}
            </div>
          </div>

          <MasonryImageGrid images={vehicleDetails.images} />

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 py-8">
            <div className="flex-1 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Facilities
                  </h3>
                </div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4" />

                <div className="bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-2xl p-5 sm:p-6 border border-green-100">
                  <ul className="space-y-3">
                    {vehicleDetails.facilities.map((point: any, i: number) => (
                      <li key={i} className="flex items-start gap-3 group">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl">
                    <XCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Not Included
                  </h3>
                </div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-4" />

                <div className="bg-gradient-to-br from-red-50 to-orange-50/50 rounded-2xl p-5 sm:p-6 border border-red-100">
                  <ul className="space-y-3">
                    {vehicleDetails.excludes.map((point: any, i: number) => (
                      <li key={i} className="flex items-start gap-3 group">
                        <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Terms & Conditions
                  </h3>
                </div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-4" />

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl p-5 sm:p-6 border border-blue-100">
                  <ul className="space-y-3">
                    {vehicleDetails.terms.map((term: any, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                          {term}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:w-96 lg:flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <div className="bg-gradient-to-br from-red to-orange rounded-2xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-3xl" />

                  <div className="relative z-10 space-y-6">
                    <div className="text-center pb-6 border-b border-white/20">
                      <p className="text-sm uppercase tracking-widest mb-2 text-white/80">
                        Starting From
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <DollarSign className="w-10 h-10" />
                        <span className="text-5xl sm:text-6xl font-bold">
                          {vehicleDetails.price}
                        </span>
                      </div>
                      <p className="text-sm text-white/80 mt-2">per day</p>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-white/80 uppercase">
                          Capacity
                        </p>
                        <p className="text-xl font-bold">
                          {vehicleDetails.passenger_capacity} People
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white/10 rounded-lg flex-shrink-0">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs text-white/80 uppercase mb-1">
                            Owner
                          </p>
                          <p className="text-base font-semibold">
                            {vehicleDetails.owner}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white/10 rounded-lg flex-shrink-0">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs text-white/80 uppercase mb-1">
                            Contact
                          </p>
                          <p className="text-base font-semibold">
                            {vehicleDetails.owner_contact}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white/10 rounded-lg flex-shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs text-white/80 uppercase mb-1">
                            Location
                          </p>
                          <p className="text-base font-semibold">
                            {vehicleDetails.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    <a
                      className="flex justify-center w-full py-4 bg-white text-red font-bold rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-lg cursor-pointer"
                      href={`tel:+${vehicleDetails.owner_contact}`}
                    >
                      Contact Owner
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default VehicleModel;
