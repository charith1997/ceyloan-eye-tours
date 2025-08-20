import React from "react";
import Modal from "@/components/molecules/Modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { FormikInput } from "@/components/atoms/FormikInput";
import FileUploader from "@/components/atoms/FileUploader";
import Button from "@/components/atoms/Button";
import { useAddActivityMutation } from "@/services/activityApi";

interface AddActivityProps {
  show: boolean;
  onClose: () => void;
}

function AddActivity({ show, onClose }: AddActivityProps) {
  const [createActivity, { isLoading: isCreating }] = useAddActivityMutation();
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Activity Form"
      className="md:w-lg"
    >
      <Formik
        initialValues={{ name: "", description: "", image: null }}
        validationSchema={Yup.object({
          name: Yup.string().required("* Name is Required"),
          description: Yup.string().required("* Description is Required"),
          image: Yup.mixed().required("* Image is required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("description", values.description);
          if (values.image) {
            formData.append("logo", values.image);
          }

          try {
            const response = await createActivity(formData).unwrap();
            toast.success(response.message || "Activity created successfully");
            onClose();
            resetForm();
          } catch (err: any) {
            toast.error(err?.data?.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="space-y-4 flex-1 overflow-y-auto py-2 pr-2">
          <FormikInput label="Activity Name:" name="name" placeholder="Enter activity name" />

          <FormikInput label="Description:" name="description" placeholder="Enter description" />

          <FileUploader name="image" label="Upload Image" />

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

export default AddActivity;
