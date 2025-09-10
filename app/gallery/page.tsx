"use client";

import React from "react";
import Jumbotron from "@/components/molecules/Jumbotron";
import PageDetails from "@/components/organisams/PageDetails";
import { useGetAllApprovedGalleryItemsQuery } from "@/services/galleryApi";
import Image from "next/image";

function GalleryPage() {
  const { data } = useGetAllApprovedGalleryItemsQuery();

  const galleryItems = Array.isArray(data?.data) ? data.data : [];

  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <Jumbotron
        title="Gallery"
        description="See our beautiful gallery of images."
        imageUrl="/round tours/round-tours_main.png"
      />
      <PageDetails
        title="Gallery"
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
      {galleryItems && galleryItems.length > 0 && (
        <div className="max-w-full">
          <MasonryImageGrid images={galleryItems} />
        </div>
      )}
    </section>
  );
}

export default GalleryPage;

function MasonryImageGrid({ images }: { images: any[] }) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-6 ">
      {images?.map((image, idx) => (
        <Image
          key={idx}
          src={image.image_url}
          alt={`Hotel Image ${idx + 1}`}
          className="w-full rounded-lg mb-4"
          width={300}
          height={200}
        />
      ))}
    </div>
  );
}
