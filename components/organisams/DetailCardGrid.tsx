"use client";

import React, { useState, useEffect, useRef } from "react";
import DetailCard from "../molecules/DetailCard";

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
        {
          threshold: 0.1,
          rootMargin: "50px",
        },
      );

      observer.observe(cardRef);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [data]);

  // Different animation patterns for variety
  const getAnimationClass = (index: number, isVisible: boolean) => {
    const patterns = [
      // Pattern 0: Slide from left with rotation
      isVisible
        ? "opacity-100 translate-x-0 rotate-0 scale-100"
        : "opacity-0 -translate-x-16 -rotate-6 scale-90",
      // Pattern 1: Slide from right with rotation
      isVisible
        ? "opacity-100 translate-x-0 rotate-0 scale-100"
        : "opacity-0 translate-x-16 rotate-6 scale-90",
      // Pattern 2: Slide from bottom with bounce
      isVisible
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 translate-y-16 scale-95",
      // Pattern 3: Zoom in from center
      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75",
      // Pattern 4: Slide from top
      isVisible
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 -translate-y-16 scale-95",
      // Pattern 5: Diagonal slide (bottom-left to top-right)
      isVisible
        ? "opacity-100 translate-x-0 translate-y-0 scale-100"
        : "opacity-0 -translate-x-12 translate-y-12 scale-90",
    ];

    return patterns[index % patterns.length];
  };

  return (
    <div className="px-2 sm:px-0">
      {/* Empty State */}
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 sm:py-24">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-700">
              No tours found
            </h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-md">
              We couldn't find any tours matching your criteria. Try adjusting
              your filters.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 py-4 sm:py-6">
          {data?.map((item, index) => (
            <div
              key={index}
              ref={(el: any) => (cardRefs.current[index] = el)}
              className={`transition-all duration-700 ease-out ${getAnimationClass(
                index,
                visibleCards.has(index),
              )}`}
              style={{
                transitionDelay: `${(index % 3) * 120}ms`,
              }}
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
