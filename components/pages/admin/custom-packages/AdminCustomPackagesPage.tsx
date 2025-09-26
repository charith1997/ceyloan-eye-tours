import React, { useState } from "react";
import { MapPin, User } from "lucide-react";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import DetailContainer from "@/components/containers/DetailContainer";
import { useGetAllCustomPackagesQuery } from "@/services/customPackageApi";
import PlaceOrder from "./PlaceOrders";
import { checkIfSortedOrder } from "@/utils/package";
import ApprovePackage from "./ApprovePackage";
import PackageDetails from "./PackageDetails";

const AdminCustomPackagesPage = () => {
  const [showPlaceOrdersModal, setShowPlaceOrdersModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showPackageDetailsModal, setShowPackageDetailsModal] = useState(false);
  const [packageDetails, setPackageDetails] = useState<any | null>(null);

  const { data } = useGetAllCustomPackagesQuery();
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
              <div className="hidden md:grid grid-cols-3 w-full items-center  p-2 bg-white rounded-lg shadow-sm border border-gray-200">
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
                    {!item.is_approved ? "pending" : "approved"}
                  </h3>
                </div>

                <div className="flex gap-4 justify-end">
                  {!item.is_approved && (
                    <Button
                      label={`${
                        checkIfSortedOrder(item?.CustomizePackagePlaces || [])
                          ? "Edit Order"
                          : "Sort Order"
                      }`}
                      className="w-auto p-2 rounded-md text-white bg-[#1976D2] text-sm uppercase tracking-wide"
                      onClick={() => {
                        setShowPlaceOrdersModal(true);
                        setPackageDetails(item);
                      }}
                    />
                  )}
                  {!item.is_approved &&
                    checkIfSortedOrder(item?.CustomizePackagePlaces || []) && (
                      <Button
                        label="Approve"
                        className="w-auto p-2 rounded-md text-white bg-green-500 text-sm uppercase tracking-wide"
                        onClick={() => {
                          setShowApproveModal(true);
                          setPackageDetails(item);
                        }}
                      />
                    )}
                  {item.is_approved && (
                    <Button
                      label="View Details"
                      onClick={() => {
                        setShowPackageDetailsModal(true);
                        setPackageDetails(item);
                      }}
                      className="w-auto p-2 rounded-md text-white bg-gradient-to-r from-red to-orange text-sm uppercase tracking-wide"
                    />
                  )}
                </div>
              </div>

              <div className="flex md:hidden w-full items-center justify-between p-3 gap-2 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col w-full gap-4">
                  <p className="flex gap-2 items-center text-sm">
                    <User fill="black" width={16} />
                    {item.User.name}
                    <h3
                      className={`w-min px-2.5 py-0.5 rounded-full text-xs ${
                        item.is_approved === true
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {item.is_approved === false ? "pending" : "approved"}
                    </h3>
                  </p>
                  <div className="flex items-center gap-2 justify-between">
                    <span className="flex gap-2 items-center text-sm">
                      <MapPin width={16} /> {item.User.country}
                    </span>
                    <div className="flex gap-2">
                      {item.is_approved === false && (
                        <Button
                          label={`${
                            checkIfSortedOrder(
                              item?.CustomizePackagePlaces || []
                            )
                              ? "Edit Order"
                              : "Sort Order"
                          }`}
                          className="w-auto p-2 rounded-md text-white bg-[#1976D2] text-sm uppercase tracking-wide"
                          onClick={() => {
                            setShowPlaceOrdersModal(true);
                            setPackageDetails(item);
                          }}
                        />
                      )}
                      {item.is_approved === false &&
                        checkIfSortedOrder(
                          item?.CustomizePackagePlaces || []
                        ) && (
                          <Button
                            label="Approve"
                            className="w-auto p-2 rounded-md text-white bg-green-500 text-sm uppercase tracking-wide"
                            onClick={() => {
                              setShowApproveModal(true);
                              setPackageDetails(item);
                            }}
                          />
                        )}
                      {item.is_approved && (
                        <Button
                          label="View Details"
                          onClick={() => {
                            setShowPackageDetailsModal(true);
                            setPackageDetails(item);
                          }}
                          className="w-auto p-2 rounded-md text-white bg-gradient-to-r from-red to-orange text-sm uppercase tracking-wide"
                        />
                      )}
                    </div>
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
            setPackageDetails(null);
          }}
        />
      )}

      {showApproveModal && (
        <ApprovePackage
          show={showApproveModal}
          onClose={() => {
            setShowApproveModal(false);
            setPackageDetails(null);
          }}
          packageID={packageDetails.id}
        />
      )}

      {showPackageDetailsModal && (
        <PackageDetails
          isOpen={showPackageDetailsModal}
          onClose={() => {
            setShowPackageDetailsModal(false);
          }}
          pkg={packageDetails}
        />
      )}
    </>
  );
};

export default AdminCustomPackagesPage;
