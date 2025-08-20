import React from "react";
import Button from "@/components/atoms/Button";
import FileUploader from "@/components/atoms/FileUploader";
import { FormikInput } from "@/components/atoms/FormikInput";
import FormikRadioButton from "@/components/atoms/FormikRadioButton";
import Modal from "@/components/molecules/Modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikFieldArray from "@/components/atoms/FormikFieldArray";
import FormikMultiSelect from "@/components/atoms/FormikReactSelect";
import { useGetAllCategoriesQuery } from "@/services/categoryApi";
import { useGetAllPlacesQuery } from "@/services/placesApi";
import FormikPlaceArray from "./FormikPlaceArray";
import { useAddPackageMutation } from "@/services/packageApi";
import toast from "react-hot-toast";

interface AddPackageProps {
  show: boolean;
  onClose: () => void;
}

const initialValues = {
  title: "",
  description: [""],
  price: "",
  categoryIds: [],
  placeIds: [],
  packageHighlights: [""],
  tourType: "Round Tours",
  arrival: "",
  departure: "",
  arrivalDescription: "",
  departureDescription: "",
  duration: "",
  includes: [""],
  excludes: [""],
  images: [],
};

const validationSchema = Yup.object({
  title: Yup.string().required("* Title is required"),
  price: Yup.string().required("* Price is required"),
  duration: Yup.string().required("* Duration is required"),
  tourType: Yup.string().required("* Tour type is required"),
  arrival: Yup.string().required("* Arrival is required"),
  arrivalDescription: Yup.string().required(
    "* Arrival description is required"
  ),
  departure: Yup.string().required("* Departure is required"),
  departureDescription: Yup.string().required(
    "* Departure description is required"
  ),
  categoryIds: Yup.array()
    .of(Yup.string().required("* Category is required"))
    .min(1, "* Select at least one category")
    .required("* Categories are required"),
  description: Yup.array()
    .of(Yup.string().required("* Description is required"))
    .min(1, "* At least one description is required")
    .test(
      "no-empty",
      "* Descriptions cannot be empty",
      (arr) => Array.isArray(arr) && arr.every((str) => str?.trim() !== "")
    )
    .required("* Description is required"),
  packageHighlights: Yup.array()
    .of(Yup.string().required("* Package highlight is required"))
    .min(1, "* At least one package highlight is required")
    .test(
      "no-empty",
      "* Package highlights cannot be empty",
      (arr) => Array.isArray(arr) && arr.every((str) => str?.trim() !== "")
    )
    .required("* Package highlights are required"),
  includes: Yup.array()
    .of(Yup.string().required("* Include is required"))
    .min(1, "* At least one include is required")
    .test(
      "no-empty",
      "* Includes cannot be empty",
      (arr) => Array.isArray(arr) && arr.every((str) => str?.trim() !== "")
    )
    .required("* Includes are required"),
  excludes: Yup.array()
    .of(Yup.string().required("* Exclude is required"))
    .min(1, "* At least one exclude is required")
    .test(
      "no-empty",
      "* Excludes cannot be empty",
      (arr) => Array.isArray(arr) && arr.every((str) => str?.trim() !== "")
    )
    .required("* Excludes are required"),
  placeIds: Yup.array()
    .of(
      Yup.object({
        place_id: Yup.string().required("* Place is required"),
        description: Yup.string().required("* Place description is required"),
        order: Yup.number()
          .typeError("* Order must be a number")
          .required("* Order is required"),
        day_no: Yup.number()
          .typeError("* Day number must be a number")
          .required("* Day number is required"),
        events: Yup.array()
          .of(Yup.string().required("* Event is required"))
          .min(1, "* At least one event is required")
          .test(
            "no-empty",
            "* Events cannot be empty",
            (arr) =>
              Array.isArray(arr) && arr.every((str) => str?.trim() !== "")
          )
          .required("* Events are required"),
      })
    )
    .min(1, "* Add at least one place")
    .required("* Places are required"),
  images: Yup.mixed().required("* Image is required"),
});

function AddPackage({ show, onClose }: AddPackageProps) {
  const { data, error, isLoading } = useGetAllCategoriesQuery({});
  const categories = Array.isArray(data?.data) ? data.data : [];

  const {
    data: placeData,
    error: placeError,
    isLoading: placeLoading,
  } = useGetAllPlacesQuery();
  const places = Array.isArray(placeData?.data) ? placeData.data : [];
  const [addPackage, { isLoading: isAdding }] = useAddPackageMutation();
  return (
    <Modal isOpen={show} onClose={onClose} title="Package Form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          formData.append("title", values.title);
          formData.append("price", values.price.toString());
          formData.append("duration", values.duration);
          formData.append("tourType", values.tourType);
          formData.append("arrival", values.arrival);
          formData.append("arrivalDescription", values.arrivalDescription);
          formData.append("departure", values.departure);
          formData.append("departureDescription", values.departureDescription);
          formData.append("description", JSON.stringify(values.description));
          formData.append(
            "packageHighlights",
            JSON.stringify(values.packageHighlights)
          );
          formData.append("includes", JSON.stringify(values.includes));
          formData.append("excludes", JSON.stringify(values.excludes));
          formData.append("categoryIds", JSON.stringify(values.categoryIds));
          formData.append("placeIds", JSON.stringify(values.placeIds));

          if (values.images) {
            if (Array.isArray(values.images)) {
              values.images.forEach((image: File) => {
                formData.append("images", image);
              });
            } else {
              formData.append("images", values.images);
            }
          }

          try {
            const response = await addPackage(formData).unwrap();
            toast.success(response.message);
            resetForm();
            onClose();
          } catch (error: any) {
            console.error("Error submitting form:", error);
            toast.error(error?.data?.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-4 flex-1 overflow-y-auto py-2 pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormikInput
                label="Title:"
                name="title"
                placeholder="Enter title"
              />
              <FormikInput
                label="Price:"
                name="price"
                placeholder="Enter price"
                type="number"
              />
              <FormikInput
                label={`Duration (days): ${
                  values.duration &&
                  `${values.duration} days / ${
                    Number(values.duration) - 1
                  } nights`
                }`}
                name="duration"
                type="number"
                placeholder="Enter duration"
                min={1}
              />
              <FormikRadioButton
                label="Tour Type:"
                name="tourType"
                options={[
                  { value: "Round Tours", label: "Round Tours" },
                  { value: "Day Tours", label: "Day Tours" },
                ]}
              />
            </div>
            <FormikMultiSelect
              name="categoryIds"
              label="Categories:"
              options={categories.map((cat: { id: string; name: string }) => ({
                value: cat.id,
                label: cat.name,
              }))}
            />
            <FormikPlaceArray
              name="placeIds"
              label="Places:"
              placeOptions={places.map(
                (place: { id: string; name: string }) => ({
                  value: place.id,
                  label: place.name,
                })
              )}
            />

            <FormikInput
              label="Arrival:"
              name="arrival"
              placeholder="Enter arrival"
            />
            <FormikInput
              label="Arrival Description:"
              name="arrivalDescription"
              placeholder="Enter arrival description"
            />
            <FormikInput
              label="Departure:"
              name="departure"
              placeholder="Enter departure"
            />
            <FormikInput
              label="Departure Description:"
              name="departureDescription"
              placeholder="Enter departure description"
            />

            <FormikFieldArray
              name="description"
              label="Description:"
              placeholder="Enter description"
            />

            <FormikFieldArray
              name="packageHighlights"
              label="Package Highlights:"
              placeholder="Enter package highlight"
            />

            <FormikFieldArray
              name="includes"
              label="Includes:"
              placeholder="Enter include"
            />

            <FormikFieldArray
              name="excludes"
              label="Excludes:"
              placeholder="Enter exclude"
            />

            <FileUploader name="images" label="Upload Image:" />

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

export default AddPackage;
