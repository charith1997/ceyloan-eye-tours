import React from "react";
import Button from "@/components/atoms/Button";
import FileUploader from "@/components/atoms/FileUploader";
import Modal from "@/components/molecules/Modal";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { cancelBtnColor, saveBtnColor } from "@/styles/colors";
import { useAddGalleryImageMutation } from "@/services/galleryApi";
import { getUserDetails } from "@/utils/auth";

interface AddCategoryProps {
  show: boolean;
  onClose: () => void;
}

function AddImage({ show, onClose }: AddCategoryProps) {
  const [addGalleryImage] = useAddGalleryImageMutation();

  const validationSchema = Yup.object({
    image: Yup.mixed().required("* Image is required"),
  });

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Add Image"
      className="md:w-lg"
    >
      <Formik
        enableReinitialize
        initialValues={{
          image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          const { userId } = getUserDetails();
          if (userId) formData.append("customerId", userId);

          if (values.image) {
            formData.append("image", values.image);
          }

          try {
            const response = await addGalleryImage(formData).unwrap();
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

export default AddImage;
