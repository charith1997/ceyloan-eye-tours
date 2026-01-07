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
        {
          threshold: 0.1,
          rootMargin: "50px",
        }
      );

      observer.observe(cardRef);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [vehicles]);

  // Different animation patterns for variety
  const getAnimationClass = (index: number, isVisible: boolean) => {
    const patterns = [
      // Pattern 0: Slide from left
      isVisible
        ? "opacity-100 translate-x-0 scale-100"
        : "opacity-0 -translate-x-16 scale-95",
      // Pattern 1: Slide from right
      isVisible
        ? "opacity-100 translate-x-0 scale-100"
        : "opacity-0 translate-x-16 scale-95",
      // Pattern 2: Slide from bottom
      isVisible
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 translate-y-16 scale-95",
      // Pattern 3: Zoom in
      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-85",
    ];

    return patterns[index % patterns.length];
  };

  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <Jumbotron
        title={
          <span className="capitalize">{segments[segments.length - 1]}</span>
        }
        description="Find the perfect vehicle for your journey."
        imageUrl="/rent/Rent Vehicle.jpg"
      />
      <PageDetails
        title={segments[segments.length - 1]}
        description="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-4">
        {vehicles.length > 0
          ? vehicles.map((vehicle: any, index: number) => (
              <div
                key={vehicle.id}
                ref={(el: any) => (cardRefs.current[index] = el)}
                className={`transition-all duration-700 ease-out ${getAnimationClass(
                  index,
                  visibleCards.has(index)
                )}`}
                style={{
                  transitionDelay: `${(index % 2) * 120}ms`,
                }}
              >
                <VehicleType {...vehicle} />
              </div>
            ))
          : null}
      </div>
      <div className="mt-12 flex justify-center">
        <Paginator />
      </div>
    </section>
  );
}

export default RentVehicle;
