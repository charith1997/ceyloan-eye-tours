import AdminDetailsContainer from "@/components/containers/AdminDetailsContainer";
import { MapPin, UserIcon } from "lucide-react";
import React from "react";
import TravelItinerary from "./TravelItinerary";

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
  onClose: () => void;
}

const PackageDetails: React.FC<PackageDetailsProps> = ({ pkg, onClose }) => {
  return (
    <AdminDetailsContainer
      onClose={onClose}
      heading={
        <>
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
        </>
      }
    >
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-lg text-gray-900 mb-3">Package Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
          <div className="flex gap-2 items-center">
            <p className="text-sm text-gray-500">Day Count:</p>
            <p className="text-sm text-gray-900">{pkg?.required_day_count}</p>
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
        <h4 className="text-lg text-gray-900 mb-4">Customer Information</h4>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <UserIcon className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Customer Name</p>
                <p className="text-sm text-gray-900">{pkg?.User.name}</p>
              </div>
            </div>

            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Country</p>
                <p className="text-sm text-gray-900">{pkg?.User.country}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {pkg?.CustomizePackagePlaces && <TravelItinerary pkg={pkg} />}
    </AdminDetailsContainer>
  );
};

export default PackageDetails;
