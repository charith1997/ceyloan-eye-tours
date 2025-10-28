import AdminDetailsContainer from "@/components/containers/AdminDetailsContainer";
import Gallery from "@/components/organisams/Gallery";
import { useGetAllHotelTypesQuery } from "@/services/hotelTypeApi";
import { Star } from "lucide-react";
import React from "react";

interface HotelDetailsProps {
  hotel: any;
  onClose: () => void;
}

function HotelDetails({ hotel, onClose }: HotelDetailsProps) {
  const { data } = useGetAllHotelTypesQuery();
  const hotelTypes = Array.isArray(data?.data) ? data.data : [];
  const hotelType = hotelTypes.find((type: any) => type.id === hotel?.type_id);
  return (
    <AdminDetailsContainer
      onClose={onClose}
      heading={
        <h3 className="text-xl font-semibold leading-6 text-gray-900">
          Hotel Details
        </h3>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="bg-gray-50 rounded-lg p-4 w-full">
          <h4 className="text-lg text-gray-900 mb-4">Hotel Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-4">
              <SingleInfo title="Name" value={hotel.name} />
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
            </div>
            <SingleInfo title="Hotel Type" value={hotelType.name} />
            <SingleInfo title="Place" value={hotel.Place.name} />
          </div>
        </div>

        <OtherDetails title="Description" value={hotel.description} />
        <OtherDetails title="Facilities" value={hotel.facilities} />
        <OtherDetails title="Room Details" value={hotel.rooms_details} />

        <Gallery
          images={hotel.images.map((image: any) => ({
            src: image,
            alt: `Packaged Id ${image}`,
          }))}
        />
      </div>
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
