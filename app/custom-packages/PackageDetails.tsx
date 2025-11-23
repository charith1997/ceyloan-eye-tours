import AdminDetailsContainer from "@/components/containers/AdminDetailsContainer";
import React from "react";
import Image from "next/image";
import { checkImageUrl } from "@/utils/common";

interface PackageDetailsProps {
  pkg: any;
  onClose: () => void;
}

function PackageDetails({ pkg, onClose }: PackageDetailsProps) {
  const isApproved = pkg.is_approved;
  return (
    <AdminDetailsContainer
      onClose={onClose}
      heading={
        <div className="flex items-center">
          <h3 className="text-xl font-semibold leading-6 text-gray-900">
            Package Details
          </h3>
          <div className="ml-4 flex items-center">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border ${
                pkg.is_approved
                  ? "bg-green-100 text-green-800 border-green-200"
                  : "bg-yellow-200 text-yellow-800 border-yellow-200"
              }`}
            >
              {pkg.is_approved ? "Approved" : "Not Approved"}
            </span>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="bg-gray-50 rounded-lg p-4 w-full">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Package Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isApproved && (
              <SingleInfo
                title="Required Days"
                value={pkg.required_day_count.toString()}
              />
            )}
            {isApproved && <SingleInfo title="Price" value={`$${pkg.price}`} />}
            <SingleInfo
              title="Created At"
              value={new Date(pkg.created_at).toLocaleDateString()}
            />
          </div>
          {pkg.message && (
            <div className="mt-4">
              <SingleInfo title="Message" value={pkg.message} />
            </div>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 w-full">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Places & Activities ({pkg.CustomizePackagePlaces?.length || 0})
          </h4>

          <div className="space-y-4">
            {pkg.CustomizePackagePlaces?.map(
              (placeItem: any, index: number) => (
                <div
                  key={placeItem.id}
                  className="bg-white rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex flex-col md:flex-row items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="relative w-full md:w-32 h-32 rounded-lg overflow-hidden bg-gray-200">
                        <Image
                          src={checkImageUrl(placeItem.Place.image_url)}
                          alt={placeItem.Place.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-image.jpg";
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-sm font-bold"
                          style={{ backgroundColor: "#ff803c" }}
                        >
                          {index + 1}
                        </span>
                        <h5 className="text-base font-semibold text-gray-900">
                          {placeItem.Place.name}
                        </h5>
                      </div>

                      {placeItem.description && (
                        <p className="text-sm text-gray-600 mb-3 text-justify">
                          {placeItem.description}
                        </p>
                      )}

                      {placeItem.Activities.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                            Included Activities
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <ul className="ml-4">
                              {placeItem.Activities.map((activity: any) => (
                                <li
                                  key={activity.id}
                                  className="list-disc text-gray-700 text-sm"
                                >
                                  {activity.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {(!pkg.CustomizePackagePlaces ||
            pkg.CustomizePackagePlaces.length === 0) && (
            <p className="text-sm text-gray-500 text-center py-4">
              No places added to this package yet.
            </p>
          )}
        </div>
      </div>
    </AdminDetailsContainer>
  );
}

export default PackageDetails;

const SingleInfo = ({ title, value }: { title: string; value: string }) => (
  <div className="flex gap-2 text-sm">
    <p className="text-gray-600 font-medium">{title}:</p>
    <p className="text-gray-900">{value}</p>
  </div>
);
