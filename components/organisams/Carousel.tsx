import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useGetAllPackagesQuery } from "@/services/packageApi";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const { data } = useGetAllPackagesQuery();
  const slides = Array.isArray(data?.data) ? data.data : [];

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlay, slides.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const getVisibleSlides = () => {
    const visibleSlides = [];
    for (let i = -1; i <= 1; i++) {
      let slideIndex = currentIndex + i;
      if (slideIndex < 0) slideIndex = slides.length - 1;
      if (slideIndex >= slides.length) slideIndex = 0;
      visibleSlides.push({ ...slides[slideIndex], position: i });
    }
    return visibleSlides;
  };

  console.log("currentIndex", currentIndex);

  return (
    <div
      ref={carouselRef}
      className="relative w-full bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {slides.length > 0 && (
        <div className="block md:hidden">
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <Image
              // src={slides[currentIndex].Images[0]}
              src="/family tours/Mini adventure.jpg"
              alt={slides[currentIndex]?.title}
              className="w-full h-full object-cover"
              width={500}
              height={300}
            />
            <div className="absolute inset-0 bg-black/30 flex items-end">
              <div className="p-4 text-white w-full">
                <h3 className="text-2xl font-bold">
                  {slides[currentIndex]?.title}
                </h3>
                <p className="text-gray-200 leading-relaxed mb-3">
                  {/* {slides[currentIndex].description[0]} */}
                  Sample Description
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {slides.length > 0 && (
        <div className="hidden md:block">
          <div className="relative h-80 lg:h-96 flex items-center justify-center px-2 lg:px-4">
            <div className="flex items-center space-x-2 lg:space-x-4 w-full max-w-6xl">
              {getVisibleSlides().map((slide, index) => {
                const isCenter = slide.position === 0;
                const isLeft = slide.position === -1;
                const isRight = slide.position === 1;

                return (
                  <div
                    key={`${slide.id}-${slide.position}`}
                    className={`relative transition-all duration-500 cursor-pointer ${
                      isCenter
                        ? "flex-1 z-20 scale-100"
                        : "w-1/4 lg:w-1/3 z-10 scale-75 opacity-50 hover:opacity-80"
                    }`}
                    onClick={() => {
                      if (isLeft) goToPrevious();
                      if (isRight) goToNext();
                    }}
                  >
                    <div className="relative h-64 lg:h-80 overflow-hidden rounded-lg">
                      <Image
                        // src={slide.Images[0]}
                        src="/family tours/Mini adventure.jpg"
                        alt={slide?.title}
                        className="w-full h-full object-cover"
                        width={500}
                        height={300}
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-end justify-center">
                        <div
                          className={`p-3 lg:p-4 text-white ${
                            isCenter ? "block" : "hidden"
                          }`}
                        >
                          <h3 className="text-lg lg:text-2xl font-bold mb-2">
                            {slide?.title}
                          </h3>
                          <p className=" text-md leading-relaxed">
                            {/* {slide.description[0]} */}
                            Sample Description
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Navigation arrows - Hidden on mobile, shown on tablet+ */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 lg:p-3 shadow-lg transition-all duration-200 hover:scale-110 z-30 hidden sm:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 lg:w-6 lg:h-6 text-gray-800" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 lg:p-3 shadow-lg transition-all duration-200 hover:scale-110 z-30 hidden sm:block"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 lg:w-6 lg:h-6 text-gray-800" />
      </button>

      <div className="absolute bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_: any, index: number) => (
          <button
            key={index}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/60 hover:bg-white/80"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-black/70 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm z-30">
        {currentIndex + 1} / {slides.length}
      </div>

      {/* <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/80 text-xs z-30 block md:hidden">
        Swipe to navigate
      </div> */}
    </div>
  );
};

export default Carousel;
