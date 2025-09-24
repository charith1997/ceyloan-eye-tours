import React, { useState } from "react";
import { CalendarDays, Component, MapPin, User } from "lucide-react";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import { formatDuration } from "@/utils/package";
import { displayTourType } from "@/utils/common";
import DetailContainer from "@/components/containers/DetailContainer";
import { useGetAllCustomPackagesQuery } from "@/services/customPackageApi";
import PlaceOrder from "./PlaceOrders";

const AdminCustomPackagesPage = () => {
  const [showPlaceOrdersModal, setShowPlaceOrdersModal] = useState(false);
  const [packageDetails, setPackageDetails] = useState<any | null>(null);

  const { data, error } = useGetAllCustomPackagesQuery();
  const packages = Array.isArray(data?.data) ? data.data : [];

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder="Search Custom Package..."
          title="Custom Packages"
          buttonName="Add Custom Package"
          onClick={() => {}}
          isDisplayActionButton={false}
        />
        <DetailContainer className="max-h-[calc(100vh-307px)] md:max-h-[calc(100vh-182px)]">
          {packages.map((item: any, index: number) => (
            <div key={index}>
              <div className="hidden md:flex w-full items-center justify-between p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-8">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm flex gap-2 items-center">
                      <User fill="black" width={16} />
                      {item.User.name}
                    </p>
                    <span className="flex text-sm gap-2 items-center">
                      <MapPin width={16} /> {item.User.country}
                    </span>
                  </div>
                </div>

                <div className="block justify-items-center">
                  <h3
                    className={`px-2.5 py-0.5 rounded-full text-xs ${
                      item.is_approved === true
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {item.is_approved === false ? "pending" : "approved"}
                  </h3>
                </div>

                <div className="flex gap-4">
                  <Button
                    label="Sort Order"
                    className="w-auto p-2 rounded-md text-white bg-[#1976D2] text-sm uppercase tracking-wide"
                    onClick={() => {
                      setShowPlaceOrdersModal(true);
                      setPackageDetails(item);
                    }}
                  />
                </div>
              </div>

              <div className="flex md:hidden w-full items-center justify-between p-3 gap-2 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between w-full gap-2">
                  <div className="flex flex-col gap-1 text-sm">
                    <p className="flex gap-2 items-center">
                      <User fill="black" width={16} />
                      {item.User.name}
                    </p>
                    <span className="flex gap-1 items-center">
                      <MapPin width={16} /> {item.User.country}
                    </span>
                    <h3
                      className={`w-min px-2.5 py-0.5 rounded-full text-xs ${
                        item.is_approved === true
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {item.is_approved === false ? "pending" : "approved"}
                    </h3>
                  </div>
                  <div className="flex items-center">
                    {item.is_approved === false && (
                      <Button
                        label="Sort Order"
                        className="w-auto p-2 rounded-md text-white bg-[#1976D2] text-sm uppercase tracking-wide"
                        onClick={() => {
                          setShowPlaceOrdersModal(true);
                          setPackageDetails(item);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </DetailContainer>
      </NavigationContainer>

      {packageDetails && (
        <PlaceOrder
          show={showPlaceOrdersModal}
          customizePackagePlaces={packageDetails?.CustomizePackagePlaces}
          onClose={() => {
            setShowPlaceOrdersModal(false);
          }}
        />
      )}
    </>
  );
};

export default AdminCustomPackagesPage;
