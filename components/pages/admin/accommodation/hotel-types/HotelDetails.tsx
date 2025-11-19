import AdminDetailsContainer from "@/components/containers/AdminDetailsContainer";
import { useGetHotelTypeByUrlPrefixQuery } from "@/services/hotelTypeApi";
import { checkImageUrl } from "@/utils/common";
import { Star } from "lucide-react";
import React from "react";

interface HotelDetailsProps {
  hotelURL: any;
  onClose: () => void;
}

function HotelDetails({ hotelURL, onClose }: HotelDetailsProps) {
  const { data } = useGetHotelTypeByUrlPrefixQuery(hotelURL);
  console.log("data", data);
  const hotelTypeData = data?.data ?? {};
  console.log("hotelTypeData", hotelTypeData);

  return (
    <AdminDetailsContainer
      onClose={onClose}
      heading={
        <h3 className="text-xl font-semibold leading-6 text-gray-900">
          Hotel Type Details
        </h3>
      }
    >
      <>
        <div className="block md:flex gap-4">
          <img
            src={checkImageUrl(hotelTypeData.image_url)}
            alt={hotelTypeData.name}
            className="object-cover rounded-lg w-full md:max-w-60 max-h-60"
          />
          <div className="bg-gray-50 rounded-lg p-4 w-full">
            <h4 className="text-lg text-gray-900 mb-4">
              Hotel Type Information
            </h4>
            <div className="flex flex-col gap-4 pb-4 text-sm">
              <SingleInfo title="Name" value={hotelTypeData.name} />
              <SingleInfo
                title="Hotel Count"
                value={hotelTypeData.hotelCount}
              />
            </div>
            <SingleInfo title="Description" value={hotelTypeData.description} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-gray-50 rounded-lg p-4 w-full">
            <h4 className="text-lg text-gray-900 mb-4">Hotels Details</h4>
            {hotelTypeData.Hotels && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hotelTypeData.Hotels.length > 0 &&
                  hotelTypeData.Hotels.map((hotel: any) => (
                    <ul key={hotel.id} className="flex gap-2 pl-4">
                      <li className=" text-gray-900 list-disc">{hotel.name}</li>
                      {hotel.rating > 0 ? (
                        <div className="flex text-yellow-500">
                          {Array.from({ length: hotel.rating }).map((_, i) => (
                            <Star
                              key={i}
                              size={20}
                              fill="currentColor"
                              strokeWidth={0}
                            />
                          ))}
                        </div>
                      ) : null}
                    </ul>
                  ))}
              </div>
            )}
          </div>
        </div>
      </>
    </AdminDetailsContainer>
  );
}

export default HotelDetails;

interface SingleInfoProps {
  title: string;
  value: string;
}

const SingleInfo = ({ title, value }: SingleInfoProps) => (
  <div className="flex gap-2 text-sm">
    <p className="text-gray-600">{title}:</p>
    <p className="text-gray-900">{value}</p>
  </div>
);
