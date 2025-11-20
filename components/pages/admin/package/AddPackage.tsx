import React, { useState } from "react";
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
import {
  useAddPackageMutation,
  useUpdatePackageMutation,
} from "@/services/packageApi";
import toast from "react-hot-toast";
import { cancelBtnColor, saveBtnColor } from "@/styles/colors";
import Image from "next/image";
import { checkImageUrl } from "@/utils/common";
import { getArrayDiff, getPlacesDiff, isDifferent } from "@/utils/package";

interface AddPackageProps {
  show: boolean;
  onClose: () => void;
  isEdit?: boolean;
  initialValues: {
    id: string;
    title: string;
    description: string[];
    price: string;
    categoryIds: string[];
    placeIds: string[];
    packageHighlights: string[];
    tourType: string;
    arrival: string;
    departure: string;
    arrivalDescription: string;
    departureDescription: string;
    duration: string;
    includes: string[];
    excludes: string[];
    images: any[];
    Images: any[];
  };
}

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
  images: Yup.array()
    .of(
      Yup.mixed().test(
        "fileType",
        "Only image files are allowed",
        (value, context) => {
          if (typeof value === "string") return true;
          return value instanceof File;
        }
      )
    )
    .min(1, "* At least one image is required")
    .required("* Image is required"),
});

const formatDuration = (days: number) => {
  const nights = days > 0 ? days - 1 : 0;
  return `${days} ${days === 1 ? "day" : "days"} / ${nights} ${
    nights === 1 ? "night" : "nights"
  }`;
};

function AddPackage({
  show,
  onClose,
  isEdit = false,
  initialValues,
}: AddPackageProps) {
  const [showExistingImage, setShowExistingImage] = useState(
    !!(isEdit && initialValues?.images)
  );

  const { data } = useGetAllCategoriesQuery({});
  const categories = Array.isArray(data?.data) ? data.data : [];

  const { data: placeData } = useGetAllPlacesQuery();
  const places = Array.isArray(placeData?.data) ? placeData.data : [];
  const [addPackage] = useAddPackageMutation();
  const [updatePackage] = useUpdatePackageMutation();

  const defaultInitialValues = initialValues || {
    id: "",
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

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title={isEdit ? "Edit Package" : "Package Form"}
    >
      <Formik
        initialValues={defaultInitialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const tour_type = values.tourType === "Round Tours" ? 1 : 0;
          const formData = new FormData();

          if (isEdit) {
            if (values.title !== initialValues?.title)
              formData.append("title", values.title);
            if (values.price !== initialValues?.price)
              formData.append("price", values.price);
            if (values.duration !== initialValues?.duration)
              formData.append(
                "duration",
                formatDuration(Number(values.duration))
              );
            if (values.tourType !== initialValues?.tourType)
              formData.append("tourType", tour_type.toString());
            if (values.arrival !== initialValues?.arrival)
              formData.append("arrival", values.arrival);
            if (values.arrivalDescription !== initialValues?.arrivalDescription)
              formData.append("arrivalDescription", values.arrivalDescription);
            if (values.departure !== initialValues?.departure)
              formData.append("departure", values.departure);
            if (
              values.departureDescription !==
              initialValues?.departureDescription
            )
              formData.append(
                "departureDescription",
                values.departureDescription
              );

            const categoryDiff = getArrayDiff(
              defaultInitialValues.categoryIds,
              values.categoryIds
            );

            if (categoryDiff.removed.length > 0) {
              formData.append(
                "removedCategoryIds",
                JSON.stringify(categoryDiff.removed)
              );
            }
            if (categoryDiff.added.length > 0) {
              formData.append(
                "categoryIds",
                JSON.stringify(values.categoryIds)
              );
            }

            const { addedOrUpdated, removedPlaceIds } = getPlacesDiff(
              defaultInitialValues.placeIds,
              values.placeIds
            );

            if (addedOrUpdated.length > 0)
              formData.append("updateplaceIds", JSON.stringify(addedOrUpdated));

            if (removedPlaceIds.length > 0)
              formData.append(
                "removedPlaceIds",
                JSON.stringify(removedPlaceIds)
              );

            const decsriptions = isDifferent(
              initialValues?.description,
              values.description
            );

            const packageHighlights = isDifferent(
              initialValues?.packageHighlights,
              values.packageHighlights
            );

            const includes = isDifferent(
              initialValues?.includes,
              values.includes
            );

            const excludes = isDifferent(
              initialValues?.excludes,
              values.excludes
            );

            if (decsriptions) {
              formData.append(
                "description",
                JSON.stringify(values.description)
              );
            }
            if (packageHighlights) {
              formData.append(
                "packageHighlights",
                JSON.stringify(values.packageHighlights)
              );
            }
            if (includes) {
              formData.append("includes", JSON.stringify(values.includes));
            }
            if (excludes) {
              formData.append("excludes", JSON.stringify(values.excludes));
            }

            const oldImages = initialValues?.Images || [];
            const newImages = values.images || [];

            const removedImages = oldImages
              .filter(
                (oldImg) =>
                  !newImages.some(
                    (newImg) =>
                      (typeof newImg === "string" &&
                        newImg === oldImg.image_url) ||
                      (typeof newImg === "object" &&
                        newImg.image_url === oldImg.image_url)
                  )
              )
              .map((img) => img.id);

            const addedImages = newImages.filter((img) => img instanceof File);

            addedImages.forEach((file) => formData.append("images", file));
            if (removedImages.length > 0)
              formData.append("removedImages", JSON.stringify(removedImages));

            if ([...formData.keys()].length === 0) {
              toast("No changes detected");
              setSubmitting(false);
              return;
            }

            try {
              const response = await updatePackage({
                id: values.id,
                data: formData,
              }).unwrap();
              toast.success(response.message);
              resetForm();
              onClose();
            } catch (error: any) {
              console.error("Error updating form:", error);
              toast.error(error?.data?.message);
            } finally {
              setSubmitting(false);
            }
          } else {
            formData.append("title", values.title);
            formData.append("price", values.price.toString());
            formData.append(
              "duration",
              formatDuration(Number(values.duration))
            );
            formData.append("tourType", tour_type.toString());
            formData.append("arrival", values.arrival);
            formData.append("arrivalDescription", values.arrivalDescription);
            formData.append("departure", values.departure);
            formData.append(
              "departureDescription",
              values.departureDescription
            );
            formData.append("description", JSON.stringify(values.description));
            formData.append(
              "packageHighlights",
              JSON.stringify(values.packageHighlights)
            );
            formData.append("includes", JSON.stringify(values.includes));
            formData.append("excludes", JSON.stringify(values.excludes));
            formData.append("categoryIds", JSON.stringify(values.categoryIds));
            formData.append("placeIds", JSON.stringify(values.placeIds));

            if (Array.isArray(values.images)) {
              values.images.forEach((image: File) => {
                formData.append("images", image);
              });
            } else {
              formData.append("images", values.images);
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

            {isEdit ? (
              showExistingImage ? (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {defaultInitialValues.images.map(
                    (image: any, index: number) => (
                      <div className="relative group" key={index}>
                        <img
                          src={checkImageUrl(image.image_url)}
                          alt="Packagess"
                          className="w-full h-28 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setShowExistingImage(false);
                          }}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <FileUploader name="images" label="Upload Image:" multiple />
              )
            ) : (
              <FileUploader name="images" label="Upload Image:" multiple />
            )}

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

export default AddPackage;
