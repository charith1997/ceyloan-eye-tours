import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import DetailContainer from "@/components/containers/DetailContainer";
import { useGetAllHotelsQuery } from "@/services/hotelApi";
import { MapPin, Star } from "lucide-react";
import { deleteBtnColor, editBtnColor, viewBtnColor } from "@/styles/colors";
import HotelDetails from "./HotelDetails";
import { checkImageUrl } from "@/utils/common";

interface AdminHotelProps {
  setDeleteHotel: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedHotel: React.Dispatch<React.SetStateAction<string | null>>;
  setIsEdit: () => void;
}

function AdminHotels({
  setDeleteHotel,
  setSelectedHotel,
  setIsEdit,
}: AdminHotelProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [hotelDetails, setHotelDetails] = useState<any | null>(null);
  const { data } = useGetAllHotelsQuery();
  const hotels = Array.isArray(data?.data) ? data.data : [];

  return (
    <>
      <DetailContainer className="max-h-[calc(100vh-377px)] md:max-h-[calc(100vh-252px)]">
        {hotels.map((item: any, index: number) => (
          <div key={index}>
            <div className="hidden md:flex w-full items-center justify-between p-2 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-8">
                <Image
                  src={
                    item.images.length > 0
                      ? checkImageUrl(item?.images[0])
                      : "/default-image.jpg"
                  }
                  alt={`Tour ${item.id}`}
                  width={120}
                  height={100}
                  className="object-cover rounded-lg w-28 h-28"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-md font-bold uppercase">{item.name}</h3>
                  <p className="flex text-sm gap-2 items-center">
                    <MapPin width={16} />
                    {item.Place.name}
                  </p>
                  {item.rating > 0 ? (
                    <div className="flex text-yellow-500">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          fill="currentColor"
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  label="View Details"
                  className={`w-fit text-sm uppercase ${viewBtnColor}`}
                  onClick={() => {
                    setShowDetails(true);
                    setHotelDetails(item);
                  }}
                />
                <Button
                  label="Edit"
                  className={`w-fit text-sm uppercase ${editBtnColor}`}
                  onClick={() => {
                    setIsEdit();
                    setSelectedHotel(item);
                  }}
                />
                <Button
                  label="Delete"
                  className={`w-fit text-sm uppercase ${deleteBtnColor}`}
                  onClick={() => {
                    setDeleteHotel(true);
                    setSelectedHotel(item);
                  }}
                />
              </div>
            </div>

            <div className="flex md:hidden w-full items-center justify-between py-2 px-4 gap-2 rounded-lg shadow-sm border border-gray-200">
              <div className="grid gap-6 w-full">
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex gap-4 items-center">
                    <h3 className="font-bold uppercase">{item.name}</h3>
                    {item.rating > 0 ? (
                      <div className="flex text-yellow-500">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            fill="currentColor"
                            strokeWidth={0}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <p className="flex gap-2 items-center">
                    <MapPin width={16} />
                    {item.Place.name}
                  </p>
                </div>
                <div className="flex gap-4 justify-end">
                  <Button
                    label="View Details"
                    className={`w-fit ${viewBtnColor}`}
                    onClick={() => {
                      setShowDetails(true);
                      setHotelDetails(item);
                    }}
                  />
                  <Button label="Edit" className={`w-fit ${editBtnColor}`} />
                  <Button
                    label="Delete"
                    className={`w-fit ${deleteBtnColor}`}
                    onClick={() => {
                      setDeleteHotel(true);
                      setSelectedHotel(item);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </DetailContainer>

      {showDetails && hotelDetails && (
        <HotelDetails
          hotel={hotelDetails}
          onClose={() => {
            setShowDetails(false);
            setHotelDetails(null);
          }}
        />
      )}
    </>
  );
}

export default AdminHotels;
