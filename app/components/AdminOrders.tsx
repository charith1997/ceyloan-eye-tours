import React, { useState } from "react";
import SearchContainer from "./SearchContainer";
import NavigationContainer from "./NavigationContainer";
import ListContainer from "./ListContainer";
import { CalendarDays, Eye, Users } from "lucide-react";
import Modal from "./Modal";
import Button from "@/components/atoms/Button";

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

const actionButtons_2 = (item: { id: number; imageURL: string }) => {
  console.log("item", item);

  return (
    <div className="flex gap-4 items-center">
      <Eye color="orange" className="cursor-pointer" />
      <Button
        label="Cancel"
        className="w-20 p-2 rounded-md text-white bg-red text-sm uppercase"
      />
    </div>
  );
};

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

  const actionButtons_1 = (item: { id: number; imageURL: string }) => {
    console.log("item", item);

    return (
      <div className="flex gap-4 items-center">
        <Eye
          color="orange"
          className="cursor-pointer"
          onClick={() => setShowModal(true)}
        />
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

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder="Search Orders..."
          title="Orders"
          buttonName="Add Order"
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

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Order Details"
      >
        <div className="space-y-4 flex-1 overflow-y-auto py-2 pr-2">
          <DisplayDetails
            label="Tour Package :"
            value="Secrets of Lanka Tour"
          />
          <DisplayDetails label="Client Name :" value="Kavindu Chinthaka" />
          <DisplayDetails
            label="Client Email :"
            value="KavinduChintaka@gmail.com"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DisplayDetails label="Tour start Date :" value="21 May 2025" />
            <DisplayDetails label="Tour End Date :" value="28 May 2025" />
            <DisplayDetails label="Contact Number :" value="0767783752" />
            <DisplayDetails label="Nationality :" value="Sri Lankan" />
          </div>

          <DisplayDetails label="Pick up Location :" value="Colombo" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DisplayDetails label="Adults :" value="2" />
            <DisplayDetails label="Children :" value="1" />
          </div>

          <DisplayDetails
            label="Message :"
            value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen "
          />
        </div>
      </Modal>
    </>
  );
};

export default AdminOrders;

interface DisplayDetailsProps {
  label?: string;
  value?: string;
}

const DisplayDetails = ({ label, value }: DisplayDetailsProps) => {
  return (
    <div
      className={`flex gap-4 text-sm ${
        label === "Message :" ? "flex-col md:w-lg text-justify" : ""
      }`}
    >
      <h4>{label}</h4>
      <p className="text-[#7A7A7A]">{value}</p>
    </div>
  );
};
