import React from "react";
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

const AdminActivityPage = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [selectedActivityId, setSelectedActivityId] = React.useState<
    string | null
  >(null);

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
                    src={activity.image_url}
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
                  />
                  <Button
                    label="Delete"
                    className={`w-fit text-sm uppercase ${deleteBtnColor}`}
                    onClick={() => {
                      setSelectedActivityId(activity.id);
                      setDeleteModal(true);
                    }}
                  />
                </div>
              </div>

              <div className="flex md:hidden w-full items-center justify-between p-2 gap-2 rounded-lg shadow-sm border border-gray-200">
                <Image
                  src={activity.image_url}
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
                    <p className="flex gap-2 items-center">
                      <Component width={16} />
                      {`Package Count: ${activity.packageCount}`}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button label="Edit" className={`w-fit ${editBtnColor}`} />
                    <Button
                      label="Delete"
                      className={`w-fit ${deleteBtnColor}`}
                      onClick={() => {
                        setSelectedActivityId(activity.id);
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

      <AddActivity show={showModal} onClose={() => setShowModal(false)} />
      <DeleteActivity
        show={deleteModal}
        onClose={() => setDeleteModal(false)}
        selectedID={selectedActivityId}
      />
    </>
  );
};

export default AdminActivityPage;
