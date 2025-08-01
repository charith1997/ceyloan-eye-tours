import React, { useState } from "react";
import SearchContainer from "./SearchContainer";
import NavigationContainer from "./NavigationContainer";
import ListContainer from "./ListContainer";
import { CalendarDays, Eye, Users } from "lucide-react";
import Modal from "./Modal";
import TextField from "./TextField";
import Dropdown from "./Dropdown";
import Button from "./Button";

const cardDetails_1 = (
  <div className="flex flex-col gap-2">
    <h3 className="text-md font-bold uppercase">Tour Package Name</h3>
    <p className="text-sm flex gap-2 items-center">
      <Users fill="black" width={16} />
      05 Peoples
    </p>
    <span className="flex text-sm gap-2 items-center">
      <CalendarDays width={16} /> 02 May 2025 - 15 May 2025
    </span>
  </div>
);

const priceDetails_1 = (
  <div className="block justify-items-center text-sm font-bold">
    <h3>$</h3>
    <h3>1500</h3>
  </div>
);

const actionButtons_1 = (
  <div className="flex gap-4 items-center">
    <Eye color="orange" className="cursor-pointer" />
    <button className="w-24 md:w-28 p-2 rounded-md md:rounded-lg text-white bg-[#4CAF50] text-sm md:text-base">
      Approve
    </button>
    <button className="w-24 md:w-28 p-2 rounded-md md:rounded-lg text-white bg-red text-sm md:text-base">
      Cancel Tour
    </button>
  </div>
);

const mobileViewCardDetails_1 = (
  <div className="flex flex-col gap-1 text-sm">
    <h3 className="font-bold uppercase">Tour Package Name</h3>
    <p className="flex gap-2 items-center">
      <Users fill="black" width={16} />
      05 Peoples
    </p>
    <span className="flex gap-1 items-center">
      <CalendarDays width={16} /> 02 May 2025 - 15 May 2025
    </span>
    <p className="font-bold">$ 1500</p>
  </div>
);

const cardDetails_2 = (
  <div className="flex flex-col gap-2">
    <h3 className="text-md font-bold uppercase">Tour Package Name</h3>
    <p className="text-sm flex gap-2 items-center">
      <Users fill="black" width={16} />
      05 Peoples
    </p>
    <span className="flex text-sm gap-2 items-center">
      <CalendarDays width={16} /> 02 May 2025 - 15 May 2025
    </span>
  </div>
);

const priceDetails_2 = (
  <div className="block justify-items-center text-sm font-bold">
    <h3>$</h3>
    <h3>1500</h3>
  </div>
);

const actionButtons_2 = (
  <div className="flex gap-4 items-center">
    <Eye color="orange" className="cursor-pointer" />
    <button className="w-24 md:w-28 p-2 rounded-md md:rounded-lg text-white bg-red text-sm md:text-base">
      Cancel Tour
    </button>
  </div>
);

const mobileViewCardDetails_2 = (
  <div className="flex flex-col gap-1 text-sm">
    <h3 className="font-bold uppercase">Tour Package Name</h3>
    <p className="flex gap-2 items-center">
      <Users fill="black" width={16} />
      05 Peoples
    </p>
    <span className="flex gap-1 items-center">
      <CalendarDays width={16} /> 02 May 2025 - 15 May 2025
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

const AdminOrders = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder="Search Orders..."
          title="Orders"
          buttonName="Add Order"
          onClick={() => setShowModal(true)}
          isDisplayActionButton={false}
        />

        <div className="w-full ">
          <div className="md:max-w-xs flex">
            <button
              className={`flex-1 p-2 text-center text-sm cursor-pointer ${
                activeTab === "tab1" ? "border-b-2 text-red" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("tab1")}
            >
              Requested
            </button>
            <button
              className={`flex-1 p-2 text-center text-sm cursor-pointer ${
                activeTab === "tab2" ? "border-b-2 text-red" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("tab2")}
            >
              Approved
            </button>
          </div>

          <div className="py-8">
            {activeTab === "tab1" && (
              <ListContainer
                cardDetails={cardDetails_1}
                priceDetails={priceDetails_1}
                actionButtons={actionButtons_1}
                mobileViewCardDetails={mobileViewCardDetails_1}
                list={ToursList}
              />
            )}
            {activeTab === "tab2" && (
              <ListContainer
                cardDetails={cardDetails_2}
                priceDetails={priceDetails_2}
                actionButtons={actionButtons_2}
                mobileViewCardDetails={mobileViewCardDetails_2}
                list={ToursList}
              />
            )}
          </div>
        </div>
      </NavigationContainer>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Tour Form"
      >
        <form
          id="tour-form"
          className="space-y-4 flex-1 overflow-y-auto py-2 pr-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField label="Tour name:" />
            <TextField label="Day count:" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Dropdown options={["Option 1", "Option 2"]} label="Tour Type:" />
            <Dropdown
              options={["Option 1", "Option 2"]}
              label="Places to visit:"
            />
          </div>

          <TextField label="Description:" isTextArea classname="h-24" />
          <TextField label="Tour Highlights:" isTextArea classname="h-24" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField label="Price Includes:" isTextArea classname="h-24" />
            <TextField label="Price Excludes:" isTextArea classname="h-24" />
          </div>

          <div>
            <label className="block text-sm font-medium">Images:</label>
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField label="Price:" />
          </div>
        </form>
        <div className="flex justify-center gap-6 mt-4 bg-white">
          <Button
            onClick={() => setShowModal(false)}
            className="bg-[#1976D2] text-lg font-semibold uppercase"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="tour-form"
            className="bg-gradient-to-r from-red to-orange text-lg font-semibold uppercase"
            onClick={() => {}}
          >
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AdminOrders;
