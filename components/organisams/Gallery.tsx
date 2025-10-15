import { checkImageUrl } from "@/utils/common";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Button from "../atoms/Button";
import { ChevronLeft, ChevronRight, XIcon } from "lucide-react";

interface GalleryImage {
  src: string;
  alt?: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images = [] }: GalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    function onKey(e: any) {
      if (!isOpen) return;
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
      if (e.key === "ArrowLeft")
        setCurrent((c) => (c - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, images.length]);

  if (!images.length) {
    return (
      <div className="flex items-center justify-center p-6 border border-dashed rounded-lg text-gray-500">
        No images to display
      </div>
    );
  }

  const gridCols = () => {
    if (images.length === 1) return "grid-cols-1";
    if (images.length === 2) return "grid-cols-2";
    if (images.length === 3) return "grid-cols-3 gap-2";
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  };

  const openAt = (index: number) => {
    setCurrent(index);
    setIsOpen(true);
  };

  return (
    <div className="px-2">
      <div className={`grid ${gridCols()} gap-2`}>
        {images.map((img: any, i) => {
          const isBigFirst = i === 0 && images.length >= 4;
          const tileClass = isBigFirst
            ? "relative overflow-hidden rounded-lg col-span-2 row-span-2 h-64 md:h-72"
            : "relative overflow-hidden rounded-lg h-40 md:h-48";

          return (
            <button
              key={i}
              onClick={() => openAt(i)}
              className={`${tileClass} focus:outline-none focus:ring-4 focus:ring-indigo-300`}
              aria-label={`Open image ${i + 1} of ${images.length}`}
            >
              <Image
                src={checkImageUrl(img.src)}
                alt={img.alt || `Image ${i + 1}`}
                className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
                loading="lazy"
                width={250}
                height={250}
              />

              {i === images.length - 1 && images.length > 8 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg font-semibold">
                  +{images.length - 8}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative max-w-4xl w-full mx-auto bg-transparent">
            <Button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 z-20 rounded-lg p-1 bg-white/90 shadow focus:outline-none"
              aria-label="Close"
              label={<XIcon />}
            />

            <div className="flex items-center justify-between">
              <Button
                onClick={() =>
                  setCurrent((c) => (c - 1 + images.length) % images.length)
                }
                className="p-2 rounded-full bg-white/90 shadow focus:outline-none mx-2"
                aria-label="Previous image"
                label={<ChevronLeft />}
              />

              <div className="relative w-full">
                <Image
                  src={checkImageUrl(images[current].src)}
                  alt={images[current].alt || `Image ${current + 1}`}
                  className="mx-auto h-80 max-h-80 object-contain rounded"
                  width={250}
                  height={250}
                />
              </div>

              <Button
                onClick={() => setCurrent((c) => (c + 1) % images.length)}
                className="p-2 rounded-full bg-white/90 shadow focus:outline-none mx-2"
                aria-label="Next image"
                label={<ChevronRight />}
              />
            </div>

            {/* thumbnails */}
            <div className="mt-3 flex items-center justify-center gap-2 overflow-x-auto">
              {images.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`rounded overflow-hidden border-2 ${
                    idx === current ? "border-indigo-400" : "border-transparent"
                  }`}
                  aria-label={`Thumbnail ${idx + 1}`}
                >
                  <Image
                    src={checkImageUrl(t.src)}
                    alt={t.alt || `Thumb ${idx + 1}`}
                    className="h-14 w-20 object-cover"
                    width={100}
                    height={100}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
