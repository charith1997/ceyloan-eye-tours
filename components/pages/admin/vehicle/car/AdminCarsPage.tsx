import Button from "@/components/atoms/Button";
import DetailContainer from "@/components/containers/DetailContainer";
import { MapPin, Phone, User, Users } from "lucide-react";
import Image from "next/image";
import React from "react";

interface AdminCarsPageProps {
  cars: any[];
  handleView: (car: any) => void;
}

function AdminCarsPage({ cars, handleView }: AdminCarsPageProps) {
  return (
    <DetailContainer className="max-h-[calc(100vh-377px)] md:max-h-[calc(100vh-252px)]">
      {cars.map((car: any, index: number) => (
        <div key={index}>
          <div className="hidden md:flex w-full items-center justify-between p-2 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-8">
              <Image
                src={car?.images[0]}
                alt={`Car ${car.id}`}
                width={120}
                height={100}
                className="object-cover rounded-lg w-28 h-28"
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-md font-bold flex items-center gap-4">
                  <span className="uppercase">{car.name}</span>
                </h3>
                <span className="flex text-sm gap-2 items-center">
                  <User width={14} />
                  {car.owner}
                </span>
                <span className="flex text-sm gap-2 items-center">
                  <Phone width={14} /> {car.owner_contact}
                </span>
                <span className="flex text-sm gap-2 items-center">
                  <MapPin width={14} /> {car.location}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center text-sm gap-2">
              <span className="text-sm flex items-center gap-2">
                <Users width={14} /> {car.passenger_capacity} Passengers
              </span>
              <span className="bg-[#1976D2] text-white p-1 rounded">
                LKR {car.price}
              </span>
            </div>

            <div className="flex gap-4">
              <Button
                label="View Details"
                className="w-24 p-2 text-sm rounded-md text-white bg-gray-600"
                onClick={() => {
                  handleView(car);
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
                  <h3 className="font-bold uppercase pr-2">{car.name} </h3>
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 p-1 text-white rounded">
                    {car.passenger_capacity} Passengers
                  </span>
                </div>
                <span className="flex text-sm gap-2 items-center">
                  <User width={14} /> {car.owner}
                </span>
                <span className="flex text-sm gap-2 items-center">
                  <Phone width={14} /> {car.owner_contact}
                </span>
                <span className="flex text-sm gap-2 items-center">
                  <MapPin width={14} /> {car.location}
                </span>
                <span className="bg-[#1976D2] text-white p-1 rounded w-fit">
                  LKR {car.price}
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

export default AdminCarsPage;
