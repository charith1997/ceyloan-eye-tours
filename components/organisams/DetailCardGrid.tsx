"use client";

import React, { useState, useEffect, useRef } from "react";
import DetailCard from "../molecules/DetailCard";
import { Hotel } from "lucide-react";

interface Data {
  title: string;
  images: any[];
  duration: string;
  price: string;
  url_prefix: string;
  rating: number;
}

interface DetailCardGridProps {
  data: Data[];
  children: (item: Data) => React.ReactNode;
}

export default function DetailCardGrid({
  data,
  children,
}: DetailCardGridProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
  }, [data]);

  const getAnimationClass = (index: number, isVisible: boolean) => {
    const patterns = [
      isVisible
        ? "opacity-100 translate-x-0 rotate-0 scale-100"
        : "opacity-0 -translate-x-16 -rotate-6 scale-90",
      isVisible
        ? "opacity-100 translate-x-0 rotate-0 scale-100"
        : "opacity-0 translate-x-16 rotate-6 scale-90",
      isVisible
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 translate-y-16 scale-95",
      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75",
      isVisible
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 -translate-y-16 scale-95",
      isVisible
        ? "opacity-100 translate-x-0 translate-y-0 scale-100"
        : "opacity-0 -translate-x-12 translate-y-12 scale-90",
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div className="px-0">
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 sm:py-24">
          <div className="text-center space-y-4">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 bg-gradient-to-br from-red/20 to-orange/20 rounded-full blur-xl" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
                <Hotel className="w-9 h-9 text-gray-400" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-700">
              Nothing found
            </h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-sm mx-auto leading-relaxed">
              We couldn't find any results matching your criteria. Try adjusting
              your filters.
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 py-4 sm:py-6">
          {data.map((item, index) => (
            <div
              key={index}
              ref={(el: any) => (cardRefs.current[index] = el)}
              className={`transition-all duration-700 ease-out ${getAnimationClass(index, visibleCards.has(index))}`}
              style={{ transitionDelay: `${(index % 3) * 120}ms` }}
            >
              <DetailCard
                {...item}
                imageUrl={item.images.length > 0 ? item.images[0] : null}
                title={item.title}
                price={item.price}
                slug={item.url_prefix}
              >
                {children(item)}
              </DetailCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
