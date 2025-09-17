import React from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import DetailContainer from "@/components/containers/DetailContainer";
import { useGetAllHotelTypesQuery } from "@/services/hotelTypeApi";
import { BookText } from "lucide-react";

interface AdminHotelTypesProps {
  setDeleteHotelType: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedHotelTypeId: React.Dispatch<React.SetStateAction<string | null>>;
}

function AdminHotelTypes({
  setDeleteHotelType,
  setSelectedHotelTypeId,
}: AdminHotelTypesProps) {
  const { data } = useGetAllHotelTypesQuery();
  const hotelTypes = Array.isArray(data?.data) ? data.data : [];
  return (
    <DetailContainer className="max-h-[calc(100vh-252px)] overflow-y-auto">
      {hotelTypes.map((item: any, index: number) => (
        <div key={index}>
          <div className="hidden md:flex w-full items-center justify-between p-2 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-8">
              <Image
                src={item.image_url}
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
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                label="Edit"
                className="w-20 p-2 text-sm rounded-md text-white bg-orange uppercase"
              />
              <Button
                label="Delete"
                className="w-20 p-2 text-sm rounded-md text-white bg-red uppercase"
                onClick={() => {
                  setDeleteHotelType(true);
                  setSelectedHotelTypeId(item.id);
                }}
              />
            </div>
          </div>

          <div className="flex md:hidden w-full items-center justify-between p-2 gap-2 rounded-lg shadow-sm border border-gray-200">
            <Image
              src={item.image_url}
              alt={`Tour ${item.id}`}
              width={160}
              height={160}
              className="object-cover rounded-lg w-36 h-36"
            />
            <div className="grid gap-2">
              <div className="flex flex-col gap-1 text-sm">
                <h3 className="font-bold uppercase">{item.name}</h3>
                <p className="flex text-sm gap-2 items-center">
                  <BookText width={16} />
                  {item.description}
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  label="Edit"
                  className="w-20 p-2 text-sm rounded-md text-white bg-orange uppercase"
                />
                <Button
                  label="Delete"
                  className="w-20 p-2 text-sm rounded-md text-white bg-red uppercase"
                  onClick={() => {
                    setDeleteHotelType(true);
                    setSelectedHotelTypeId(item.id);
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

export default AdminHotelTypes;
