import Button from "@/components/atoms/Button";
import { useGetCustomPackagesByUserIDQuery } from "@/services/customPackageApi";
import { getUserDetails } from "@/utils/auth";
import React, { useState } from "react";
import BookingItinerary from "./BookingItinerary";
import BookPackage from "@/components/organisams/BookPackage";
import { viewBtnColor } from "@/styles/colors";
import PackageDetails from "./PackageDetails";

function CustomPackages() {
  const [showBooking, setShowBooking] = useState(false);
  const [packageId, setPackageId] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null as any);
  const [showItinerary, setShowItinerary] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { userId } = getUserDetails();

  const { data } = useGetCustomPackagesByUserIDQuery(userId);
  const packages = Array.isArray(data?.data) ? [...data.data].reverse() : [];

  return (
    <div>
      <div className="max-w-full">
        {packages.length === 0 && (
          <div className="flex items-center justify-center p-6 border border-dashed rounded-lg text-gray-500 mt-12">
            No customize packages to display
          </div>
        )}
        {packages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-6">
            {packages.map((pkg: any, index: number) => (
              <div
                key={pkg.id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-100 h-fit"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="font-bold">Custom Package {index + 1}</div>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs  ${
                      pkg?.is_approved
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {pkg?.is_approved ? "Approved" : "Not Approved"}
                  </span>
                </div>
                {pkg.is_approved && (
                  <p className="text-gray-600 text-sm">{`${
                    pkg.required_day_count
                  } days / ${Number(pkg.required_day_count) - 1} nights`}</p>
                )}
                <p className="text-gray-600 text-sm">{pkg.message}</p>
                <div className="flex justify-end mt-4 gap-2">
                  <Button
                    label="View Details"
                    className={`w-fit text-sm ${viewBtnColor}`}
                    onClick={() => {
                      setShowDetails(true);
                      setSelectedPackage(pkg);
                    }}
                  />
                  {pkg.is_approved && (
                    <>
                      <Button
                        label="View Itinerary"
                        className="w-auto text-white p-2 rounded-lg bg-gray-500 text-sm font-semibold"
                        onClick={() => {
                          setShowItinerary(true);
                          setSelectedPackage(pkg.CustomizePackagePlaces);
                        }}
                      />
                      <Button
                        label="Book Now"
                        onClick={() => {
                          setShowBooking(true);
                          setPackageId(pkg.id);
                        }}
                        className="w-auto text-white p-2 rounded-lg bg-red text-sm font-semibold"
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showItinerary && (
        <BookingItinerary
          data={selectedPackage}
          onClose={() => {
            setShowItinerary(false);
            setSelectedPackage(null);
          }}
        />
      )}

      <BookPackage
        show={showBooking}
        onClose={() => setShowBooking(false)}
        customPackageId={packageId}
      />

      {showDetails && (
        <PackageDetails
          onClose={() => setShowDetails(false)}
          pkg={selectedPackage}
        />
      )}
    </div>
  );
}

export default CustomPackages;
