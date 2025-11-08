import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import FileUploader from "@/components/atoms/FileUploader";
import { FormikInput } from "@/components/atoms/FormikInput";
import Modal from "@/components/molecules/Modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { cancelBtnColor, saveBtnColor } from "@/styles/colors";
import FormikDropdown from "@/components/atoms/FormikDropdown";
import FormikFieldArray from "@/components/atoms/FormikFieldArray";
import toast from "react-hot-toast";
import { useCreateVehicleMutation } from "@/services/vehicleApi";

interface AddCategoryProps {
  show: boolean;
  onClose: () => void;
}

function AddVehicle({ show, onClose }: AddCategoryProps) {
  const [createVehicle] = useCreateVehicleMutation();

  const initialValues = {
    vehicleType: "car",
    name: "",
    passengerCapacity: "",
    price: "",
    owner: "",
    ownerContact: "",
    location: "",
    descriptions: [""],
    facilities: [""],
    excludes: [""],
    terms: [""],
    images: [],
  };
  const validationSchema = Yup.object({
    vehicleType: Yup.string().required("* Vehicle type is required"),
    name: Yup.string().required("* Model is required"),
    passengerCapacity: Yup.number().required("* Passenger count is required"),
    price: Yup.number()
      .positive("* Price must be greater than 0")
      .required("* Price is required"),
    owner: Yup.string().required("* Owner is required"),
    ownerContact: Yup.string().required("* Owner contact is required"),
    location: Yup.string().required("* Location is required"),
    descriptions: Yup.array().of(
      Yup.string().required("* Description is required")
    ),
    facilities: Yup.array().of(Yup.string().required("* Facility is required")),
    excludes: Yup.array().of(Yup.string().required("* Exclude is required")),
    terms: Yup.array().of(Yup.string().required("* Term is required")),
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

  return (
    <Modal isOpen={show} onClose={onClose} title="Add Vehicle">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log("values", values);
          const formData = new FormData();
          formData.append("vehicleType", values.vehicleType);
          formData.append("name", values.name);
          formData.append(
            "passengerCapacity",
            values.passengerCapacity.toString()
          );
          formData.append("price", values.price.toString());
          formData.append("owner", values.owner);
          formData.append("ownerContact", values.ownerContact);
          formData.append("location", values.location);
          formData.append("descriptions", JSON.stringify(values.descriptions));
          formData.append("facilities", JSON.stringify(values.facilities));
          formData.append("excludes", JSON.stringify(values.excludes));
          formData.append("terms", JSON.stringify(values.terms));
          if (Array.isArray(values.images)) {
            values.images.forEach((image: File) => {
              formData.append("images", image);
            });
          } else {
            formData.append("images", values.images);
          }

          try {
            const response = await createVehicle(formData).unwrap();
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
        <Form className="space-y-4 flex-1 overflow-y-auto py-2 pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormikDropdown
              label="Vehicle Type:"
              name="vehicleType"
              options={[
                { label: "Car", value: "car" },
                { label: "Van", value: "van" },
                { label: "Bus", value: "bus" },
              ]}
              defaultOption="Select Vehicle Type"
            />

            <FormikInput
              label="Modal:"
              name="name"
              placeholder="Enter vehicle model"
            />
            <FormikInput
              label="Passenger Count:"
              name="passengerCapacity"
              placeholder="Enter passenger count"
              type="number"
              min={1}
            />
            <FormikInput
              label="Price:"
              name="price"
              placeholder="Enter price"
              type="number"
              min={0}
            />
            <FormikInput
              label="Owner:"
              name="owner"
              placeholder="Enter owner name"
            />
            <FormikInput
              label="Telephone Number:"
              name="ownerContact"
              placeholder="Enter owner contact number"
            />
            <FormikInput
              label="Location:"
              name="location"
              placeholder="Enter location"
            />
          </div>

          <FormikFieldArray
            name="descriptions"
            label="Description:"
            placeholder="Enter description"
          />

          <FormikFieldArray
            name="facilities"
            label="Facilities:"
            placeholder="Enter facilities"
          />

          <FormikFieldArray
            name="excludes"
            label="Excludes:"
            placeholder="Enter excludes"
          />

          <FormikFieldArray
            name="terms"
            label="Terms:"
            placeholder="Enter terms"
          />

          <FileUploader name="images" label="Upload Images" multiple />

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

export default AddVehicle;
