import React from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import DetailContainer from "@/components/containers/DetailContainer";
import { useGetAllHotelsQuery } from "@/services/hotelApi";
import { Component, Star } from "lucide-react";

interface AdminHotelProps {
  setDeleteHotel: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedHotelId: React.Dispatch<React.SetStateAction<string | null>>;
}

function AdminHotels({ setDeleteHotel, setSelectedHotelId }: AdminHotelProps) {
  const { data } = useGetAllHotelsQuery();
  const hotels = Array.isArray(data?.data) ? data.data : [];
  return (
    <DetailContainer className="max-h-[calc(100vh-252px)] overflow-y-auto">
      {hotels.map((item: any, index: number) => (
        <div key={index}>
          <div className="hidden md:flex w-full items-center justify-between p-2 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-8">
              <Image
                src={item?.images[0]}
                alt={`Tour ${item.id}`}
                width={120}
                height={100}
                className="object-cover rounded-lg w-28 h-28"
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-md font-bold uppercase">{item.name}</h3>
                <p className="flex text-sm gap-2 items-center">
                  <Component fill="black" width={16} />
                  {item.Place.name}
                </p>
                <span className="flex text-sm gap-2 items-center">
                  <Star width={16} fill="black" /> {item.rating} Star
                </span>
              </div>
            </div>

            <div className="block justify-items-center text-sm ">
              <h3>Starting from</h3>
              <h3 className="font-bold">$ 1500</h3>
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
                  setDeleteHotel(true);
                  setSelectedHotelId(item.id);
                }}
              />
            </div>
          </div>

          <div className="flex md:hidden w-full items-center justify-between p-2 gap-2 rounded-lg shadow-sm border border-gray-200">
            <Image
              src={item?.images[0]}
              alt={`Tour ${item.id}`}
              width={160}
              height={160}
              className="object-cover rounded-lg w-36 h-36"
            />
            <div className="grid gap-2">
              <div className="flex flex-col gap-1 text-sm">
                <h3 className="font-bold uppercase">{item.name}</h3>
                <p className="flex gap-2 items-center">
                  <Component fill="black" width={16} />
                  {item.Place.name}
                </p>
                <span className="flex gap-1 items-center">
                  <Star fill="black" width={16} /> {item.rating} Star
                </span>
                <p className="font-bold">$ 1500</p>
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
                    setDeleteHotel(true);
                    setSelectedHotelId(item.id);
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

export default AdminHotels;
