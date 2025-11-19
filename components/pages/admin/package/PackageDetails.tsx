import AdminDetailsContainer from "@/components/containers/AdminDetailsContainer";
import { displayTourType } from "@/utils/common";
import { Star } from "lucide-react";
import React from "react";
import TravelItinerary from "./TravelItinerary";
import Gallery from "@/components/organisams/Gallery";

interface PackageDetailsProps {
  pkg: any;
  onClose: () => void;
}

function PackageDetails({ pkg, onClose }: PackageDetailsProps) {
  return (
    <AdminDetailsContainer
      onClose={onClose}
      heading={
        <h3 className="text-xl font-semibold leading-6 text-gray-900">
          Package Details
        </h3>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="bg-gray-50 rounded-lg p-4 w-full">
          <h4 className="text-lg text-gray-900 mb-4">Package Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SingleInfo title="Title" value={pkg.title} />
            <SingleInfo title="Duration" value={pkg.duration} />
            <SingleInfo title="Price" value={`$ ${pkg.price}`} />
            <SingleInfo
              title="Tour Type"
              value={displayTourType(pkg.tour_type)}
            />
            {pkg.rating > 0 ? (
              <div className="flex items-center text-sm gap-2">
                <div className="text-gray-600">Rating:</div>
                <div className="flex text-yellow-500">
                  {Array.from({ length: pkg.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 w-full">
          <h4 className="text-lg text-gray-900 mb-4">Travel Information</h4>
          <div className="grid grid-cols-1 gap-4">
            <SingleInfo title="Arrival Location" value={pkg.arrival_location} />
            <SingleInfo title="Description" value={pkg.arrival_description} />
            <SingleInfo
              title="Departure Location"
              value={pkg.departure_location}
            />
            <SingleInfo title="Description" value={pkg.departure_description} />
          </div>
        </div>

        <OtherDetails
          title="Categories"
          value={pkg.Categories.map((category: any) => category.name)}
        />

        <OtherDetails title="Descriptions" value={pkg.description} />

        <OtherDetails
          title="Package Highlights"
          value={pkg.package_highlights}
        />

        <OtherDetails title="Package Includes" value={pkg.includes} />

        <OtherDetails title="Package Excludes" value={pkg.excludes} />

        <TravelItinerary id={pkg.url_prefix} />

        <Gallery
          images={pkg.Images.map((image: any) => ({
            src: image.image_url,
            alt: `Packaged Id ${image.id}`,
          }))}
        />
      </div>
    </AdminDetailsContainer>
  );
}

export default PackageDetails;

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
