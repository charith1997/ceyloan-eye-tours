import React from "react";
import { BookText, Component } from "lucide-react";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import ListContainer from "@/components/containers/ListContainer";
import Modal from "@/components/molecules/Modal";
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/services/categoryApi";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikInput } from "@/components/atoms/FormikInput";
import FileUploader from "@/components/atoms/FileUploader";
import toast from "react-hot-toast";

const cardDetails = (item: {
  name: string;
  description: string;
  packageCount: number;
}) => (
  <div className="flex flex-col gap-2">
    <h3 className="text-md font-bold uppercase">{item.name}</h3>
    <p className="flex text-sm gap-2 items-center">
      <BookText width={16} />
      {item.description}
    </p>
    <span className="flex text-sm gap-2 items-center">
      <Component width={16} /> Package Count: {item.packageCount}
    </span>
  </div>
);

const priceDetails = () => null;

const actionButtons = (item: { id: number; image_url: string }) => {
  return (
    <div className="flex gap-4">
      <Button
        label="Edit"
        className="w-20 p-2 rounded-lg text-white bg-orange text-sm uppercase"
      />
      <Button
        label="Delete"
        className="w-20 p-2 rounded-lg text-white bg-red text-sm uppercase"
      />
    </div>
  );
};

const mobileViewCardDetails = (item: {
  name: string;
  description: string;
  packageCount: number;
}) => (
  <div className="flex flex-col gap-1 text-sm">
    <h3 className="font-bold uppercase">{item.name}</h3>
    <p className="flex gap-2 items-center">
      <BookText width={16} />
      {item.description}
    </p>
    <p className="flex gap-2 items-center">
      <Component width={16} />
      {`Package Count: ${item.packageCount}`}
    </p>
  </div>
);

const AdminCategoryPage = () => {
  const [showModal, setShowModal] = React.useState(false);

  const { data, error, isLoading } = useGetAllCategoriesQuery({});
  const categories = Array.isArray(data?.data) ? data.data : [];

  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder="Search Category..."
          title="Categories"
          buttonName="Add Category"
          onClick={() => setShowModal(true)}
        />
        <ListContainer
          cardDetails={cardDetails}
          priceDetails={priceDetails}
          actionButtons={actionButtons}
          mobileViewCardDetails={mobileViewCardDetails}
          list={categories}
        />
      </NavigationContainer>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Category Form"
      >
        <Formik
          initialValues={{ name: "", description: "", image: null }}
          validationSchema={Yup.object({
            name: Yup.string().required("* Name is Required"),
            description: Yup.string().required("* Description is Required"),
            image: Yup.mixed().required("Image is required"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            if (values.image) {
              formData.append("image", values.image);
            }

            try {
              const response = await createCategory(formData).unwrap();
              toast.success(response.message);
              setShowModal(false);
              resetForm();
            } catch (err: any) {
              toast.error(err?.data?.message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <Form className="space-y-4 flex-1 overflow-y-auto py-2 pr-2">
            <FormikInput label="Category Name:" name="name" />

            <FormikInput label="Description:" name="description" />

            <FileUploader name="image" label="Upload Image" />

            <div className="flex justify-center gap-6 mt-4 bg-white">
              <Button
                onClick={() => setShowModal(false)}
                className="w-full text-white px-8 py-2 rounded-lg cursor-pointer bg-[#1976D2] text-lg font-semibold uppercase"
                label="Cancel"
              />
              <Button
                type="submit"
                className="w-full text-white px-8 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-red to-orange text-lg font-semibold uppercase"
                label="Save"
              />
            </div>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};

export default AdminCategoryPage;
