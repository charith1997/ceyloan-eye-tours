"use client";

import React, { useEffect, useState } from "react";
import Jumbotron from "@/components/molecules/Jumbotron";
import { useLazyGetAllApprovedGalleryItemsPaginatedQuery } from "@/services/galleryApi";
import Image from "next/image";
import { checkImageUrl } from "@/utils/common";
import PageRouting from "@/components/molecules/PageRouting";
import Button from "@/components/atoms/Button";
import { PAGE_DESCRIPTION, PAGE_TITLE } from "@/styles/font";
import { addBtnColor } from "@/styles/colors";
import AddImage from "./AddImage";
import { isAuthenticated } from "@/utils/auth";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";
import PageContainer from "@/components/containers/PageContainer";

function GalleryPage() {
  const [addImage, setAddImage] = useState(false);
  const isAuth = isAuthenticated();

  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [getAlImages] = useLazyGetAllApprovedGalleryItemsPaginatedQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);

  const dispatch = useDispatch();

  const getAllReviews = async () => {
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
      getAllReviews();
    }
  }, [currentPage]);

  return (
    <PageContainer isDisplayPlan={false}>
      <Jumbotron
        title="Travelers' Photo Memories"
        description="Browse stunning photographs captured by fellow travelers exploring Sri Lanka's beauty and culture."
        imageUrl="/hero images/gallery.jpeg"
      />
      <div className="py-12">
        <PageRouting />
        <div className="flex flex-col gap-4 md:gap-6 mb-4">
          <div className="flex justify-between items-center">
            <h1 className={PAGE_TITLE}>Gallery</h1>
            {isAuth && (
              <Button
                onClick={() => setAddImage(true)}
                label="Add Yours"
                className={`flex items-center gap-2 uppercase cursor-pointer ${addBtnColor}`}
              />
            )}
          </div>
          <p className={PAGE_DESCRIPTION}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
      {galleryItems && galleryItems.length > 0 && (
        <div className="max-w-full">
          <MasonryImageGrid images={galleryItems} />
        </div>
      )}

      <AddImage onClose={() => setAddImage(false)} show={addImage} />
    </PageContainer>
  );
}

export default GalleryPage;

function MasonryImageGrid({ images }: { images: any[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
      {images?.map((image, idx) => (
        <Image
          key={idx}
          src={checkImageUrl(image.image_url)}
          alt={`Gallery image ${idx + 1}`}
          className="w-full h-32 md:h-64 rounded-lg mb-4 object-cover"
          width={300}
          height={200}
        />
      ))}
    </div>
  );
}
