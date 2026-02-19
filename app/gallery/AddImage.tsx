import React from "react";
import Button from "@/components/atoms/Button";
import FileUploader from "@/components/atoms/FileUploader";
import Modal from "@/components/molecules/Modal";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useAddGalleryImageMutation } from "@/services/galleryApi";
import { getUserDetails } from "@/utils/auth";
import { Upload, X } from "lucide-react";

interface AddImageProps {
  show: boolean;
  onClose: () => void;
}

function AddImage({ show, onClose }: AddImageProps) {
  const [addGalleryImage] = useAddGalleryImageMutation();

  const validationSchema = Yup.object({
    image: Yup.mixed().required("* Image is required"),
  });

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Share Your Travel Memory"
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
            toast.error(err?.data?.message || "Failed to upload image");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6 flex-1 overflow-y-auto py-2 pr-2">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-dashed border-orange-200">
              <div className="flex flex-col items-center text-center mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  Upload Your Photo
                </h3>
                <p className="text-sm text-gray-600">
                  Share your favorite moment from Sri Lanka
                </p>
              </div>

              <FileUploader name="image" label="Choose Image" />

              <p className="text-xs text-gray-500 text-center mt-4">
                Supported formats: JPG, PNG, GIF • Max size: 5MB
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800 leading-relaxed">
                <strong>Note:</strong> Your photo will be reviewed before
                appearing in the gallery. Please ensure it's appropriate and
                related to travel in Sri Lanka.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                label={
                  <>
                    <X className="w-4 h-4" />
                    Cancel
                  </>
                }
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#cd1a40] to-[#ff803c] hover:shadow-lg text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                label={
                  <>
                    <Upload className="w-4 h-4" />
                    {isSubmitting ? "Uploading..." : "Upload Photo"}
                  </>
                }
              />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default AddImage;
