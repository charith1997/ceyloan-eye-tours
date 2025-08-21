import React, { useEffect, useState } from "react";
import { Star, Component } from "lucide-react";
import { Input } from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import ListContainer from "@/components/containers/ListContainer";
import Dropdown from "@/components/atoms/Dropdown";
import Modal from "@/components/molecules/Modal";
import { useGetAllHotelTypesQuery } from "@/services/hotelTypeApi";
import { useGetAllHotelsQuery } from "@/services/hotelApi";
import DetailContainer from "@/components/containers/DetailContainer";
import Image from "next/image";
import AddHotel from "./AddHotel";

const hotelDetails = (item: {
  name: string;
  Place: { name: string };
  rating: number;
}) => (
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
);

const priceDetailsForHotels = () => (
  <div className="block justify-items-center text-sm ">
    <h3>Starting from</h3>
    <h3 className="font-bold">$ 1500</h3>
  </div>
);

const actionButtons = (item: { id: number; image_url: string }) => {
  return (
    <div className="flex gap-4">
      <Button
        label="Edit"
        className="w-20 p-2 text-sm rounded-md text-white bg-orange uppercase"
      />
      <Button
        label="Delete"
        className="w-20 p-2 text-sm rounded-md text-white bg-red uppercase"
      />
    </div>
  );
};

const mobileViewForHotelDetails = (item: {
  name: string;
  Place: { name: string };
  rating: number;
}) => (
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
);

const hotelTypeDetails = (item: { name: string; type: string }) => (
  <div className="flex flex-col gap-2">
    <h3 className="text-md font-bold uppercase">{item.name}</h3>
  </div>
);

const priceDetailsForHotelTypes = () => null;

const mobileViewForHotelTypeDetails = (item: { name: string }) => (
  <div className="flex flex-col gap-1 text-sm">
    <h3 className="font-bold uppercase">{item.name}</h3>
  </div>
);

const textFieldClassNames =
  "w-full text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none";
const labelClassNames = "block text-sm font-medium";

const AdminHotelsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");

  const {
    data: hotelsData,
    error: hotelsError,
    isLoading: hotelsLoading,
  } = useGetAllHotelsQuery();

  const {
    data: hotelTypesData,
    error: hotelTypesError,
    isLoading: hotelTypesLoading,
  } = useGetAllHotelTypesQuery();

  const data =
    activeTab === "tab1" ? hotelsData?.data ?? [] : hotelTypesData?.data ?? [];

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder={
            activeTab === "tab1" ? "Search Hotels..." : "Search Hotel Types..."
          }
          title="Accommodations"
          buttonName={activeTab === "tab1" ? "Add Hotel" : "Add Hotel Type"}
          onClick={() => setShowModal(true)}
        />
        <div className="w-full">
          <div className="md:max-w-xs flex">
            <Button
              label="Hotels"
              className={`flex-1 p-2 text-center text-sm cursor-pointer ${
                activeTab === "tab1" ? "border-b-2 text-red" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("tab1")}
            />
            <Button
              label="Hotel Types"
              className={`flex-1 p-2 text-center text-sm cursor-pointer ${
                activeTab === "tab2" ? "border-b-2 text-red" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("tab2")}
            />
          </div>

          <div className="pt-8">
            {activeTab === "tab1" && (
              <DetailContainer className="max-h-[calc(100vh-252px)] overflow-y-auto">
                {data.map((item: any, index: number) => (
                  <div key={index}>
                    <div className="hidden md:flex w-full items-center justify-between p-2 border-2 rounded-lg border-orange">
                      <div className="flex items-center gap-8">
                        <Image
                          src={item.image_url}
                          alt={`Tour ${item.id}`}
                          width={120}
                          height={100}
                          className="object-cover rounded-lg w-28 h-28"
                        />
                        <div className="flex flex-col gap-2">
                          <h3 className="text-md font-bold uppercase">
                            {item.name}
                          </h3>
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
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </DetailContainer>
            )}
            {activeTab === "tab2" && (
              <DetailContainer className="max-h-[calc(100vh-252px)] overflow-y-auto">
                {data.map((item: any, index: number) => (
                  <div key={index}>
                    <div className="hidden md:flex w-full items-center justify-between p-2 border-2 rounded-lg border-orange">
                      <div className="flex items-center gap-8">
                        <Image
                          src={item.image_url}
                          alt={`Tour ${item.id}`}
                          width={120}
                          height={100}
                          className="object-cover rounded-lg w-28 h-28"
                        />
                        <div className="flex flex-col gap-2">
                          <h3 className="text-md font-bold uppercase">
                            {item.name}
                          </h3>
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
                        <div className="flex flex-col gap-1 text-sm">
                          <h3 className="font-bold uppercase">{item.name}</h3>
                        </div>
                        <div className="flex gap-4">
                          <Button
                            label="Edit"
                            className="w-20 p-2 text-sm rounded-md text-white bg-orange uppercase"
                          />
                          <Button
                            label="Delete"
                            className="w-20 p-2 text-sm rounded-md text-white bg-red uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </DetailContainer>
            )}
          </div>
        </div>
      </NavigationContainer>

      <AddHotel show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default AdminHotelsPage;
