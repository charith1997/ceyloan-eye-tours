import Button from "@/components/atoms/Button";
import DetailContainer from "@/components/containers/DetailContainer";
import { deleteBtnColor, editBtnColor, viewBtnColor } from "@/styles/colors";
import { checkImageUrl } from "@/utils/common";
import { MapPin, Phone, User, Users } from "lucide-react";
import Image from "next/image";
import React from "react";

interface AdminBusPageProps {
  busses: any[];
  handleView: (bus: any) => void;
  handleDelete: (bus: any) => void;
  handleEdit: (bus: any) => void;
}

function AdminBusPage({
  busses,
  handleView,
  handleDelete,
  handleEdit,
}: AdminBusPageProps) {
  return (
    <DetailContainer className="max-h-[calc(100vh-377px)] md:max-h-[calc(100vh-252px)]">
      {busses.map((bus: any, index: number) => (
        <div key={index}>
          <div className="hidden md:grid grid-cols-3 w-full items-center justify-between p-2 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-8">
              {bus.images.length > 0 && (
                <Image
                  src={checkImageUrl(bus?.images[0])}
                  alt={`Bus ${bus.id}`}
                  width={120}
                  height={100}
                  className="object-cover rounded-lg w-28 h-28"
                />
              )}
              <div className="flex flex-col gap-2">
                <h3 className="text-md font-bold flex items-center gap-4">
                  <span className="uppercase">{bus.name}</span>
                </h3>
                <span className="flex text-sm gap-2 items-center">
                  <User width={14} />
                  {bus.owner}
                </span>
                <span className="flex text-sm gap-2 items-center">
                  <Phone width={14} /> {bus.owner_contact}
                </span>
                <span className="flex text-sm gap-2 items-center">
                  <MapPin width={14} /> {bus.location}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center text-sm gap-2">
              <span className="text-sm flex items-center gap-2">
                <Users width={14} /> {bus.passenger_capacity} Passengers
              </span>
              <span className="bg-[#1976D2] text-white p-1 rounded">
                LKR {bus.price}
              </span>
            </div>

            <div className="flex gap-4 justify-end">
              <Button
                label="View Details"
                className={`w-fit text-sm uppercase ${viewBtnColor}`}
                onClick={() => handleView(bus)}
              />
              <Button
                label="Edit"
                className={`w-fit text-sm uppercase ${editBtnColor}`}
                onClick={() => handleEdit(bus)}
              />
              <Button
                label="Delete"
                className={`w-fit text-sm uppercase ${deleteBtnColor}`}
                onClick={() => handleDelete(bus)}
              />
            </div>
          </div>

          <div className="flex md:hidden w-full items-center justify-between py-2 px-4 gap-2 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold uppercase pr-2">{bus.name} </h3>
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 p-1 text-white rounded">
                    {bus.passenger_capacity} Passengers
                  </span>
                </div>
                <span className="flex text-sm gap-2 items-center">
                  <User width={14} /> {bus.owner}
                </span>
                <span className="flex text-sm gap-2 items-center">
                  <Phone width={14} /> {bus.owner_contact}
                </span>
                <span className="flex text-sm gap-2 items-center">
                  <MapPin width={14} /> {bus.location}
                </span>
                <span className="bg-[#1976D2] text-white p-1 rounded w-fit">
                  LKR {bus.price}
                </span>
              </div>
              <div className="flex gap-4 justify-end">
                <Button
                  label="View Details"
                  className={`w-fit ${viewBtnColor}`}
                  onClick={() => handleView(bus)}
                />
                <Button
                  label="Edit"
                  className={`w-fit ${editBtnColor}`}
                  onClick={() => handleEdit(bus)}
                />
                <Button
                  label="Delete"
                  className={`w-fit ${deleteBtnColor}`}
                  onClick={() => handleDelete(bus)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </DetailContainer>
  );
}

export default AdminBusPage;
