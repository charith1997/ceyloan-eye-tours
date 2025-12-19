import React, { useCallback, useEffect, useState } from "react";
import { BookText, MapPin } from "lucide-react";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import { useLazyGetAllPlacesPaginatedQuery } from "@/services/placesApi";
import DetailContainer from "@/components/containers/DetailContainer";
import Image from "next/image";
import DeletePlace from "./DeletePlace";
import AddPlace from "./AddPlace";
import { checkImageUrl } from "@/utils/common";
import { deleteBtnColor, editBtnColor, viewBtnColor } from "@/styles/colors";
import PlaceDetails from "./PlaceDetails";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";

const AdminPlacesPage = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [selectedPlace, setSelectedPlace] = React.useState<any | null>(null);
  const [displayDetails, setDisplayDetails] = React.useState(false);
  const [filteredPlaces, setFilteredPlaces] = React.useState<any[]>([]);

  const [places, setPlaces] = useState<any[]>([]);
  const [getAllPlacesPaginated] = useLazyGetAllPlacesPaginatedQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);

  const dispatch = useDispatch();

  const getAllPlaces = async () => {
    const { data } = await getAllPlacesPaginated({
      page: currentPage,
      size: 10,
    });
    if (data.success) {
      setPlaces(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getAllPlaces();
    }
  }, [currentPage]);

  const handleSearchChange = useCallback((filtered: any[]) => {
    setFilteredPlaces(filtered);
  }, []);

  React.useEffect(() => {
    setFilteredPlaces(places);
  }, [places.length]);

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder="Search Places..."
          title="Places"
          buttonName="Add Place"
          onClick={() => setShowModal(true)}
          data={places}
          searchKeys={["name"]}
          onSearchChange={handleSearchChange}
        />
        <DetailContainer className="max-h-[calc(100vh-377px)] md:max-h-[calc(100vh-260px)]">
          {filteredPlaces.map((place: any, index: number) => (
            <div key={index}>
              <div className="hidden md:flex w-full items-center justify-between p-2 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-8">
                  <img
                    src={checkImageUrl(place.image_url)}
                    alt={`Place ${place.id}`}
                    className="object-cover rounded-lg w-28 h-28"
                  />
                  <div className="flex flex-col gap-2 w-full">
                    <h3 className="text-md font-bold uppercase">
                      {place.name}
                    </h3>
                    <p className="flex text-sm gap-2 items-center">
                      <BookText width={16} />
                      <span
                        className="truncate max-w-2xl"
                        title={place.description}
                      >
                        {place.description}
                      </span>
                    </p>
                    <span className="flex text-sm gap-2 items-center">
                      <MapPin width={16} />
                      {place.location}
                    </span>
                  </div>
                </div>

                {/* <div className="block justify-items-center text-sm gap-2">
                  <div>{`longitude: ${place.longitude}`}</div>
                  <div>{`latitude: ${place.latitude}`}</div>
                </div> */}

                <div className="flex gap-4">
                  <Button
                    label="View Details"
                    className={`w-fit text-sm uppercase ${viewBtnColor}`}
                    onClick={() => {
                      setDisplayDetails(true);
                      setSelectedPlace(place);
                    }}
                  />
                  <Button
                    label="Edit"
                    className={`w-fit text-sm uppercase ${editBtnColor}`}
                    onClick={() => {
                      setSelectedPlace(place);
                      setShowModal(true);
                    }}
                  />
                  <Button
                    label="Delete"
                    className={`w-fit text-sm uppercase ${deleteBtnColor}`}
                    onClick={() => {
                      setSelectedPlace(place);
                      setDeleteModal(true);
                    }}
                  />
                </div>
              </div>

              <div className="flex md:hidden w-full items-center py-2 px-4 gap-6 rounded-lg shadow-sm border border-gray-200">
                {/* <Image
                  src={checkImageUrl(place.image_url)}
                  alt={`Place ${place.id}`}
                  width={160}
                  height={160}
                  className="object-cover rounded-lg min-w-36 h-36"
                /> */}
                <div className="grid gap-4 w-full">
                  <div className="flex flex-col gap-2 text-sm">
                    <h3 className="font-bold uppercase">{place.name}</h3>
                    <p className="flex gap-2 items-center">
                      <BookText width={16} height={16} />
                      <span
                        className="line-clamp-2 w-full"
                        title={place.description}
                      >
                        {place.description}
                      </span>
                    </p>
                    <p className="flex gap-2 items-center">
                      <MapPin width={16} />
                      {place.location}
                    </p>
                  </div>
                  <div className="flex gap-4 justify-end">
                    <Button
                      label="View Details"
                      className={`w-fit ${viewBtnColor}`}
                      onClick={() => {
                        setDisplayDetails(true);
                        setSelectedPlace(place);
                      }}
                    />
                    <Button
                      label="Edit"
                      className={`w-fit ${editBtnColor}`}
                      onClick={() => {
                        setSelectedPlace(place);
                        setShowModal(true);
                      }}
                    />
                    <Button
                      label="Delete"
                      className={`w-fit ${deleteBtnColor}`}
                      onClick={() => {
                        setSelectedPlace(place);
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

      <AddPlace
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedPlace(null);
        }}
        initialValues={
          selectedPlace
            ? {
                ...selectedPlace,
                image: selectedPlace ? selectedPlace.image_url : null,
              }
            : null
        }
        isEdit={Boolean(selectedPlace)}
      />

      <DeletePlace
        show={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setSelectedPlace(null);
        }}
        selectedID={selectedPlace?.id}
      />

      {displayDetails && (
        <PlaceDetails
          place={selectedPlace}
          onClose={() => {
            setDisplayDetails(false);
            setSelectedPlace(null);
          }}
        />
      )}
    </>
  );
};

export default AdminPlacesPage;
