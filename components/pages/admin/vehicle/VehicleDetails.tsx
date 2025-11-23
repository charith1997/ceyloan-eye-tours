import AdminDetailsContainer from "@/components/containers/AdminDetailsContainer";
import { displayTourType } from "@/utils/common";
import { Star } from "lucide-react";
import React from "react";
import Gallery from "@/components/organisams/Gallery";

interface PackageDetailsProps {
  vehicle: any;
  onClose: () => void;
}

function VehicleDetails({ vehicle, onClose }: PackageDetailsProps) {
  return (
    <AdminDetailsContainer
      onClose={onClose}
      heading={
        <h3 className="text-xl font-semibold leading-6 text-gray-900">
          Vehicle Details
        </h3>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="bg-gray-50 rounded-lg p-4 w-full">
          <h4 className="text-lg text-gray-900 mb-4">Vehicle Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SingleInfo title="Model" value={vehicle.name} />
            <SingleInfo
              title="Passenger Count"
              value={vehicle.passenger_capacity}
            />
            <SingleInfo title="Price" value={`$ ${vehicle.price}`} />
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 w-full">
          <h4 className="text-lg text-gray-900 mb-4">Owner Information</h4>
          <div className="grid grid-cols-1 gap-4">
            <SingleInfo title="Name" value={vehicle.owner} />
            <SingleInfo
              title="Telephone Number"
              value={vehicle.owner_contact}
            />
            <SingleInfo title="Location" value={vehicle.location} />
          </div>
        </div>

        <OtherDetails title="Descriptions" value={vehicle.descriptions} />
        <OtherDetails title="Facilities" value={vehicle.facilities} />
        <OtherDetails title="Excludes" value={vehicle.excludes} />
        <OtherDetails title="Terms" value={vehicle.terms} />

        <Gallery
          images={vehicle.images.map((image: any) => ({
            src: image,
            alt: `Vehicle ${vehicle.name}`,
          }))}
        />
      </div>
    </AdminDetailsContainer>
  );
}

export default VehicleDetails;

const SingleInfo = ({ title, value }: { title: string; value: string }) => (
  <div className="flex gap-2 text-sm">
    <p className="text-gray-600">{title}:</p>
    <p className="text-gray-900">{value}</p>
  </div>
);

const OtherDetails = ({ title, value }: { title: string; value: any[] }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 w-full">
      <h4 className="text-lg text-gray-900 mb-4">{title}</h4>
      <ul className="text-sm pl-4">
        {value.map((des: string, index: number) => (
          <li className="list-disc pb-1" key={index}>
            {des}
          </li>
        ))}
      </ul>
    </div>
  );
};
