"use client";

import { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

interface AutoScrollCarouselProps<T> {
  data: T[];
  renderSlide: (item: T, index: number) => React.ReactNode;
  speed?: number;
  stopOnInteraction?: boolean;
  className?: string;
  slideClassName?: string;
  loop?: boolean;
}

export default function AutoScrollCarousel<T>({
  data,
  renderSlide,
  speed = 1,
  stopOnInteraction = true,
  className = "",
  slideClassName = "",
  loop = true,
}: AutoScrollCarouselProps<T>) {
  const autoScrollRef = useRef(
    AutoScroll({
      speed,
      stopOnInteraction,
      stopOnMouseEnter: true,
      startDelay: 0,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      align: "start",
      skipSnaps: false,
      direction: "ltr",
    },
    [autoScrollRef.current]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      // Play auto-scroll immediately when component mounts or data changes
      const autoScroll = autoScrollRef.current;
      if (autoScroll && typeof autoScroll.play === "function") {
        autoScroll.play();
      }
    }
  }, [emblaApi, data]);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        No items to display
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {data.map((item, index) => (
            <div
              key={index}
              className={`flex-[0_0_100%] md:flex-[0_0_33.333%] min-w-0 ${slideClassName}`}
            >
              {renderSlide(item, index)}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-10"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 z-10"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
