import React from "react";
import Modal from "@/components/molecules/Modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { FormikInput } from "@/components/atoms/FormikInput";
import Button from "@/components/atoms/Button";
import { useAddBookingMutation } from "@/services/bookingApi";

interface AddActivityProps {
  show: boolean;
  onClose: () => void;
  packageId?: string;
  customPackageId?: string;
}

function BookPackage({
  show,
  onClose,
  packageId,
  customPackageId,
}: AddActivityProps) {
  const [createBooking] = useAddBookingMutation();
  return (
    <Modal isOpen={show} onClose={onClose} title="Book Now" className="md:w-lg">
      <Formik
        initialValues={{
          adultCount: "",
          childCount: "",
          startDate: "",
          message: "",
        }}
        validationSchema={Yup.object({
          adultCount: Yup.number()
            .min(1, "* At least 1 adult is required")
            .required("* Adults count is Required"),
          childCount: Yup.number()
            .min(0)
            .required("* Children count is Required"),
          startDate: Yup.string().required("* Start date is Required"),
          message: Yup.string().required("* Message is Required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const data: any = {
            adultCount: values.adultCount,
            childCount: values.childCount,
            packageId,
            customPackageId,
            startDate: values.startDate,
            message: values.message,
          };

          try {
            const response = await createBooking(data).unwrap();
            toast.success(response.message || "Booking created successfully");
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
          <div className="grid grid-cols-2 gap-4">
            <FormikInput
              label="Adults:"
              name="adultCount"
              placeholder="Enter number of adults"
              type="number"
              min={0}
            />
            <FormikInput
              label="Children:"
              name="childCount"
              placeholder="Enter number of children"
              type="number"
              min={0}
            />
            <FormikInput
              label="Start Date:"
              name="startDate"
              placeholder="Enter start date"
              type="date"
            />
          </div>

          <FormikInput
            label="Message:"
            name="message"
            placeholder="Enter your message"
            type="text"
            as="textarea"
            rows={4}
          />

          <div className="flex gap-6 mt-8">
            <Button
              onClick={onClose}
              className="w-full text-white px-8 py-2 rounded-lg bg-[#1976D2] text-lg font-semibold uppercase"
              label="Cancel"
            />
            <Button
              type="submit"
              className="w-full text-white px-8 py-2 rounded-lg bg-gradient-to-r from-red to-orange text-lg font-semibold uppercase"
              label="Book Now"
            />
          </div>
        </Form>
      </Formik>
    </Modal>
  );
}

export default BookPackage;
