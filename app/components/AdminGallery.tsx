import React, { useState } from "react";
import SearchContainer from "./SearchContainer";
import NavigationContainer from "./NavigationContainer";
import ListContainer from "./ListContainer";
import { Eye, MapPin, User } from "lucide-react";
import Button from "@/components/atoms/Button";

const cardDetails_1 = (
  <div className="flex flex-col gap-2">
    <h3 className="text-md font-bold uppercase">Image Name</h3>
    <p className="text-sm flex gap-2 items-center">
      <MapPin width={16} />
      Location
    </p>
    <span className="flex text-sm gap-2 items-center">
      <User width={16} /> Captured By
    </span>
  </div>
);

const priceDetails_1 = null;

const actionButtons_1 = (item: { id: number; imageURL: string }) => {
  console.log("item", item);

  return (
    <div className="flex gap-4 items-center">
      <Eye color="orange" className="cursor-pointer" />
      <Button
        label="Approve"
        className="w-20 p-2 rounded-md text-white bg-[#4CAF50] text-sm uppercase"
      />
      <Button
        label="Cancel"
        className="w-20 p-2 rounded-md text-white bg-red text-sm uppercase"
      />
    </div>
  );
};

const mobileViewCardDetails_1 = (
  <div className="flex flex-col gap-1 text-sm">
    <h3 className="font-bold uppercase">Image Name</h3>
    <p className="flex gap-2 items-center">
      <MapPin width={16} />
      Location
    </p>
    <span className="flex gap-1 items-center">
      <User width={16} /> Captured By
    </span>
  </div>
);

const cardDetails_2 = (
  <div className="flex flex-col gap-2">
    <h3 className="text-md font-bold uppercase">Image Name</h3>
    <p className="text-sm flex gap-2 items-center">
      <MapPin width={16} />
      Location
    </p>
    <span className="flex text-sm gap-2 items-center">
      <User width={16} /> Captured By
    </span>
  </div>
);

const priceDetails_2 = null;

const actionButtons_2 = (item: { id: number; imageURL: string }) => {
  console.log("item", item);

  return (
    <div className="flex gap-4 items-center">
      <Eye color="orange" className="cursor-pointer" />
      <Button
        label="Delete"
        className="w-20 p-2 rounded-md text-white bg-red text-sm uppercase"
      />
    </div>
  );
};

const mobileViewCardDetails_2 = (
  <div className="flex flex-col gap-1 text-sm">
    <h3 className="font-bold uppercase">Image Name</h3>
    <p className="flex gap-2 items-center">
      <MapPin width={16} />
      Location
    </p>
    <span className="flex gap-1 items-center">
      <User width={16} /> Captured By
    </span>
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

const AdminGallery = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder="Search Gallery..."
          title="Gallery"
          buttonName="Add Image"
          onClick={() => {}}
          isDisplayActionButton={false}
        />

        <div className="w-full ">
          <div className="md:max-w-xs flex">
            <Button
              label="Requested"
              className={`flex-1 p-2 text-center text-sm cursor-pointer ${
                activeTab === "tab1" ? "border-b-2 text-red" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("tab1")}
            />
            <Button
              label="Approved"
              className={`flex-1 p-2 text-center text-sm cursor-pointer ${
                activeTab === "tab2" ? "border-b-2 text-red" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("tab2")}
            />
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
    </>
  );
};

export default AdminGallery;
