import React, { useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import DetailContainer from "@/components/containers/DetailContainer";
import { useLazyGetAllGalleryItemsPaginatedQuery } from "@/services/galleryApi";
import { Camera, Eye } from "lucide-react";
import Image from "next/image";
import { cancelBtnColor, deleteBtnColor } from "@/styles/colors";
import { checkImageUrl } from "@/utils/common";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setCurrentPage, setTotalPages } from "@/features/paginatorSlice";

interface ApprovedImagesProps {
  setViewImageUrl: (url: string | null) => void;
  displayCancelModal: (id: string) => void;
  displayDeleteModal: (id: string) => void;
}

function ApprovedImages({
  setViewImageUrl,
  displayCancelModal,
  displayDeleteModal,
}: ApprovedImagesProps) {
  const [approvedImages, setApprovedImages] = useState<any[]>([]);
  const [getAllGalleryItemsPaginated] =
    useLazyGetAllGalleryItemsPaginatedQuery();
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.paginator
  );
  const dispatch = useDispatch();

  const getAllGalleryItems = async () => {
    const params: any = {
      page: currentPage,
      size: 10,
      isApproved: true,
    };

    const { data } = await getAllGalleryItemsPaginated(params);

    if (data?.success) {
      setApprovedImages(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getAllGalleryItems();
    }
  }, [currentPage]);

  useEffect(() => {
    if (totalPages) {
      if (currentPage > totalPages) {
        dispatch(setCurrentPage(1));
      }
    }
  }, [totalPages]);

  return (
    <DetailContainer className="max-h-[calc(100vh-440px)] md:max-h-[calc(100vh-325px)]">
      {approvedImages.map((item: any, index: number) => (
        <div key={index}>
          <div className="hidden md:flex w-full items-center justify-between p-2 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-8">
              <Image
                src={checkImageUrl(item.image_url)}
                alt={`Tour ${item.id}`}
                width={120}
                height={100}
                className="object-cover rounded-lg w-28 h-28"
              />
              <span className="flex text-sm gap-2 items-center">
                <Camera width={16} /> {`Uploaded By : ${item.User.name}`}
              </span>
            </div>

            <div className="flex gap-4 items-center">
              <Eye
                color="orange"
                className="cursor-pointer"
                onClick={() => setViewImageUrl(item.image_url)}
              />
              <Button
                label="Cancel"
                className={`w-fit text-sm uppercase ${cancelBtnColor}`}
                onClick={() => {
                  displayCancelModal(item.id);
                }}
              />
              <Button
                label="Delete"
                className={`w-fit text-sm uppercase ${deleteBtnColor}`}
                onClick={() => {
                  displayDeleteModal(item.id);
                }}
              />
            </div>
          </div>

          <div className="flex md:hidden w-full items-center justify-between p-2 gap-2 rounded-lg shadow-sm border border-gray-200">
            <Image
              src={checkImageUrl(item.image_url)}
              alt={`Tour ${item.id}`}
              width={160}
              height={160}
              className="object-cover rounded-lg w-36 h-36"
            />
            <div className="grid gap-2">
              <span className="flex gap-1 items-center">
                <Camera width={16} /> {item.User.name}
              </span>
              <Eye
                color="orange"
                className="cursor-pointer"
                onClick={() => setViewImageUrl(item.image_url)}
              />
              <div className="flex gap-2 items-center">
                <Button
                  label="Cancel"
                  className={`w-fit ${cancelBtnColor}`}
                  onClick={() => {
                    displayCancelModal(item.id);
                  }}
                />
                <Button
                  label="Delete"
                  className={`w-fit ${deleteBtnColor}`}
                  onClick={() => {
                    displayDeleteModal(item.id);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </DetailContainer>
  );
}

export default ApprovedImages;
