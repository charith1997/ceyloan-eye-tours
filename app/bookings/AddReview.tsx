import React from "react";
import Button from "@/components/atoms/Button";
import { FormikInput } from "@/components/atoms/FormikInput";
import Modal from "@/components/molecules/Modal";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { cancelBtnColor, saveBtnColor } from "@/styles/colors";
import StarRatingInput from "@/components/atoms/StarRatingInput";
import { useAddReviewMutation } from "@/services/reviewApi";

interface AddReviewProps {
  show: boolean;
  onClose: () => void;
  details: any;
}

function AddReview({ show, onClose, details }: AddReviewProps) {
  const [addReview] = useAddReviewMutation();

  const validationSchema = Yup.object({
    rating: Yup.number().min(1).max(5).required("* Rating is required"),
    review: Yup.string().required("* Review is required"),
    description: Yup.string().required("* Description is required"),
  });

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Add Review"
      className="md:w-lg"
    >
      <Formik
        initialValues={{
          rating: 1,
          review: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const data: any = {
            bookingId: details.id,
            packageId: details.package_id
              ? details.package_id
              : details.custom_package_id,
            rating: values.rating,
            review: values.review,
            description: values.description,
          };

          try {
            const response = await addReview(data).unwrap();
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
          <div className="flex justify-center">
            <StarRatingInput name="rating" maxRating={5} label="" size={10} />
          </div>

          <FormikInput
            label="Feedback:"
            name="review"
            placeholder="Enter review"
          />

          <FormikInput
            label="Description:"
            name="description"
            placeholder="Enter description"
          />

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

export default AddReview;
