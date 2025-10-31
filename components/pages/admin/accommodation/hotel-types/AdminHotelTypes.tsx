import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import DetailContainer from "@/components/containers/DetailContainer";
import { useGetAllHotelTypesQuery } from "@/services/hotelTypeApi";
import { BookText, Component } from "lucide-react";
import { deleteBtnColor, editBtnColor, viewBtnColor } from "@/styles/colors";
import { checkImageUrl } from "@/utils/common";
import HotelDetails from "./HotelDetails";

interface AdminHotelTypesProps {
  setDeleteHotelType: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedHotelType: React.Dispatch<React.SetStateAction<any | null>>;
  setShowHotelTypeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function AdminHotelTypes({
  setDeleteHotelType,
  setSelectedHotelType,
  setShowHotelTypeModal,
}: AdminHotelTypesProps) {
  const [show, setShow] = useState(false);
  const [hotelTypeURL, setHotelTypeURL] = useState<string | null>(null);
  const { data } = useGetAllHotelTypesQuery();
  const hotelTypes = Array.isArray(data?.data) ? data.data : [];
  return (
    <>
      <DetailContainer className="max-h-[calc(100vh-377px)] md:max-h-[calc(100vh-252px)]">
        {hotelTypes.map((item: any, index: number) => (
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
                <div className="flex flex-col gap-2">
                  <h3 className="text-md font-bold uppercase">{item.name}</h3>
                  <p className="flex text-sm gap-2 items-center">
                    <BookText width={16} />
                    {item.description}
                  </p>
                  <p className="flex text-sm gap-2 items-center">
                    <Component width={16} />
                    {item.hotelCount} Hotels
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  label="View Details"
                  className={`w-fit text-sm uppercase ${viewBtnColor}`}
                  onClick={() => {
                    setShow(true);
                    setHotelTypeURL(item.url_prefix);
                  }}
                />
                <Button
                  label="Edit"
                  className={`w-fit text-sm uppercase ${editBtnColor}`}
                  onClick={() => {
                    setShowHotelTypeModal(true);
                    setSelectedHotelType(item);
                  }}
                />
                <Button
                  label="Delete"
                  className={`w-fit text-sm uppercase ${deleteBtnColor}`}
                  onClick={() => {
                    setDeleteHotelType(true);
                    setSelectedHotelType(item);
                  }}
                />
              </div>
            </div>

            <div className="flex md:hidden w-full items-center justify-between px-4 py-2 gap-2 rounded-lg shadow-sm border border-gray-200">
              <div className="grid gap-6 w-full">
                <div className="flex flex-col gap-1 text-sm">
                  <h3 className="font-bold uppercase">{item.name}</h3>
                  <p className="flex text-sm gap-2 items-center">
                    <BookText width={16} />
                    {item.description}
                  </p>
                  <p className="flex text-sm gap-2 items-center">
                    <Component width={16} />
                    {item.hotelCount} Hotels
                  </p>
                </div>
                <div className="flex gap-4 justify-end">
                  <Button
                    label="View Details"
                    className={`w-fit ${viewBtnColor}`}
                    onClick={() => {
                      setShow(true);
                      setHotelTypeURL(item.url_prefix);
                    }}
                  />
                  <Button label="Edit" className={`w-fit ${editBtnColor}`} />
                  <Button
                    label="Delete"
                    className={`w-fit ${deleteBtnColor}`}
                    onClick={() => {
                      setDeleteHotelType(true);
                      setSelectedHotelType(item);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </DetailContainer>

      {show && hotelTypeURL && (
        <HotelDetails
          hotelURL={hotelTypeURL}
          onClose={() => {
            setShow(false);
            setHotelTypeURL(null);
          }}
        />
      )}
    </>
  );
}

export default AdminHotelTypes;
