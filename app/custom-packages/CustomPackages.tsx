import Button from "@/components/atoms/Button";
import { useLazyGetCustomPackagesByUserIdPaginatedQuery } from "@/services/customPackageApi";
import { getUserDetails } from "@/utils/auth";
import React, { useEffect, useState } from "react";
import BookingItinerary from "./BookingItinerary";
import BookPackage from "@/components/organisams/BookPackage";
import {
  bookNowBtnColor,
  viewBtnColor,
  viewItineraryBtnColor,
} from "@/styles/colors";
import PackageDetails from "./PackageDetails";
import { ClockIcon, Info } from "lucide-react";
import { formatDurationForDayCount } from "@/utils/package";
import Paginator from "@/components/organisams/Paginator";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";

function CustomPackages() {
  const [showBooking, setShowBooking] = useState(false);
  const [packageId, setPackageId] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null as any);
  const [showItinerary, setShowItinerary] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { userId } = getUserDetails();

  const [packages, setPackages] = useState<any[]>([]);
  const [getCustomPackagesByUserIdPaginated] =
    useLazyGetCustomPackagesByUserIdPaginatedQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);

  const dispatch = useDispatch();

  const getAllPackages = async () => {
    const { data } = await getCustomPackagesByUserIdPaginated({
      userId: userId,
      page: currentPage,
      size: 9,
    });
    if (data.success) {
      setPackages(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getAllPackages();
    }
  }, [currentPage]);

  return (
    <>
      <div className="max-w-full pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Packages</h1>
        </div>
        {packages.length === 0 && (
          <div className="flex items-center justify-center p-6 border border-dashed rounded-lg text-gray-500 mt-12">
            No customize packages to display
          </div>
        )}
        {packages.length > 0 && (
          <div className="grid grid-cols-1 space-y-6">
            {packages.map((pkg: any, index: number) => (
              <div
                key={pkg.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-6 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center mb-2">
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
                  <div className="flex items-center text-sm text-gray-600">
                    <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                    <span>
                      {formatDurationForDayCount(
                        Number(pkg?.required_day_count)
                      )}
                    </span>
                  </div>
                )}
                {pkg.message && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Info className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{pkg.message}</span>
                  </div>
                )}
                <div className="flex flex-col gap-2 md:gap-0 md:flex-row mt-4">
                  {pkg.is_approved && (
                    <Button
                      label="View Itinerary"
                      className={`w-fit text-sm whitespace-nowrap ${viewItineraryBtnColor}`}
                      onClick={() => {
                        setShowItinerary(true);
                        setSelectedPackage(pkg.CustomizePackagePlaces);
                      }}
                    />
                  )}
                  <div className="flex md:justify-end gap-2 w-[100%]">
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
                          label="Book Now"
                          onClick={() => {
                            setShowBooking(true);
                            setPackageId(pkg.id);
                          }}
                          className={`w-fit text-sm ${bookNowBtnColor}`}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Paginator />
        </div>
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
    </>
  );
}

export default CustomPackages;
