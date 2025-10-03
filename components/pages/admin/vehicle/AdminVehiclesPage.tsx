import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import AdminCarsPage from "./car/AdminCarsPage";
import AdminVansPage from "./van/AdminVansPage";
import AdminBusPage from "./bus/AdminBusPage";
import { useGetAllVehiclesQuery } from "@/services/vehicleApi";
import VehicleDetails from "./VehicleDetails";

const AdminVehiclesPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState<any | null>(null);
  const { data } = useGetAllVehiclesQuery();
  const vehicles = Array.isArray(data?.data) ? data.data : [];

  const handleShowDetails = (details: any) => {
    setShow(true);
    setDetails(details);
  };

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder={
            activeTab === "tab1"
              ? "Search Cars..."
              : activeTab === "tab2"
              ? "Search Vans..."
              : "Search Busses..."
          }
          title="Vehicles"
          buttonName="Add Vehicle"
          onClick={() => {}}
        />
        <div className="w-full">
          <div className="md:max-w-xs flex">
            <Button
              label="Cars"
              className={`flex-1 p-2 text-center text-sm cursor-pointer ${
                activeTab === "tab1" ? "border-b-2 text-red" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("tab1")}
            />
            <Button
              label="Vans"
              className={`flex-1 p-2 text-center text-sm cursor-pointer ${
                activeTab === "tab2" ? "border-b-2 text-red" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("tab2")}
            />
            <Button
              label="Busses"
              className={`flex-1 p-2 text-center text-sm cursor-pointer ${
                activeTab === "tab3" ? "border-b-2 text-red" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("tab3")}
            />
          </div>

          <div className="pt-8">
            {activeTab === "tab1" && (
              <AdminCarsPage cars={vehicles} handleView={handleShowDetails} />
            )}
            {activeTab === "tab2" && (
              <AdminVansPage vans={vehicles} handleView={handleShowDetails} />
            )}
            {activeTab === "tab3" && (
              <AdminBusPage busses={vehicles} handleView={handleShowDetails} />
            )}
          </div>
        </div>
      </NavigationContainer>

      {show && <VehicleDetails visible={show} details={details} />}
    </>
  );
};

export default AdminVehiclesPage;
