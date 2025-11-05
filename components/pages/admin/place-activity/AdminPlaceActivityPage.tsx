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
import { disableBtnColor, viewBtnColor } from "@/styles/colors";
import { checkImageUrl } from "@/utils/common";
import EditActivity from "./EditActivity";

const AdminPlaceActivityPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditeModal, setShowEditModal] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const { data } = useGetAllPlaceActivitiesQuery();
  const placeActivities = Array.isArray(data?.data) ? data.data : [];

  const displayDeleteModal = (data: any) => {
    setSelectedActivity(data);
    setShowDeleteModal(true);
  };

  const displayEditModal = (data: any) => {
    setSelectedActivity(data);
    setShowEditModal(true);
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
        <DetailContainer className="max-h-[calc(100vh-307px)] md:max-h-[calc(100vh-182px)]">
          {placeActivities.map(
            ({ placeDetails, activities }: any, index: number) => (
              <div key={index}>
                <div className="hidden md:flex w-full items-center justify-between p-2 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center gap-8">
                    <Image
                      src={checkImageUrl(placeDetails.image_url)}
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
                        <Component width={16} /> Longitude:{" "}
                        {placeDetails.longitude} | Latitude:{" "}
                        {placeDetails.latitude}
                      </span>
                    </div>
                  </div>

                  {activities.length > 0 && (
                    <Button
                      label="View Activities"
                      className={`w-fit text-sm uppercase ${viewBtnColor}`}
                      onClick={() => {
                        setActivities(activities);
                        setShowModal(true);
                        setSelectedPlaceId(placeDetails.id);
                      }}
                    />
                  )}
                  {activities.length === 0 && (
                    <Button
                      label="No Activities"
                      className={`w-fit text-sm uppercase ${disableBtnColor}`}
                      onClick={() => {}}
                    />
                  )}
                </div>

                <div className="flex md:hidden w-full items-center justify-between p-2 gap-2 rounded-lg shadow-sm border border-gray-200">
                  <Image
                    src={checkImageUrl(placeDetails.image_url)}
                    alt={`Activity ${placeDetails.name} ${placeDetails.location}`}
                    width={160}
                    height={160}
                    className="object-cover rounded-lg min-w-36 h-36"
                  />
                  <div className="grid gap-4 w-full">
                    <div className="flex flex-col gap-1 text-sm">
                      <h3 className="font-bold uppercase">
                        {placeDetails.name}
                      </h3>
                      <p className="flex gap-2 items-center">
                        <MapPin width={16} />
                        {placeDetails.location}
                      </p>
                      <p className="flex gap-2 items-center">
                        <Component width={16} /> Longitude:{" "}
                        {placeDetails.longitude} | Latitude:{" "}
                        {placeDetails.latitude}
                      </p>
                    </div>
                    <Button
                      label="View Activities"
                      className={`w-fit ${viewBtnColor}`}
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
        showEditModal={displayEditModal}
      />

      <DeletePlaceActivity
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedActivity(null);
        }}
        placeId={selectedPlaceId}
        activityId={selectedActivity ? selectedActivity.id : null}
        callback={() => {
          setShowModal(false);
          setSelectedPlaceId(null);
          setActivities([]);
        }}
      />

      {showEditeModal && (
        <EditActivity
          show={showEditeModal}
          onClose={() => {
            setSelectedActivity(null);
            setShowEditModal(false);
            setShowModal(false);
            setSelectedPlaceId(null);
            setActivities([]);
          }}
          initialValues={{
            ...selectedActivity,
            image: selectedActivity.image_url_custom,
          }}
          placeId={selectedPlaceId}
        />
      )}
    </>
  );
};

export default AdminPlaceActivityPage;
