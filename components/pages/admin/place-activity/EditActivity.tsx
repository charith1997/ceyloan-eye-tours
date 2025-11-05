import React from "react";
import Button from "@/components/atoms/Button";
import FileUploader from "@/components/atoms/FileUploader";
import { FormikInput } from "@/components/atoms/FormikInput";
import Modal from "@/components/molecules/Modal";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  useCreatePlaceActivityMutation,
  useUpdatePlaceActivityMutation,
} from "@/services/placeActivity";
import { cancelBtnColor, saveBtnColor } from "@/styles/colors";

interface EditActivityProps {
  show: boolean;
  onClose: () => void;
  initialValues?: any;
  placeId: string | null;
}

function EditActivity({
  show,
  onClose,
  initialValues,
  placeId,
}: EditActivityProps) {
  const [updatePlaceActivity] = useUpdatePlaceActivityMutation();

  const defaultValues = initialValues || {
    id: "",
    description: "",
    price: "",
    image: null,
  };
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Edit Activity"
      className="md:w-2xl"
    >
      <Formik
        initialValues={defaultValues}
        validationSchema={Yup.object({
          description: Yup.string().required("* Description is Required"),
          price: Yup.number()
            .required("* Price is Required")
            .min(0, "* Price must be positive"),
          image: Yup.mixed().required("* Image is required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          if (values.price !== initialValues?.price)
            formData.append("price", values.price);
          if (values.description !== initialValues?.description)
            formData.append("description", values.description);
          if (values.image !== initialValues?.image)
            formData.append("image", values.image || "");

          if ([...formData.keys()].length === 0) {
            toast("No changes detected");
            setSubmitting(false);
            return;
          }

          try {
            const response = await updatePlaceActivity({
              placeId: placeId || "",
              activityId: values.id,
              data: formData as any,
            }).unwrap();
            toast.success(response.message);
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

export default EditActivity;
