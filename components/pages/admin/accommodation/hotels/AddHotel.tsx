import React from "react";
import Button from "@/components/atoms/Button";
import FileUploader from "@/components/atoms/FileUploader";
import { FormikInput } from "@/components/atoms/FormikInput";
import Modal from "@/components/molecules/Modal";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useCreateHotelMutation } from "@/services/hotelApi";
import FormikDropdown from "@/components/atoms/FormikDropdown";
import { useGetAllPlacesQuery } from "@/services/placesApi";
import FormikFieldArray from "@/components/atoms/FormikFieldArray";
import AddRoomDetails from "./AddRoomDetails";
import StarRatingInput from "@/components/atoms/StarRatingInput";
import { useGetAllHotelTypesQuery } from "@/services/hotelTypeApi";

interface AddHotelProps {
  show: boolean;
  onClose: () => void;
}

function AddHotel({ show, onClose }: AddHotelProps) {
  const [createHotel] = useCreateHotelMutation();
  const { data: placeData } = useGetAllPlacesQuery();
  const places = Array.isArray(placeData?.data) ? placeData.data : [];
  const { data: hotelTypeData } = useGetAllHotelTypesQuery();
  const hotelTypes = Array.isArray(hotelTypeData?.data)
    ? hotelTypeData.data
    : [];
  return (
    <Modal isOpen={show} onClose={onClose} title="Hotel Form" className="">
      <Formik
        initialValues={{
          name: "",
          placeId: "",
          description: [""],
          facilities: [""],
          roomsDetails: [],
          rating: 5,
          typeId: "",
          images: [],
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("* Name is Required"),
          placeId: Yup.string().required("* Place is Required"),
          description: Yup.array()
            .of(Yup.string().required("* Description is required"))
            .min(1, "* At least one description is required")
            .test(
              "no-empty",
              "* Descriptions cannot be empty",
              (arr) =>
                Array.isArray(arr) && arr.every((str) => str?.trim() !== "")
            )
            .required("* Description is required"),
          facilities: Yup.array()
            .of(Yup.string().required("* Facility is required"))
            .min(1, "* At least one facility is required")
            .test(
              "no-empty",
              "* Facilities cannot be empty",
              (arr) =>
                Array.isArray(arr) && arr.every((str) => str?.trim() !== "")
            )
            .required("* Facilities are required"),
          roomsDetails: Yup.array()
            .of(
              Yup.object({
                room_type: Yup.string().required("* Room type is required"),
                description: Yup.array()
                  .of(Yup.string().required("* Room description is required"))
                  .min(1, "* At least one room description is required")
                  .test(
                    "no-empty",
                    "* Room descriptions cannot be empty",
                    (arr) =>
                      Array.isArray(arr) &&
                      arr.every((str) => str?.trim() !== "")
                  )
                  .required("* Room descriptions are required"),
              })
            )
            .min(1, "* Add at least one room")
            .required("* Rooms are required"),
          rating: Yup.number().min(1).max(5).required("* Rating is required"),
          typeId: Yup.string().required("* Hotel Type is Required"),
          images: Yup.array()
            .of(
              Yup.mixed().test(
                "fileType",
                "Only image files are allowed",
                (value) => value instanceof File
              )
            )
            .min(1, "* At least one image is required")
            .required("* Image is required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("placeId", values.placeId);
          formData.append("description", JSON.stringify(values.description));
          formData.append("facilities", JSON.stringify(values.facilities));
          formData.append("roomsDetails", JSON.stringify(values.roomsDetails));
          formData.append("rating", values.rating.toString());
          formData.append("typeId", values.typeId);
          if (Array.isArray(values.images)) {
            values.images.forEach((image: File) => {
              formData.append("images", image);
            });
          } else {
            formData.append("images", values.images);
          }

          try {
            const response = await createHotel(formData).unwrap();
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <FormikInput
              label="Hotel Name:"
              name="name"
              placeholder="Enter hotel name"
            />

            <FormikDropdown
              label="Place:"
              name="placeId"
              options={places.map((place: any) => ({
                value: place.id,
                label: place.name,
              }))}
              defaultOption="Select Place"
            />

            <FormikDropdown
              label="Hotel Type:"
              name="typeId"
              options={hotelTypes.map((type: any) => ({
                value: type.id,
                label: type.name,
              }))}
              defaultOption="Select Hotel Type"
            />

            <StarRatingInput
              name="rating"
              maxRating={5}
              label="Hotel Rating:"
            />
          </div>
          <FormikFieldArray
            name="description"
            label="Description:"
            placeholder="Enter description"
          />

          <FormikFieldArray
            name="facilities"
            label="Facilities:"
            placeholder="Enter facilities"
          />

          <AddRoomDetails name="roomsDetails" label="Room Details:" />

          <FileUploader name="images" label="Upload Images" multiple />

          <div className="flex gap-6">
            <Button
              onClick={onClose}
              className="w-full text-white px-8 py-2 rounded-lg bg-[#1976D2] text-lg font-semibold uppercase"
              label="Cancel"
            />
            <Button
              type="submit"
              className="w-full text-white px-8 py-2 rounded-lg bg-gradient-to-r from-red to-orange text-lg font-semibold uppercase"
              label="Save"
            />
          </div>
        </Form>
      </Formik>
    </Modal>
  );
}

export default AddHotel;
