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
import { approveBtnColor, editBtnColor, updateBtnColor, viewBtnColor } from "@/styles/colors";

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
              <div className="hidden md:grid grid-cols-3 w-full items-center p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-8">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm flex gap-2 items-center">
                      <User fill="black" width={16} />
                      {item.User.name}
                    </div>
                    <span className="flex text-sm gap-2 items-center">
                      <MapPin width={16} /> {item.User.country}
                    </span>
                  </div>
                </div>

                <div className="block justify-items-center">
                  <div
                    className={`px-2.5 py-0.5 rounded-full text-xs ${
                      item.is_approved === true
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {!item.is_approved ? "pending" : "approved"}
                  </div>
                </div>

                <div className="flex gap-4 justify-end">
                  {!item.is_approved && (
                    <Button
                      label={`${
                        checkIfSortedOrder(item?.CustomizePackagePlaces || [])
                          ? "Edit Order"
                          : "Sort Order"
                      }`}
                      className={`w-fit ${
                        checkIfSortedOrder(item?.CustomizePackagePlaces || [])
                          ? `${editBtnColor}`
                          : `${updateBtnColor}`
                      } uppercase text-sm`}
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
                        className={`w-fit ${approveBtnColor} uppercase text-sm`}
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
                      className={`w-fit text-sm uppercase ${viewBtnColor}`}
                    />
                  )}
                </div>
              </div>

              <div className="flex md:hidden w-full items-center justify-between p-3 gap-2 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col w-full gap-4">
                  <div className="flex gap-2 items-center text-sm">
                    <User fill="black" width={16} />
                    {item.User.name}
                    <div
                      className={`w-min px-2.5 py-0.5 rounded-full text-xs ${
                        item.is_approved === true
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {item.is_approved === false ? "pending" : "approved"}
                    </div>
                  </div>
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
                          className={`w-fit ${
                            checkIfSortedOrder(
                              item?.CustomizePackagePlaces || []
                            )
                              ? `${editBtnColor}`
                              : `${updateBtnColor}`
                          }`}
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
                            className={`w-fit ${approveBtnColor}`}
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
                          className={`w-fit ${viewBtnColor}`}
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
