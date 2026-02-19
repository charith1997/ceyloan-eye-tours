"use client";

import React, { useEffect, useState, useRef } from "react";
import Jumbotron from "@/components/molecules/Jumbotron";
import { useLazyGetAllApprovedGalleryItemsPaginatedQuery } from "@/services/galleryApi";
import Image from "next/image";
import { checkImageUrl } from "@/utils/common";
import PageRouting from "@/components/molecules/PageRouting";
import Button from "@/components/atoms/Button";
import { isAuthenticated } from "@/utils/auth";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";
import PageContainer from "@/components/containers/PageContainer";
import AddImage from "./AddImage";
import { Camera, Plus, Image as ImageIcon } from "lucide-react";

function GalleryPage() {
  const [addImage, setAddImage] = useState(false);
  const isAuth = isAuthenticated();
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [getAlImages] = useLazyGetAllApprovedGalleryItemsPaginatedQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dispatch = useDispatch();

  const getAllGalleryItems = async () => {
    const { data } = await getAlImages({
      page: currentPage,
      size: 9,
    });
    if (data.success) {
      setGalleryItems(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getAllGalleryItems();
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
  }, [galleryItems]);

  const getAnimationClass = (index: number, isVisible: boolean) => {
    const patterns = [
      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
      isVisible ? "opacity-100 rotate-0" : "opacity-0 -rotate-3",
    ];
    return patterns[index % patterns.length];
  };

  return (
    <PageContainer isDisplayPlan={false}>
      <Jumbotron
        title="Travelers' Photo Memories"
        description="Browse stunning photographs captured by fellow travelers exploring Sri Lanka's beauty and culture."
        imageUrl="/hero images/gallery.jpeg"
      />

      <div className="py-8 sm:py-10 md:py-12">
        <PageRouting />

        <div className="flex flex-col gap-4 md:gap-6 mt-4 mb-8">
          <div className="flex justify-between items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Camera className="w-6 h-6 sm:w-7 sm:h-7 text-[#cd1a40]" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Gallery
                </h1>
              </div>
            </div>

            {isAuth && (
              <Button
                onClick={() => setAddImage(true)}
                label={
                  <span className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Yours
                  </span>
                }
                className="px-5 py-2.5 bg-gradient-to-r from-[#cd1a40] to-[#ff803c] text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 uppercase text-sm"
              />
            )}
          </div>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base max-w-4xl">
            Step into a visual journey through the eyes of travelers who have
            explored the wonders of Sri Lanka. Our gallery is a curated
            collection of breathtaking photographs that capture the island's
            diverse landscapes, vibrant culture, and unforgettable moments. From
            golden sunsets on southern beaches and misty mornings in tea country
            to lively local festivals and ancient architectural marvels, each
            image tells a story of adventure and discovery. This gallery is
            designed to inspire your next trip and give you a genuine glimpse
            into the experiences that await. Browse, imagine, and start planning
            your own picture-perfect memories in Sri Lanka.
          </p>
        </div>
      </div>

      {galleryItems && galleryItems.length > 0 ? (
        <div className="max-w-full pb-4">
          <MasonryImageGrid
            images={galleryItems}
            visibleCards={visibleCards}
            cardRefs={cardRefs}
            getAnimationClass={getAnimationClass}
          />
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 sm:py-24 pb-8">
          <div className="text-center space-y-4">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 bg-gradient-to-br from-[#cd1a40]/20 to-[#ff803c]/20 rounded-full blur-xl" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
                <ImageIcon className="w-9 h-9 text-gray-400" />
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-700">
              No photos yet
            </h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-sm mx-auto leading-relaxed">
              {isAuth
                ? "Be the first to share your travel memories!"
                : "Check back soon for amazing travel photos."}
            </p>

            {isAuth && (
              <Button
                onClick={() => setAddImage(true)}
                label={
                  <span className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Upload Photo
                  </span>
                }
                className="mt-4 px-6 py-3 bg-gradient-to-r from-[#cd1a40] to-[#ff803c] text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
              />
            )}
          </div>
        </div>
      )}

      <AddImage onClose={() => setAddImage(false)} show={addImage} />
    </PageContainer>
  );
}

export default GalleryPage;

function MasonryImageGrid({
  images,
  visibleCards,
  cardRefs,
  getAnimationClass,
}: {
  images: any[];
  visibleCards: Set<number>;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  getAnimationClass: (index: number, isVisible: boolean) => string;
}) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      {images?.map((image, idx) => (
        <div
          key={idx}
          ref={(el: any) => (cardRefs.current[idx] = el)}
          className={`relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 ${getAnimationClass(
            idx,
            visibleCards.has(idx),
          )}`}
          style={{
            transitionDelay: `${(idx % 4) * 80}ms`,
          }}
        >
          {/* Loading skeleton */}
          {!loadedImages.has(idx) && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          )}

          {/* Image */}
          <Image
            src={checkImageUrl(image.image_url)}
            alt={`Gallery image ${idx + 1}`}
            className={`w-full h-48 sm:h-56 md:h-64 rounded-xl object-cover transition-all duration-700 ${
              loadedImages.has(idx) ? "opacity-100" : "opacity-0"
            } group-hover:scale-110`}
            width={300}
            height={200}
            onLoad={() => setLoadedImages((prev) => new Set(prev).add(idx))}
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl flex items-end p-4">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-semibold">
                Photo {idx + 1}
              </span>
            </div>
          </div>

          {/* Border highlight */}
          <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
