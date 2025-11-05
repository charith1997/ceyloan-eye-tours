import React from "react";
import Button from "@/components/atoms/Button";
import FileUploader from "@/components/atoms/FileUploader";
import { FormikInput } from "@/components/atoms/FormikInput";
import Modal from "@/components/molecules/Modal";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useCreateCategoryMutation } from "@/services/categoryApi";
import FormikDropdown from "@/components/atoms/FormikDropdown";
import { useGetAllPlacesQuery } from "@/services/placesApi";
import { useGetAllActivitiesQuery } from "@/services/activityApi";
import { useCreatePlaceActivityMutation } from "@/services/placeActivity";
import { cancelBtnColor, saveBtnColor } from "@/styles/colors";

interface AddPlaceActivityProps {
  show: boolean;
  onClose: () => void;
}

function AddPlaceActivity({ show, onClose }: AddPlaceActivityProps) {
  const [createPlaceActivity] = useCreatePlaceActivityMutation();
  const { data: placeData } = useGetAllPlacesQuery();
  const { data: activityData } = useGetAllActivitiesQuery();
  const places = Array.isArray(placeData?.data) ? placeData.data : [];
  const activities = Array.isArray(activityData?.data) ? activityData.data : [];
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Place Activity Form"
      className="md:w-2xl"
    >
      <Formik
        initialValues={{
          placeid: "",
          activityid: "",
          description: "",
          price: "",
          image: null,
        }}
        validationSchema={Yup.object({
          placeid: Yup.string().required("* Place is Required"),
          activityid: Yup.string().required("* Activity is Required"),
          description: Yup.string().required("* Description is Required"),
          price: Yup.number()
            .required("* Price is Required")
            .min(0, "* Price must be positive"),
          image: Yup.mixed().required("* Image is required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          formData.append("placeId", values.placeid);
          formData.append("activityId", values.activityid);
          formData.append("price", values.price);
          formData.append("description", values.description);
          if (values.image) {
            formData.append("image", values.image);
          }

          try {
            const response = await createPlaceActivity(formData).unwrap();
            toast.success(response.message);
            resetForm();
            onClose();
          } catch (err: any) {
            toast.error(err?.data?.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="space-y-4 flex-1 overflow-y-auto py-2 pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-8">
            <FormikDropdown
              label="Place:"
              name="placeid"
              options={places.map((place: any) => ({
                value: place.id,
                label: place.name,
              }))}
              defaultOption="Select Place"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-8">
            <FormikDropdown
              label="Activity:"
              name="activityid"
              options={activities.map((activity: any) => ({
                value: activity.id,
                label: activity.name,
              }))}
              defaultOption="Select Activity"
            />

            <FormikInput
              label="Price:"
              name="price"
              placeholder="Enter price"
              type="number"
              min={0}
            />
          </div>

          <FormikInput
            label="Description:"
            name="description"
            placeholder="Enter description"
          />

          <FileUploader name="image" label="Upload Image" />

          <div className="flex gap-6">
            <Button
              onClick={onClose}
              className={`w-full ${cancelBtnColor}`}
              label="Cancel"
            />
            <Button
              type="submit"
              className={`w-full ${saveBtnColor}`}
              label="Save"
            />
          </div>
        </Form>
      </Formik>
    </Modal>
  );
}

export default AddPlaceActivity;
