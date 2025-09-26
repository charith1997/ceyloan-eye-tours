import { MapPin, UserIcon, XIcon } from "lucide-react";
import React from "react";

interface Activities {
  name: string;
}

interface Place {
  name: string;
}

interface Package {
  title: string;
}

interface CustomizePackagePlaces {
  id: string;
  sort_order: number;
  day_no: number;
  description: string;
  Place: Place;
  Activities: Activities[];
}

interface User {
  name: string;
  country: string;
}

interface Package {
  id: string;
  required_day_count: number;
  message: string;
  price: string;
  is_approved: boolean;
  Package?: Package | null;
  CustomizePackagePlaces?: CustomizePackagePlaces[] | null;
  User: User;
}

interface PackageDetailsProps {
  pkg: Package | null;
  isOpen: boolean;
  onClose: () => void;
}

const PackageDetails: React.FC<PackageDetailsProps> = ({ pkg, onClose }) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const sortedData = (data: any) => {
    return data.slice().sort((a: any, b: any) => {
      if (a.day_no === b.day_no) {
        return a.sort_order - b.sort_order;
      }
      return a.day_no - b.day_no;
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-75 transition-opacity"
          onClick={handleBackdropClick}
        />

        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-4xl">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h3 className="text-xl font-semibold leading-6 text-gray-900">
                  Package Details
                </h3>
                <div className="ml-4 flex items-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs  ${
                      pkg?.is_approved
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {pkg?.is_approved ? "Approved" : "Not Approved"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg text-gray-900 mb-3">
                  Package Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                  <div className="flex gap-2 items-center">
                    <p className="text-sm text-gray-500">Day Count:</p>
                    <p className="text-sm text-gray-900">
                      {pkg?.required_day_count}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="text-sm text-gray-500">Price:</p>
                    <p className="text-sm text-gray-900">LKR {pkg?.price}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Message</p>
                  <p className="mt-1 text-sm text-gray-900">{pkg?.message}</p>
                </div>
              </div>

              <div>
                <h4 className="text-lg text-gray-900 mb-4">
                  Customer Information
                </h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <UserIcon className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Customer Name</p>
                        <p className="text-sm text-gray-900">
                          {pkg?.User.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Country</p>
                        <p className="text-sm text-gray-900">
                          {pkg?.User.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {pkg?.CustomizePackagePlaces && (
                <div>
                  <h4 className="text-lg text-gray-900 mb-4">
                    Travel Itinerary
                  </h4>
                  {sortedData(pkg.CustomizePackagePlaces).map((item: any) => (
                    <div
                      className="bg-white border border-gray-200 rounded-lg p-4 mb-2"
                      key={item.id}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex gap-2 items-center">
                          <p className="text-sm text-gray-500">Day No:</p>
                          <p className="text-sm text-gray-900">
                            {item?.day_no}
                          </p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <p className="text-sm text-gray-500">Sort Order:</p>
                          <p className="mt-1 text-sm text-gray-900">
                            {item?.sort_order}
                          </p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <p className="text-sm text-gray-500">Place:</p>
                          <p className="text-sm text-gray-900">
                            {item?.Place.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
