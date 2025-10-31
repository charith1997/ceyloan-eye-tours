import React, { useState } from "react";
import { BookText, Component } from "lucide-react";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import { useGetAllActivitiesQuery } from "@/services/activityApi";
import AddActivity from "./AddActivity";
import DeleteActivity from "./DeleteActivity";
import DetailContainer from "@/components/containers/DetailContainer";
import Image from "next/image";
import { deleteBtnColor, editBtnColor } from "@/styles/colors";
import { checkImageUrl } from "@/utils/common";

const AdminActivityPage = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const { data } = useGetAllActivitiesQuery();
  const activities = Array.isArray(data?.data) ? data.data : [];

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder="Search Activities..."
          title="Activities"
          buttonName="Add Activity"
          onClick={() => setShowModal(true)}
        />

        <DetailContainer className="max-h-[calc(100vh-307px)] md:max-h-[calc(100vh-182px)]">
          {activities.map((activity: any, index: number) => (
            <div key={index}>
              <div className="hidden md:flex w-full items-center justify-between p-2 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-8">
                  <Image
                    src={checkImageUrl(activity.image_url)}
                    alt={`Activity ${activity.id}`}
                    width={120}
                    height={100}
                    className="object-cover rounded-lg w-28 h-28"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-md font-bold uppercase">
                      {activity.name}
                    </h3>
                    <p className="flex text-sm gap-2 items-center">
                      <BookText width={16} />
                      {activity.description}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    label="Edit"
                    className={`w-fit text-sm uppercase ${editBtnColor}`}
                    onClick={() => {
                      setIsEdit(true);
                      setSelectedActivity(activity);
                      setShowModal(true);
                    }}
                  />
                  <Button
                    label="Delete"
                    className={`w-fit text-sm uppercase ${deleteBtnColor}`}
                    onClick={() => {
                      setSelectedActivity(activity);
                      setDeleteModal(true);
                    }}
                  />
                </div>
              </div>

              <div className="flex md:hidden w-full items-center p-2 gap-6 rounded-lg shadow-sm border border-gray-200">
                <Image
                  src={checkImageUrl(activity.image_url)}
                  alt={`Tour ${activity.id}`}
                  width={160}
                  height={160}
                  className="object-cover rounded-lg w-36 h-36"
                />
                <div className="grid gap-2">
                  <div className="flex flex-col gap-1 text-sm">
                    <h3 className="font-bold uppercase">{activity.name}</h3>
                    <p className="flex gap-2 items-center">
                      <BookText width={16} />
                      {activity.description}
                    </p>
                  </div>
                  <div className="flex gap-4 justify-end">
                    <Button
                      label="Edit"
                      className={`w-fit ${editBtnColor}`}
                      onClick={() => {
                        setIsEdit(true);
                        setSelectedActivity(activity);
                        setShowModal(true);
                      }}
                    />
                    <Button
                      label="Delete"
                      className={`w-fit ${deleteBtnColor}`}
                      onClick={() => {
                        setSelectedActivity(activity);
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

      <AddActivity
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedActivity(null);
          setIsEdit(false);
        }}
        isEdit={isEdit}
        initialValues={
          isEdit
            ? { ...selectedActivity, image: selectedActivity.image_url }
            : null
        }
      />
      <DeleteActivity
        show={deleteModal}
        onClose={() => setDeleteModal(false)}
        selectedID={selectedActivity?.id}
      />
    </>
  );
};

export default AdminActivityPage;
