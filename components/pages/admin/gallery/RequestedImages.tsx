import React, { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import DetailContainer from "@/components/containers/DetailContainer";
import { useLazyGetAllGalleryItemsPaginatedQuery } from "@/services/galleryApi";
import { Camera, Eye } from "lucide-react";
import Image from "next/image";
import { approveBtnColor, deleteBtnColor } from "@/styles/colors";
import { checkImageUrl } from "@/utils/common";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";

interface RequestedImagesProps {
  displayApproveModal: (id: string) => void;
  setViewImageUrl: (url: string | null) => void;
  displayDeleteModal: (id: string) => void;
  setSearchData: React.Dispatch<React.SetStateAction<any[]>>;
  setSearchKeys: React.Dispatch<React.SetStateAction<string[]>>;
  filteredData: any[];
}

function RequestedImages({
  displayApproveModal,
  setViewImageUrl,
  displayDeleteModal,
  setSearchData,
  setSearchKeys,
  filteredData,
}: RequestedImagesProps) {
  const [list, setList] = useState<any[]>([]);
  const [requestedImages, setRequestedImages] = useState<any[]>([]);
  const [getAllGalleryItemsPaginated] =
    useLazyGetAllGalleryItemsPaginatedQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);

  const dispatch = useDispatch();

  const getAllCategories = async () => {
    const { data } = await getAllGalleryItemsPaginated({
      page: currentPage,
      size: 10,
    });
    if (data.success) {
      setList(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getAllCategories();
    }
  }, [currentPage]);

  useEffect(() => {
    if (list) {
      const requestedGalleryItems = list.filter(
        (item: any) => item.is_approved === false
      );
      setRequestedImages([...requestedGalleryItems]);
    }
  }, [list]);

  // Update parent with requested items and search keys
  useEffect(() => {
    setSearchData(requestedImages);
    setSearchKeys(["User.name"]);
  }, [requestedImages.length, setSearchData, setSearchKeys]);

  console.log("filteredData", filteredData);

  return (
    <DetailContainer className="max-h-[calc(100vh-440px)] md:max-h-[calc(100vh-325px)]">
      {filteredData.map((item: any, index: number) => (
        <div key={index}>
          <div className="hidden md:flex w-full items-center justify-between p-2 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-8">
              <Image
                src={checkImageUrl(item.image_url)}
                alt={`Gallery ${item.id}`}
                width={120}
                height={100}
                className="object-cover rounded-lg w-28 h-28"
              />
              <span className="flex text-sm gap-2 items-center">
                <Camera width={16} /> {`Captured By : ${item.User.name}`}
              </span>
            </div>

            <div className="flex gap-4 items-center">
              <Eye
                color="orange"
                className="cursor-pointer"
                onClick={() => setViewImageUrl(item.image_url)}
              />
              <Button
                label="Approve"
                className={`w-fit text-sm uppercase ${approveBtnColor}`}
                onClick={() => {
                  displayApproveModal(item.id);
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
                  label="Approve"
                  className={`w-fit ${approveBtnColor}`}
                  onClick={() => {
                    displayApproveModal(item.id);
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

export default RequestedImages;
