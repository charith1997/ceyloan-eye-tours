import React from "react";
import Button from "@/components/atoms/Button";
import FileUploader from "@/components/atoms/FileUploader";
import { FormikInput } from "@/components/atoms/FormikInput";
import Modal from "@/components/molecules/Modal";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import MapWithGeocoder from "./MapWithGeocoder";
import {
  useCreatePlaceMutation,
  useUpdatePlaceMutation,
} from "@/services/placesApi";
import { cancelBtnColor, saveBtnColor } from "@/styles/colors";

interface AddPlaceProps {
  show: boolean;
  onClose: () => void;
  initialValues?: {
    id: string;
    name: string;
    description: string;
    location: string;
    longitude: string;
    latitude: string;
    image: File | null;
  };
  isEdit?: boolean;
}

function AddPlace({ show, onClose, initialValues, isEdit }: AddPlaceProps) {
  const [createPlace] = useCreatePlaceMutation();
  const [updatePlace] = useUpdatePlaceMutation();

  const defaultInitialValues = initialValues || {
    name: "",
    description: "",
    location: "",
    longitude: "",
    latitude: "",
    image: null,
  };

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Place Form"
      className="md:w-lg"
    >
      <Formik
        initialValues={defaultInitialValues}
        validationSchema={Yup.object({
          name: Yup.string()
            .trim()
            .required("* Name is Required")
            .min(1, "* Name cannot be empty"),
          description: Yup.string().required("* Description is Required"),
          location: Yup.string().required("* Location is Required"),
          longitude: Yup.string().required("* Longitude is Required"),
          latitude: Yup.string().required("* Latitude is Required"),
          image: Yup.mixed()
            .required("* Image is required")
            .test("fileType", "Only image files are allowed", (value: any) => {
              if (typeof value === "string") return true;
              if (
                value &&
                ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(
                  value.type
                )
              ) {
                return true;
              }

              return false;
            }),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          if (isEdit) {
            if (values.name !== initialValues?.name)
              formData.append("name", values.name);
            if (values.description !== initialValues?.description)
              formData.append("description", values.description);
            if (values.location !== initialValues?.location) {
              formData.append("location", values.location);
              formData.append("longitude", values.longitude);
              formData.append("latitude", values.latitude);
            }
            if (values.image !== initialValues?.image)
              formData.append("image", values.image || "");

            if ([...formData.keys()].length === 0) {
              toast("No changes detected");
              setSubmitting(false);
              return;
            }

            try {
              const response = await updatePlace({
                id: initialValues?.id || "",
                data: formData as any,
              }).unwrap();
              toast.success(response.message);
              onClose();
            } catch (err: any) {
              toast.error(err?.data?.message);
            } finally {
              setSubmitting(false);
            }
          } else {
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("location", values.location);
            formData.append("longitude", values.longitude);
            formData.append("latitude", values.latitude);
            if (values.image) {
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
            </div>

            <FormikInput
              label="Location:"
              name="location"
              placeholder="Enter location"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormikInput
                label="Longitude:"
                name="longitude"
                placeholder="Enter longitude"
              />

              <FormikInput
                label="Latitude:"
                name="latitude"
                placeholder="Enter latitude"
              />
            </div>

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
        )}
      </Formik>
    </Modal>
  );
}

export default AddPlace;
