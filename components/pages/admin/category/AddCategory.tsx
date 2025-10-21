import React, { useState } from "react";
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
    image_url?: File | null;
  };
}

function AddCategory({
  show,
  onClose,
  isEdit = false,
  initialValues,
}: AddCategoryProps) {
  const [showExistingImage, setShowExistingImage] = useState(
    !!(isEdit && initialValues?.image_url)
  );

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const defaultInitialValues = initialValues || {
    name: "",
    description: "",
    image_url: null,
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("* Name is Required"),
    description: Yup.string().required("* Description is Required"),
    image_url: Yup.mixed().when([], {
      is: () => !showExistingImage,
      then: (schema) => schema.required("* Image is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
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

          if (isEdit) {
            if (values.name !== initialValues?.name)
              formData.append("name", values.name);
            if (values.description !== initialValues?.description)
              formData.append("description", values.description);
            if (
              !showExistingImage &&
              values.image_url !== initialValues?.image_url
            )
              formData.append("image", values.image_url || "");

            // If nothing changed, skip the request
            if ([...formData.keys()].length === 0) {
              toast("No changes detected");
              setSubmitting(false);
              return;
            }

            try {
              const response = await updateCategory({
                id: initialValues?.id,
                data: formData as any,
              }).unwrap();
              toast.success(response.message);
            } catch (err: any) {
              toast.error(err?.data?.message);
            } finally {
              setSubmitting(false);
              onClose();
            }
          } else {
            formData.append("name", values.name);
            formData.append("description", values.description);
            if (values.image_url) {
              formData.append("image", values.image_url);
            }

            try {
              const response = await createCategory(formData).unwrap();
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
            label="Category Name:"
            name="name"
            placeholder="Enter category name"
          />

          <FormikInput
            label="Description:"
            name="description"
            placeholder="Enter description"
          />

          {isEdit ? (
            showExistingImage ? (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div className="relative group">
                  <img
                    src={initialValues?.image_url || ""}
                    alt="Category"
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
              </div>
            ) : (
              <FileUploader name="image_url" label="Upload Image" />
            )
          ) : (
            <FileUploader name="image_url" label="Upload Image" />
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
      </Formik>
    </Modal>
  );
}

export default AddCategory;
