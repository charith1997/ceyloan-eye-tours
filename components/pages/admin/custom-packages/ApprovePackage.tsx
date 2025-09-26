// Formik form values type
interface FormValues {
  requiredDayCount: number | string;
  price: number | string;
  message: string;
}
import React from "react";
import Button from "@/components/atoms/Button";
import { FormikInput } from "@/components/atoms/FormikInput";
import Modal from "@/components/molecules/Modal";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  useUpdateMessageMutation,
  useUpdatePriceMutation,
  useUpdateRequiredDayCountMutation,
  useUpdateStatusMutation,
} from "@/services/customPackageApi";

interface AddCategoryProps {
  show: boolean;
  onClose: () => void;
  packageID: string;
}

function ApprovePackage({ show, onClose, packageID }: AddCategoryProps) {
  const [updateRequiredDayCount] = useUpdateRequiredDayCountMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const [updatePrice] = useUpdatePriceMutation();
  const [updateStatus] = useUpdateStatusMutation();
  const initialValues: FormValues = {
    requiredDayCount: "",
    price: "",
    message: "",
  };
  const validationSchema = Yup.object({
    requiredDayCount: Yup.number()
      .min(1, "* Day Count must be at least 1")
      .required("* Day Count is Required"),
    price: Yup.number().required("* Price is Required"),
    message: Yup.string().required("* Message is Required"),
  });

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Approve Package"
      className="md:w-lg"
    >
      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const id = packageID;
          if (!id) {
            toast.error("Missing package ID");
            return;
          }
          setSubmitting(true);
          try {
            await updateRequiredDayCount({
              id,
              requiredDayCount: Number(values.requiredDayCount),
            }).unwrap();
            await updatePrice({
              id,
              price: Number(values.price),
            }).unwrap();
            await updateMessage({
              id,
              message: values.message,
            }).unwrap();
            await updateStatus({
              id,
              isApproved: true,
            }).unwrap();
            toast.success("Package approved successfully!");
            resetForm();
            onClose();
          } catch (err: any) {
            toast.error(err?.data?.message || "An error occurred");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="space-y-4 flex-1 overflow-y-auto py-2 pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormikInput
              label="Day Count:"
              name="requiredDayCount"
              placeholder="Enter required day count"
              type="number"
              min={0}
            />

            <FormikInput
              label="Price:"
              name="price"
              placeholder="Enter price"
              type="number"
              min={0}
            />
          </div>

          <FormikInput
            label="Message:"
            name="message"
            placeholder="Enter message"
          />

          <div className="flex gap-6">
            <Button
              onClick={onClose}
              className="w-full text-white px-8 py-2 rounded-lg bg-[#1976D2] text-lg font-semibold uppercase"
              label="Cancel"
            />
            <Button
              type="submit"
              className="w-full text-white px-8 py-2 rounded-lg bg-green-500 text-lg font-semibold uppercase"
              label="Approve"
            />
          </div>
        </Form>
      </Formik>
    </Modal>
  );
}

export default ApprovePackage;
