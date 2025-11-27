import React, { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import DetailContainer from "@/components/containers/DetailContainer";
import { useGetAllGalleryItemsQuery } from "@/services/galleryApi";
import { Camera, Eye } from "lucide-react";
import Image from "next/image";
import { approveBtnColor, deleteBtnColor } from "@/styles/colors";
import { checkImageUrl } from "@/utils/common";

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
  const { data, error } = useGetAllGalleryItemsQuery();
  const list = Array.isArray(data?.data) ? data.data : [];
  let requestedGalleryItems = [];
  if (list) {
    requestedGalleryItems = list.filter(
      (item: any) => item.is_approved === false
    );
  }

  // Update parent with requested items and search keys
  useEffect(() => {
    setSearchData(requestedGalleryItems);
    setSearchKeys(["User.name"]);
  }, [requestedGalleryItems.length, setSearchData, setSearchKeys]);

  return (
    <DetailContainer className="max-h-[calc(100vh-369px)] md:max-h-[calc(100vh-252px)]">
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
              <div className="flex gap-4 items-center">
                <Eye
                  color="orange"
                  className="cursor-pointer"
                  onClick={() => setViewImageUrl(item.image_url)}
                />
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
