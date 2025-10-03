import Button from "@/components/atoms/Button";
import DetailContainer from "@/components/containers/DetailContainer";
import { MapPin, Phone, User, Users } from "lucide-react";
import Image from "next/image";
import React from "react";

interface AdminVansPageProps {
  vans: any[];
  handleView: (van: any) => void;
}

function AdminVansPage({ vans, handleView }: AdminVansPageProps) {
  return (
    <DetailContainer className="max-h-[calc(100vh-377px)] md:max-h-[calc(100vh-252px)]">
      {vans.map((van: any, index: number) => (
        <div key={index}>
          <div className="hidden md:flex w-full items-center justify-between p-2 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-8">
              <Image
                src={van?.images[0]}
                alt={`Car ${van.id}`}
                width={120}
                height={100}
                className="object-cover rounded-lg w-28 h-28"
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-md font-bold flex items-center gap-4">
                  <span className="uppercase">{van.name}</span>
                </h3>
                <span className="flex text-sm gap-2 items-center">
                  <User width={14} />
                  {van.owner}
                </span>
                <span className="flex text-sm gap-2 items-center">
                  <Phone width={14} /> {van.owner_contact}
                </span>
                <span className="flex text-sm gap-2 items-center">
                  <MapPin width={14} /> {van.location}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center text-sm gap-2">
              <span className="text-sm flex items-center gap-2">
                <Users width={14} /> {van.passenger_capacity} Passengers
              </span>
              <span className="bg-[#1976D2] text-white p-1 rounded">
                LKR {van.price}
              </span>
            </div>

            <div className="flex gap-4">
              <Button
                label="View Details"
                className="w-24 p-2 text-sm rounded-md text-white bg-gray-600"
                onClick={() => {
                  handleView(van);
                }}
              />
              <Button
                label="Edit"
                className="w-20 p-2 text-sm rounded-md text-white bg-orange"
              />
              <Button
                label="Delete"
                className="w-20 p-2 text-sm rounded-md text-white bg-red"
                onClick={() => {}}
              />
            </div>
          </div>

          <div className="flex md:hidden w-full items-center justify-between py-2 px-4 gap-2 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold uppercase pr-2">{van.name} </h3>
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 p-1 text-white rounded">
                    {van.passenger_capacity} Passengers
                  </span>
                </div>
                <span className="flex text-sm gap-2 items-center">
                  <User width={14} /> {van.owner}
                </span>
                <span className="flex text-sm gap-2 items-center">
                  <Phone width={14} /> {van.owner_contact}
                </span>
                <span className="flex text-sm gap-2 items-center">
                  <MapPin width={14} /> {van.location}
                </span>
                <span className="bg-[#1976D2] text-white p-1 rounded w-fit">
                  LKR {van.price}
                </span>
              </div>
              <div className="flex gap-4 justify-end">
                <Button
                  label="View Details"
                  className="w-20 p-2 text-sm rounded-md text-white bg-orange uppercase"
                />
                <Button
                  label="Edit"
                  className="w-20 p-2 text-sm rounded-md text-white bg-orange uppercase"
                />
                <Button
                  label="Delete"
                  className="w-20 p-2 text-sm rounded-md text-white bg-red uppercase"
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </DetailContainer>
  );
}

export default AdminVansPage;
