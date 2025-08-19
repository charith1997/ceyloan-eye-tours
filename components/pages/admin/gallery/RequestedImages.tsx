import React from "react";
import Button from "@/components/atoms/Button";
import DetailContainer from "@/components/containers/DetailContainer";
import { useGetAllGalleryItemsQuery } from "@/services/galleryApi";
import { Camera, Eye } from "lucide-react";
import Image from "next/image";

interface RequestedImagesProps {
  displayApproveModal: (id: string) => void;
}

function RequestedImages({ displayApproveModal }: RequestedImagesProps) {
  const { data, error, isLoading } = useGetAllGalleryItemsQuery();
  const list = Array.isArray(data?.data) ? data.data : [];
  let requestedGalleryItems = [];
  if (list) {
    requestedGalleryItems = list.filter(
      (item: any) => item.is_approved === false
    );
  }

  return (
    <DetailContainer>
      {requestedGalleryItems.map((item: any, index: number) => (
        <div key={index}>
          <div className="hidden md:flex w-full items-center justify-between p-2 border-2 rounded-lg border-orange">
            <div className="flex items-center gap-8">
              <Image
                src={item.image_url}
                alt={`Gallery ${item.id}`}
                width={120}
                height={100}
                className="object-cover rounded-lg w-28 h-28"
              />
              <span className="flex text-sm gap-2 items-center">
                <Camera width={16} /> {`Captured By : ${item.customer_id}`}
              </span>
            </div>

            <div className="flex gap-4 items-center">
              <Eye color="orange" className="cursor-pointer" />
              <Button
                label="Approve"
                className="w-20 p-2 rounded-md text-white bg-[#4CAF50] text-sm uppercase"
                onClick={() => {
                  displayApproveModal(item.id);
                }}
              />
              <Button
                label="Cancel"
                className="w-20 p-2 rounded-md text-white bg-red text-sm uppercase"
              />
            </div>
          </div>

          <div className="flex md:hidden w-full items-center justify-between p-2 border-2 rounded-lg border-orange gap-2">
            <Image
              src={item.image_url}
              alt={`Tour ${item.id}`}
              width={160}
              height={160}
              className="object-cover rounded-lg w-36 h-36"
            />
            <div className="grid gap-2">
              <span className="flex gap-1 items-center">
                <Camera width={16} /> {item.customer_id}
              </span>
              <div className="flex gap-4 items-center">
                <Eye color="orange" className="cursor-pointer" />
                <Button
                  label="Approve"
                  className="w-20 p-2 rounded-md text-white bg-[#4CAF50] text-sm uppercase"
                  onClick={() => {
                    displayApproveModal(item.id);
                  }}
                />
                <Button
                  label="Cancel"
                  className="w-20 p-2 rounded-md text-white bg-red text-sm uppercase"
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
