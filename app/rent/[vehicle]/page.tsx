"use client";

import React, { useEffect, useState, useRef } from "react";
import VehicleType from "./VehicleType";
import Jumbotron from "@/components/molecules/Jumbotron";
import PageDetails from "@/components/organisams/PageDetails";
import { useLazyGetAllVehiclesPaginatedQuery } from "@/services/vehicleApi";
import { usePathname } from "next/navigation";
import Paginator from "@/components/organisams/Paginator";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";
import { Car } from "lucide-react";

interface VehicleTypeProps {
  name: string;
  price: number;
  passenger_capacity: number;
  owner: string;
  owner_contact: string;
  images: string[];
  url_prefix: string;
}

function RentVehicle() {
  const [vehicles, setVehicles] = useState<VehicleTypeProps[]>([]);
  const [getAllVehiclesPaginated] = useLazyGetAllVehiclesPaginatedQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const dispatch = useDispatch();
  const vehicleType = segments[segments.length - 1];

  const getAllVehicles = async () => {
    const { data } = await getAllVehiclesPaginated({
      page: currentPage,
      size: 10,
    });
    if (data.success) {
      setVehicles(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getAllVehicles();
    }
  }, [currentPage]);

  useEffect(() => {
    const observers = cardRefs.current.map((cardRef, index) => {
      if (!cardRef) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set(prev).add(index));
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "50px" },
      );

      observer.observe(cardRef);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [vehicles]);

  const getAnimationClass = (index: number, isVisible: boolean) => {
    const patterns = [
      isVisible
        ? "opacity-100 translate-x-0 scale-100"
        : "opacity-0 -translate-x-16 scale-95",
      isVisible
        ? "opacity-100 translate-x-0 scale-100"
        : "opacity-0 translate-x-16 scale-95",
      isVisible
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 translate-y-16 scale-95",
      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-85",
    ];
    return patterns[index % patterns.length];
  };

  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <Jumbotron
        title={<span className="capitalize">{vehicleType}s</span>}
        description="Find the perfect vehicle for your journey."
        imageUrl="/rent/Rent Vehicle.jpg"
      />

      <PageDetails
        title={`Available ${vehicleType}s`}
        description="Explore our fleet of well-maintained vehicles designed for comfort and safety. Each vehicle comes with an experienced driver and flexible rental packages to suit your travel needs. Whether you're planning a short trip or an extended journey, we have the perfect vehicle for you."
      />

      <div className="pb-4">
        {vehicles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {vehicles.map((vehicle: any, index: number) => (
                <div
                  key={vehicle.id}
                  ref={(el: any) => (cardRefs.current[index] = el)}
                  className={`transition-all duration-700 ease-out ${getAnimationClass(
                    index,
                    visibleCards.has(index),
                  )}`}
                  style={{
                    transitionDelay: `${(index % 2) * 120}ms`,
                  }}
                >
                  <VehicleType {...vehicle} />
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Paginator />
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-br from-red/20 to-orange/20 rounded-full blur-xl" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
                  <Car className="w-9 h-9 text-gray-400" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-gray-700">
                No vehicles available
              </h3>
              <p className="text-sm sm:text-base text-gray-500 max-w-sm mx-auto leading-relaxed">
                We don't have any {vehicleType}s available at the moment. Please
                check back later or contact us for more information.
              </p>

              <div className="flex justify-center gap-2 pt-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-red to-orange animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default RentVehicle;
