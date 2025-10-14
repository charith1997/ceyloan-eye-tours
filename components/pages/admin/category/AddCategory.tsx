import React from "react";
import Button from "@/components/atoms/Button";
import FileUploader from "@/components/atoms/FileUploader";
import { FormikInput } from "@/components/atoms/FormikInput";
import Modal from "@/components/molecules/Modal";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/services/categoryApi";
import { cancelBtnColor, saveBtnColor } from "@/styles/colors";

interface AddCategoryProps {
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

function AddCategory({
  show,
  onClose,
  isEdit = false,
  initialValues,
}: AddCategoryProps) {
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const defaultInitialValues = initialValues || {
    name: "",
    description: "",
    image: null,
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("* Name is Required"),
    description: Yup.string().required("* Description is Required"),
    image: isEdit ? Yup.mixed() : Yup.mixed().required("* Image is required"),
  });

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title={isEdit ? "Edit Category" : "Category Form"}
      className="md:w-lg"
    >
      <Formik
        enableReinitialize
        initialValues={defaultInitialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("description", values.description);
          if (values.image) {
            formData.append("image", values.image);
          }

          try {
            if (isEdit) {
              const response = await updateCategory({
                id: initialValues?.id,
                data: {
                  name: values.name,
                  description: values.description,
                },
              }).unwrap();
              toast.success(response.message);
            } else {
              const response = await createCategory(formData).unwrap();
              toast.success(response.message);
            }

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
          <FormikInput
            label="Category Name:"
            name="name"
            placeholder="Enter category name"
          />

          <FormikInput
            label="Description:"
            name="description"
            placeholder="Enter description"
          />

          {!isEdit && <FileUploader name="image" label="Upload Image" />}

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

export default AddCategory;
