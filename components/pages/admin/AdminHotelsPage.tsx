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
        <div className="w-full ">
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

          <div className="py-8">
            {activeTab === "tab1" && (
              <ListContainer
                cardDetails={hotelDetails}
                priceDetails={priceDetailsForHotels}
                actionButtons={actionButtons}
                mobileViewCardDetails={mobileViewForHotelDetails}
                list={data.map((item: any) => ({
                  ...item,
                  image_url: item?.images[0],
                }))}
              />
            )}
            {activeTab === "tab2" && (
              <ListContainer
                cardDetails={hotelTypeDetails}
                priceDetails={priceDetailsForHotelTypes}
                actionButtons={actionButtons}
                mobileViewCardDetails={mobileViewForHotelTypeDetails}
                list={data}
              />
            )}
          </div>
        </div>
      </NavigationContainer>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Hotel Form"
      >
        <form
          id="hotel-form"
          className="space-y-4 flex-1 overflow-y-auto py-2 pr-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Hotel Name:"
              inputClassNames={textFieldClassNames}
              labelClassNames={labelClassNames}
            />
            <Input
              label="Star Rating:"
              inputClassNames={textFieldClassNames}
              labelClassNames={labelClassNames}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Dropdown options={["Option 1", "Option 2"]} label="Hotel Type:" />
            <Input
              label="Location:"
              inputClassNames={textFieldClassNames}
              labelClassNames={labelClassNames}
            />
          </div>

          <TextArea
            label="Description:"
            labelClassNames={labelClassNames}
            textAreaClassNames={`${textFieldClassNames} h-24`}
          />
          <TextArea
            label="Top Facilities:"
            labelClassNames={labelClassNames}
            textAreaClassNames={`${textFieldClassNames} h-24`}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Dropdown
              options={["Option 1", "Option 2"]}
              label="Available Rooms:"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Images:</label>
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Rooms adding area?"
              inputClassNames={textFieldClassNames}
              labelClassNames={labelClassNames}
            />
          </div>
        </form>
        <div className="flex justify-center gap-6 mt-4 bg-white">
          <Button
            onClick={() => setShowModal(false)}
            className="w-full text-white px-8 py-2 rounded-lg cursor-pointer bg-[#1976D2] text-lg font-semibold uppercase"
            label="Cancel"
          />
          <Button
            type="submit"
            form="tour-form"
            className="w-full text-white px-8 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-red to-orange text-lg font-semibold uppercase"
            onClick={() => {}}
            label="Save"
          />
        </div>
      </Modal>
    </>
  );
};

export default AdminHotelsPage;
