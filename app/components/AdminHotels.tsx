import React, { useState } from "react";
import SearchContainer from "./SearchContainer";
import NavigationContainer from "./NavigationContainer";
import ListContainer from "./ListContainer";
import { Star, Component } from "lucide-react";
import Modal from "./Modal";
import Dropdown from "./Dropdown";
import { Input } from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import Button from "@/components/atoms/Button";

const cardDetails = (
  <div className="flex flex-col gap-2">
    <h3 className="text-md font-bold uppercase">Hotel Name</h3>
    <p className="flex text-sm gap-2 items-center">
      <Component fill="black" width={16} />
      Hotel Type
    </p>
    <span className="flex text-sm gap-2 items-center">
      <Star width={16} fill="black" /> 5 Star
    </span>
  </div>
);

const priceDetails = (
  <div className="block justify-items-center text-sm ">
    <h3>Starting from</h3>
    <h3 className="font-bold">$ 1500</h3>
  </div>
);

const actionButtons = (item: { id: number; imageURL: string }) => {
  console.log("item", item);

  return (
    <div className="flex gap-4">
      <button className="w-20 p-2 text-sm rounded-md text-white bg-orange uppercase">
        Edit
      </button>
      <button className="w-20 p-2 text-sm rounded-md text-white bg-red uppercase">
        Delete
      </button>
    </div>
  );
};

const mobileViewCardDetails = (
  <div className="flex flex-col gap-1 text-sm">
    <h3 className="font-bold uppercase">Hotel Name</h3>
    <p className="flex gap-2 items-center">
      <Component fill="black" width={16} />
      Hotel Type
    </p>
    <span className="flex gap-1 items-center">
      <Star fill="black" width={16} /> 5 Star
    </span>
    <p className="font-bold">$ 1500</p>
  </div>
);

const ToursList = [
  {
    id: 0,
    imageURL: "/tour packages/package_1.jpg",
  },
  {
    id: 1,
    imageURL: "/tour packages/package_2.jpg",
  },
  {
    id: 2,
    imageURL: "/tour packages/package_3.jpg",
  },
];

const textFieldClassNames =
  "w-full text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none";
const labelClassNames = "block text-sm font-medium";

const AdminHotels = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder="Search Hotels..."
          title="Hotels"
          buttonName="Add Hotel"
          onClick={() => setShowModal(true)}
        />
        <ListContainer
          cardDetails={cardDetails}
          priceDetails={priceDetails}
          actionButtons={actionButtons}
          mobileViewCardDetails={mobileViewCardDetails}
          list={ToursList}
        />
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
            className="bg-[#1976D2] text-lg font-semibold uppercase"
            label="Cancel"
          />
          <Button
            type="submit"
            form="tour-form"
            className="bg-gradient-to-r from-red to-orange text-lg font-semibold uppercase"
            onClick={() => {}}
            label="Save"
          />
        </div>
      </Modal>
    </>
  );
};

export default AdminHotels;
