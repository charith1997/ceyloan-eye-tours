import React from "react";
import Button from "@/components/atoms/Button";
import FileUploader from "@/components/atoms/FileUploader";
import { FormikInput } from "@/components/atoms/FormikInput";
import Modal from "@/components/molecules/Modal";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  useCreateHotelTypeMutation,
  useUpdateHotelTypeMutation,
} from "@/services/hotelTypeApi";
import { cancelBtnColor, saveBtnColor } from "@/styles/colors";

interface AddHotelTypeProps {
  show: boolean;
  onClose: () => void;
  initialValues?: {
    id: string;
    name: string;
    description: string;
    image?: File | null;
  };
  isEdit?: boolean;
}

function AddHotelType({
  show,
  onClose,
  initialValues,
  isEdit,
}: AddHotelTypeProps) {
  const [createHotelType] = useCreateHotelTypeMutation();
  const [updateHotelType] = useUpdateHotelTypeMutation();
  const defaultInitialValues = initialValues || {
    name: "",
    description: "",
    image: null,
  };
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Hotel Type Form"
      className="md:w-lg"
    >
      <Formik
        initialValues={defaultInitialValues}
        validationSchema={Yup.object({
          name: Yup.string().required("* Hotel Type is Required"),
          description: Yup.string().required("* Description is Required"),
          image: Yup.mixed().required("* Image is required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          if (isEdit) {
            if (values.name !== initialValues?.name)
              formData.append("name", values.name);
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
              const response = await updateHotelType({
                id: initialValues ? initialValues?.id : "",
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
              formData.append("image", values.image);
            }

            try {
              const response = await createHotelType(formData).unwrap();
              toast.success(response.message);
              resetForm();
              onClose();
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
            label="Hotel Type:"
            name="name"
            placeholder="Enter hotel type name"
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

export default AddHotelType;
