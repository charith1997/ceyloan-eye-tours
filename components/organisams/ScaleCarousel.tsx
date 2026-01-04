"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface ScaleOpacityCarouselProps<T> {
  data: T[];
  renderSlide: (item: T, index: number, isCentered: boolean) => React.ReactNode;
  className?: string;
  slideClassName?: string;
}

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

export default function ScaleOpacityCarousel<T>({
  data,
  renderSlide,
  className = "",
  slideClassName = "",
}: ScaleOpacityCarouselProps<T>) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [tweenValues, setTweenValues] = useState<number[]>([]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = emblaApi.scrollSnapList().length > 0;

    const styles = emblaApi.scrollSnapList().map((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnaps = engine.slideRegistry[snapIndex];

      slidesInSnaps.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }
      });

      const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR_BASE);
      return numberWithinRange(tweenValue, 0, 1);
    });

    setTweenValues(styles);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll();
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onScroll);

    return () => {
      emblaApi.off("scroll", onScroll);
      emblaApi.off("reInit", onScroll);
    };
  }, [emblaApi, onScroll]);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        No items to display
      </div>
    );
  }

  // Find the index with the highest tween value (the centered slide)
  const centeredIndex = tweenValues.reduce(
    (maxIndex, value, index, array) =>
      value > array[maxIndex] ? index : maxIndex,
    0
  );

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom -ml-4">
          {data.map((item, index) => {
            const tweenValue = tweenValues[index] || 0;
            const isCentered = index === centeredIndex && tweenValue > 0.9;

            return (
              <div
                key={index}
                className={`flex-[0_0_50%] min-w-0 pl-4 ${slideClassName}`}
              >
                <div
                  style={{
                    transform: `scale(${tweenValue})`,
                    opacity: tweenValue,
                  }}
                >
                  {renderSlide(item, index, isCentered)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 z-10 hover:scale-110"
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
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 z-10 hover:scale-110"
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
