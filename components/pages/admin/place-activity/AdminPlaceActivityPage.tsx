import React, { useState } from "react";
import { Component, MapPin } from "lucide-react";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import DetailContainer from "@/components/containers/DetailContainer";
import Image from "next/image";
import DeletePlaceActivity from "./DeletePlaceActivity";
import { useGetAllPlaceActivitiesQuery } from "@/services/placeActivity";
import PlaceActivities from "./PlaceActivities";
import AddPlaceActivity from "./AddPlaceActivity";

const AdminPlaceActivityPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(
    null
  );
  const [activities, setActivities] = useState<any[]>([]);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const { data, error } = useGetAllPlaceActivitiesQuery();
  const placeActivities = Array.isArray(data?.data) ? data.data : [];

  const displayDeleteModal = (id: string) => {
    setSelectedActivityId(id);
    setShowDeleteModal(true);
  };

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder="Search Place Activity..."
          title="Place Activities"
          buttonName="Add Place Activity"
          onClick={() => setShowAddActivityModal(true)}
        />
        <DetailContainer className="max-h-[calc(100vh-182px)] overflow-y-auto scrollbar-thin scroll-smooth py-2">
          {placeActivities.map(
            ({ placeDetails, activities }: any, index: number) => (
              <div key={index}>
                <div className="hidden md:flex w-full items-center justify-between p-2 border-2 rounded-lg border-orange">
                  <div className="flex items-center gap-8">
                    <Image
                      src={placeDetails.image_url}
                      alt={`Activity ${placeDetails.name} ${placeDetails.location}`}
                      width={120}
                      height={100}
                      className="object-cover rounded-lg w-28 h-28"
                    />
                    <div className="flex flex-col gap-2">
                      <h3 className="text-md font-bold uppercase">
                        {placeDetails.name}
                      </h3>
                      <p className="flex text-sm gap-2 items-center">
                        <MapPin width={16} />
                        {placeDetails.location}
                      </p>
                      <span className="flex text-sm gap-2 items-center">
                        <Component width={16} /> longitude latitude
                      </span>
                    </div>
                  </div>

                  <Button
                    label="View Activities"
                    className="w-auto p-2 rounded-lg text-white bg-[#1976D2] text-sm uppercase"
                    onClick={() => {
                      setActivities(activities);
                      setShowModal(true);
                      setSelectedPlaceId(placeDetails.id);
                    }}
                  />
                </div>

                <div className="flex md:hidden w-full items-center justify-between p-2 border-2 rounded-lg border-orange gap-2">
                  <Image
                    src={placeDetails.image_url}
                    alt={`Activity ${placeDetails.name} ${placeDetails.location}`}
                    width={160}
                    height={160}
                    className="object-cover rounded-lg w-36 h-36"
                  />
                  <div className="grid gap-2">
                    <div className="flex flex-col gap-1 text-sm">
                      <h3 className="font-bold uppercase">
                        {placeDetails.name}
                      </h3>
                      <p className="flex gap-2 items-center">
                        <MapPin width={16} />
                        {placeDetails.location}
                      </p>
                      <p className="flex gap-2 items-center">
                        <Component width={16} />
                        longitude latitude
                      </p>
                    </div>
                    <Button
                      label="View Activities"
                      className="w-auto p-2 rounded-lg text-white bg-[#1976D2] text-sm uppercase"
                      onClick={() => {
                        setActivities(activities);
                        setShowModal(true);
                        setSelectedPlaceId(placeDetails.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </DetailContainer>
      </NavigationContainer>

      <AddPlaceActivity
        show={showAddActivityModal}
        onClose={() => setShowAddActivityModal(false)}
      />

      <PlaceActivities
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedPlaceId(null);
          setActivities([]);
        }}
        activities={activities}
        showDeleteModal={displayDeleteModal}
      />

      <DeletePlaceActivity
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedActivityId(null);
        }}
        placeId={selectedPlaceId}
        activityId={selectedActivityId}
        callback={() => {
          setShowModal(false);
          setSelectedPlaceId(null);
          setActivities([]);
        }}
      />
    </>
  );
};

export default AdminPlaceActivityPage;
