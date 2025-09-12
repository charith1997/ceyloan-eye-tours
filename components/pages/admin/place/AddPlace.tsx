import React from "react";
import Button from "@/components/atoms/Button";
import FileUploader from "@/components/atoms/FileUploader";
import { FormikInput } from "@/components/atoms/FormikInput";
import Modal from "@/components/molecules/Modal";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import MapWithGeocoder from "./MapWithGeocoder";
import { useCreatePlaceMutation } from "@/services/placesApi";

interface AddPlaceProps {
  show: boolean;
  onClose: () => void;
}

function AddPlace({ show, onClose }: AddPlaceProps) {
  const [createPlace] = useCreatePlaceMutation();

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Place Form"
      className="md:w-lg"
    >
      <Formik
        initialValues={{
          name: "",
          description: "",
          location: "",
          longitude: "",
          latitude: "",
          image: [],
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("* Name is Required"),
          description: Yup.string().required("* Description is Required"),
          location: Yup.string().required("* Location is Required"),
          image: Yup.array()
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
          formData.append("description", values.description);
          formData.append("location", values.location);
          formData.append("longitude", values.longitude);
          formData.append("latitude", values.latitude);
          if (Array.isArray(values.image)) {
            values.image.forEach((image: File) => {
              formData.append("image", image);
            });
          } else {
            formData.append("image", values.image);
          }

          try {
            const response = await createPlace(formData).unwrap();
            toast.success(response.message);
            resetForm();
            onClose();
          } catch (err: any) {
            toast.error(err?.data?.message || "Failed to create place");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className="space-y-4 flex-1 overflow-y-auto py-2 pr-2">
            <FormikInput
              label="Name:"
              name="name"
              placeholder="Enter place name"
            />

            <FormikInput
              label="Description:"
              name="description"
              placeholder="Enter description"
            />

            <div
              style={{
                height: "250px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <MapWithGeocoder
                location={values.location}
                setFieldValue={setFieldValue}
              />
              {touched.location && errors.location && (
                <div className="flex justify-end text-xs font-medium text-red mt-1">
                  {errors.location}
                </div>
              )}
            </div>

            <FileUploader name="image" label="Upload Image" multiple />

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
        )}
      </Formik>
    </Modal>
  );
}

export default AddPlace;
