import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import AddHotel from "./hotels/AddHotel";
import AdminHotels from "./hotels/AdminHotels";
import AdminHotelTypes from "./hotel-types/AdminHotelTypes";
import AddHotelType from "./hotel-types/AddHotelType";
import DeleteHotelType from "./hotel-types/DeleteHotelType";
import DeleteHotel from "./hotels/DeleteHotel";

const AdminAccommodationPage = () => {
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [showHotelTypeModal, setShowHotelTypeModal] = useState(false);
  const [deleteHotelType, setDeleteHotelType] = useState(false);
  const [deleteHotel, setDeleteHotel] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedHotelType, setSelectedHotelType] = useState<any | null>(null);
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder={
            activeTab === "tab1" ? "Search Hotels..." : "Search Hotel Types..."
          }
          title="Accommodations"
          buttonName={activeTab === "tab1" ? "Add Hotel" : "Add Hotel Type"}
          onClick={() => {
            if (activeTab === "tab1") {
              setShowHotelModal(true);
            } else {
              setShowHotelTypeModal(true);
            }
          }}
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
              <AdminHotels
                setDeleteHotel={setDeleteHotel}
                setSelectedHotelId={setSelectedHotelId}
              />
            )}
            {activeTab === "tab2" && (
              <AdminHotelTypes
                setDeleteHotelType={setDeleteHotelType}
                setSelectedHotelType={setSelectedHotelType}
                setShowHotelTypeModal={setShowHotelTypeModal}
              />
            )}
          </div>
        </div>
      </NavigationContainer>

      <AddHotel
        show={showHotelModal}
        onClose={() => setShowHotelModal(false)}
      />

      <DeleteHotel
        show={deleteHotel}
        onClose={() => {
          setDeleteHotel(false);
          setSelectedHotelId(null);
        }}
        selectedID={selectedHotelId}
      />

      <AddHotelType
        show={showHotelTypeModal}
        onClose={() => {
          setShowHotelTypeModal(false);
          setSelectedHotelType(null);
        }}
        initialValues={{
          ...selectedHotelType,
          image: selectedHotelType ? selectedHotelType.image_url : null,
        }}
        isEdit={selectedHotelType !== null}
      />

      <DeleteHotelType
        show={deleteHotelType}
        onClose={() => {
          setDeleteHotelType(false);
          setSelectedHotelType(null);
        }}
        selectedID={selectedHotelType ? selectedHotelType.id : null}
      />
    </>
  );
};

export default AdminAccommodationPage;
