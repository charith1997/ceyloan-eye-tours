import React, { useState } from "react";
import Modal from "@/components/molecules/Modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { FormikInput } from "@/components/atoms/FormikInput";
import FileUploader from "@/components/atoms/FileUploader";
import Button from "@/components/atoms/Button";
import {
  useAddActivityMutation,
  useUpdateActivityMutation,
} from "@/services/activityApi";
import { cancelBtnColor, saveBtnColor } from "@/styles/colors";

interface AddActivityProps {
  show: boolean;
  onClose: () => void;
  isEdit?: boolean;
  initialValues?: {
    id: string;
    name: string;
    description: string;
    image?: File | null;
  };
}

function AddActivity({
  show,
  onClose,
  initialValues,
  isEdit,
}: AddActivityProps) {
  const [showExistingImage, setShowExistingImage] = useState(
    !!(isEdit && initialValues?.image)
  );
  const [createActivity] = useAddActivityMutation();
  const [updateActivity] = useUpdateActivityMutation();

  const defaultInitialValues = initialValues || {
    name: "",
    description: "",
    image: null,
  };

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Activity Form"
      className="md:w-lg"
    >
      <Formik
        initialValues={defaultInitialValues}
        validationSchema={Yup.object({
          name: Yup.string().required("* Name is Required"),
          description: Yup.string().required("* Description is Required"),
          image: Yup.mixed().when([], {
            is: () => !showExistingImage,
            then: (schema) => schema.required("* Image is required"),
            otherwise: (schema) => schema.notRequired(),
          }),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          if (isEdit) {
            if (values.name !== initialValues?.name)
              formData.append("name", values.name);
            if (values.description !== initialValues?.description)
              formData.append("description", values.description);
            if (!showExistingImage && values.image !== initialValues?.image)
              formData.append("logo", values.image || "");

            if ([...formData.keys()].length === 0) {
              toast("No changes detected");
              setSubmitting(false);
              return;
            }

            try {
              const response = await updateActivity({
                id: initialValues?.id,
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
            if (values.image) {
              formData.append("logo", values.image);
            }

            try {
              const response = await createActivity(formData).unwrap();
              toast.success(
                response.message || "Activity created successfully"
              );
              onClose();
              resetForm();
            } catch (err: any) {
              toast.error(err?.data?.message);
            } finally {
              setSubmitting(false);
            }
          }
        }}
      >
        <Form className="space-y-4 flex-1 overflow-y-auto py-2 pr-2">
          <FormikInput
            label="Activity Name:"
            name="name"
            placeholder="Enter activity name"
          />

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

export default AddActivity;
