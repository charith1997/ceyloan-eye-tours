import React, { useEffect, useState } from "react";
import { BookText } from "lucide-react";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import { useLazyGetAllActivitiesPaginatedQuery } from "@/services/activityApi";
import AddActivity from "./AddActivity";
import DeleteActivity from "./DeleteActivity";
import DetailContainer from "@/components/containers/DetailContainer";
import Image from "next/image";
import { deleteBtnColor, editBtnColor, viewBtnColor } from "@/styles/colors";
import { checkImageUrl } from "@/utils/common";
import ActivityDetails from "./ActivityDetails";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setCurrentPage, setTotalPages } from "@/features/paginatorSlice";

const AdminActivityPage = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [activities, setActivities] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [getAllActivitiesPaginated] = useLazyGetAllActivitiesPaginatedQuery();
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.paginator
  );
  const dispatch = useDispatch();

  const getAllActivities = async () => {
    const params: any = {
      page: currentPage,
      size: 10,
    };

    if (searchQuery.trim()) {
      params.search = searchQuery.trim();
    }

    const { data } = await getAllActivitiesPaginated(params);

    if (data?.success) {
      setActivities(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getAllActivities();
    }
  }, [currentPage, searchQuery]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (totalPages) {
      if (currentPage > totalPages) {
        dispatch(setCurrentPage(1));
      }
    }
  }, [totalPages]);

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder="Search Activities..."
          title="Activities"
          buttonName="Add Activity"
          onClick={() => setShowModal(true)}
          onSearchChange={handleSearchChange}
        />

        <DetailContainer className="max-h-[calc(100vh-377px)] md:max-h-[calc(100vh-260px)]">
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
                      <span
                        className="truncate max-w-2xl"
                        title={activity.description}
                      >
                        {activity.description}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    label="View Details"
                    className={`w-fit text-sm uppercase ${viewBtnColor}`}
                    onClick={() => {
                      setDisplayDetails(true);
                      setSelectedActivity(activity);
                    }}
                  />
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

              <div className="flex md:hidden w-full items-center py-2 px-4 gap-6 rounded-lg shadow-sm border border-gray-200">
                <div className="grid gap-2">
                  <div className="flex flex-col gap-1 text-sm">
                    <h3 className="font-bold uppercase">{activity.name}</h3>
                    <p className="flex gap-2 items-center">
                      <BookText width={16} height={16} />
                      <span
                        className="line-clamp-2 w-full"
                        title={activity.description}
                      >
                        {activity.description}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-4 justify-end">
                    <Button
                      label="View Details"
                      className={`w-fit ${viewBtnColor}`}
                      onClick={() => {
                        setDisplayDetails(true);
                        setSelectedActivity(activity);
                      }}
                    />
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

      {displayDetails && (
        <ActivityDetails
          activity={selectedActivity}
          onClose={() => {
            setDisplayDetails(false);
            setSelectedActivity(null);
          }}
        />
      )}
    </>
  );
};

export default AdminActivityPage;
