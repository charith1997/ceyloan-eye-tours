import React from "react";
import { BookText, Component } from "lucide-react";
import { Input } from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import ListContainer from "@/components/containers/ListContainer";
import Modal from "@/components/molecules/Modal";
import Dropdown from "@/components/atoms/Dropdown";
import {
  useAddActivityMutation,
  useDeleteActivityMutation,
  useGetAllActivitiesQuery,
} from "@/services/activityApi";
import toast from "react-hot-toast";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/services/categoryApi";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikInput } from "@/components/atoms/FormikInput";
import FileUploader from "@/components/atoms/FileUploader";
import AddActivity from "./AddActivity";
import DeleteActivity from "./DeleteActivity";
import DetailContainer from "@/components/containers/DetailContainer";
import Image from "next/image";

const cardDetails = (item: { name: string; description: string }) => (
  <div className="flex flex-col gap-2">
    <h3 className="text-md font-bold uppercase">{item.name}</h3>
    <p className="flex text-sm gap-2 items-center">
      <BookText width={16} />
      {item.description}
    </p>
  </div>
);

const priceDetails = () => null;

const actionButtons = (
  item: { id: string },
  displayDeleteModal: (value: boolean) => void,
  setID: (value: string) => void
) => {
  return (
    <div className="flex gap-4">
      <Button
        label="Edit"
        className="w-20 p-2 rounded-lg text-white bg-orange text-sm uppercase"
      />
      <Button
        label="Delete"
        className="w-20 p-2 rounded-lg text-white bg-red text-sm uppercase"
        onClick={() => {
          displayDeleteModal(true);
          setID(item.id);
        }}
      />
    </div>
  );
};

const mobileViewCardDetails = (item: {
  name: string;
  description: string;
  packageCount: number;
}) => (
  <div className="flex flex-col gap-1 text-sm">
    <h3 className="font-bold uppercase">{item.name}</h3>
    <p className="flex gap-2 items-center">
      <BookText width={16} />
      {item.description}
    </p>
    <p className="flex gap-2 items-center">
      <Component width={16} />
      {`Package Count: ${item.packageCount}`}
    </p>
  </div>
);

const textFieldClassNames =
  "w-full text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none";
const labelClassNames = "block text-sm font-medium";

const AdminActivityPage = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [selectedActivityId, setSelectedActivityId] = React.useState<
    string | null
  >(null);

  const { data, error, isLoading } = useGetAllActivitiesQuery();
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

        <DetailContainer>
          {activities.map((activity: any, index: number) => (
            <div key={index}>
              <div className="hidden md:flex w-full items-center justify-between p-2 border-2 rounded-lg border-orange">
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
                    className="w-20 p-2 rounded-lg text-white bg-orange text-sm uppercase"
                  />
                  <Button
                    label="Delete"
                    className="w-20 p-2 rounded-lg text-white bg-red text-sm uppercase"
                    onClick={() => {
                      setSelectedActivityId(activity.id);
                      setDeleteModal(true);
                    }}
                  />
                </div>
              </div>

              <div className="flex md:hidden w-full items-center justify-between p-2 border-2 rounded-lg border-orange gap-2">
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
                    <Button
                      label="Edit"
                      className="w-20 p-2 rounded-lg text-white bg-orange text-sm uppercase"
                    />
                    <Button
                      label="Delete"
                      className="w-20 p-2 rounded-lg text-white bg-red text-sm uppercase"
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
