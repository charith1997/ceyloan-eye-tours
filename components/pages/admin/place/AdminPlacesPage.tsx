import React from "react";
import { BookText, MapPin } from "lucide-react";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import { useGetAllPlacesQuery } from "@/services/placesApi";
import DetailContainer from "@/components/containers/DetailContainer";
import Image from "next/image";
import DeletePlace from "./DeletePlace";
import AddPlace from "./AddPlace";
import { checkImageUrl } from "@/utils/common";

const AdminPlacesPage = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = React.useState<string | null>(
    null
  );
  const { data } = useGetAllPlacesQuery();
  const places = Array.isArray(data?.data) ? data.data : [];

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder="Search Places..."
          title="Places"
          buttonName="Add Place"
          onClick={() => setShowModal(true)}
        />
        <DetailContainer className="max-h-[calc(100vh-182px)] overflow-y-auto scrollbar-thin scroll-smooth py-2">
          {places.map((place: any, index: number) => (
            <div key={index}>
              <div className="hidden md:flex w-full items-center justify-between p-2 border-2 rounded-lg border-orange">
                <div className="flex items-center gap-8">
                  <Image
                    src={checkImageUrl(place.image_url)}
                    alt={`Place ${place.id}`}
                    width={120}
                    height={100}
                    className="object-cover rounded-lg w-28 h-28"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-md font-bold uppercase">
                      {place.name}
                    </h3>
                    <p className="flex text-sm gap-2 items-center">
                      <BookText width={16} />
                      {place.description}
                    </p>
                    <span className="flex text-sm gap-2 items-center">
                      <MapPin width={16} />
                      {place.location}
                    </span>
                  </div>
                </div>

                <div className="block justify-items-center text-sm">
                  <div>{`longitude: ${place.longitude}`}</div>
                  <div>{`latitude: ${place.latitude}`}</div>
                </div>

                <div className="flex gap-4">
                  <Button
                    label="Edit"
                    className="w-20 p-2 rounded-lg text-white bg-orange text-sm uppercase"
                  />
                  <Button
                    label="Delete"
                    className="w-20 p-2 rounded-lg text-white bg-red text-sm uppercase"
                    onClick={() => {
                      setSelectedPlaceId(place.id);
                      setDeleteModal(true);
                    }}
                  />
                </div>
              </div>

              <div className="flex md:hidden w-full items-center justify-between p-2 border-2 rounded-lg border-orange gap-2">
                <Image
                  src={checkImageUrl(place.image_url)}
                  alt={`Place ${place.id}`}
                  width={160}
                  height={160}
                  className="object-cover rounded-lg w-36 h-36"
                />
                <div className="grid gap-2">
                  <div className="flex flex-col gap-1 text-sm">
                    <h3 className="font-bold uppercase">{place.name}</h3>
                    <p className="flex gap-2 items-center">
                      <BookText width={16} />
                      {place.description}
                    </p>
                    <p className="flex gap-2 items-center">
                      <MapPin width={16} />
                      {place.location}
                    </p>
                    <div className="text-sm">
                      <div>{`longitude: ${place.longitude}`}</div>
                      <div>{`latitude: ${place.latitude}`}</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      label="Edit"
                      className="w-20 p-2 rounded-lg text-white bg-orange text-sm uppercase"
                    />
                    <Button
                      label="Delete"
                      className="w-20 p-2 rounded-lg text-white bg-red text-sm uppercase"
                      onClick={() => {
                        setSelectedPlaceId(place.id);
                        setDeleteModal(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </DetailContainer>
      </NavigationContainer>

      <AddPlace show={showModal} onClose={() => setShowModal(false)} />

      <DeletePlace
        show={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setSelectedPlaceId(null);
        }}
        selectedID={selectedPlaceId}
      />
    </>
  );
};

export default AdminPlacesPage;
