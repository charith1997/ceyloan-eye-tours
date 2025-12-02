"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { User, Mail, Phone, FileText, Lock, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { FormikInput } from "@/components/atoms/FormikInput";
import ProfileImage from "@/app/register/ProfileImage";
import { useUpdateProfileMutation } from "@/services/userApi";

interface ProfileData {
  profileImage: string | null;
  name: string;
  email: string;
  country: string;
  phoneno: string;
  passport: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  country: Yup.string().required("Country is required"),
  phoneno: Yup.string()
    .matches(/^[0-9+\-\s()]+$/, "Invalid phone number")
    .required("Phone number is required"),
  passport: Yup.string()
    .min(5, "Passport number must be at least 5 characters")
    .required("Passport number is required"),
  profileImage: Yup.mixed().nullable(),
  password: Yup.string()
    .transform((value) => (value === "" ? undefined : value))
    .test(
      "password-length",
      "Password must be at least 6 characters",
      (value) => {
        if (!value) return true;
        return typeof value === "string" && value.length >= 6;
      }
    ),

  confirmPassword: Yup.string().when("password", {
    is: (password: any) => !!password,
    then: (schema) =>
      schema
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const ProfileForm = ({ initialValues }: { initialValues: any }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [updateUserProfile] = useUpdateProfileMutation();

  const handleSubmit = async (values: ProfileData) => {
    try {
      const formData = new FormData();
      if (values.name !== initialValues?.name)
        formData.append("name", values.name);
      if (values.email !== initialValues?.email)
        formData.append("email", values.email);
      if (values.country !== initialValues?.country)
        formData.append("country", values.country);
      if (values.phoneno !== initialValues?.phoneno)
        formData.append("phoneNo", values.phoneno);
      if (values.passport !== initialValues?.passport)
        formData.append("passport", values.passport);
      if (values.password !== initialValues?.password && values.password)
        formData.append("password", values.password);
      if (profileImage) {
        formData.append("profileImage", values.profileImage as any);
      }
      const response = await updateUserProfile({
        data: formData as any,
      }).unwrap();

      toast.success(response.message);
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    } finally {
    }
  };

  const handleImageChange = (file: any) => {
    if (file) {
      setProfileImage(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, dirty, setFieldValue }) => (
          <Form className="space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <ProfileImage
                updateProfileImage={(file) => {
                  handleImageChange(file);
                  setFieldValue("profileImage", file);
                }}
                disabled={!isEditing}
                initialImageUrl={initialValues?.profile_image}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <User size={18} className="text-red-500" />
                  Full Name
                </label>
                <FormikInput
                  label=""
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    isEditing
                      ? "border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-200"
                      : "border-gray-300 bg-gray-50"
                  }`}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Mail size={18} className="text-red-500" />
                  Email Address
                </label>
                <FormikInput
                  label=""
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    isEditing
                      ? "border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-200"
                      : "border-gray-300 bg-gray-50"
                  }`}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin size={18} className="text-red-500" />
                  Country
                </label>
                <FormikInput
                  label=""
                  name="country"
                  type="text"
                  placeholder="Enter your country"
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    isEditing
                      ? "border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-200"
                      : "border-gray-300 bg-gray-50"
                  }`}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Phone size={18} className="text-red-500" />
                  Phone Number
                </label>
                <FormikInput
                  label=""
                  name="phoneno"
                  type="tel"
                  placeholder="Enter your phone number"
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    isEditing
                      ? "border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-200"
                      : "border-gray-300 bg-gray-50"
                  }`}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FileText size={18} className="text-red-500" />
                  Passport Number
                </label>
                <FormikInput
                  label=""
                  name="passport"
                  type="text"
                  placeholder="Enter your passport number"
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    isEditing
                      ? "border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-200"
                      : "border-gray-300 bg-gray-50"
                  }`}
                />
              </div>
            </div>

            {isEditing && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Lock size={20} className="text-red-500" />
                  Change Password (Optional)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      New Password
                    </label>
                    <FormikInput
                      label=""
                      name="password"
                      type="password"
                      placeholder="Enter new password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <FormikInput
                      label=""
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end border-t pt-6">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center gap-2"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                    }}
                    className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !dirty}
                    className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-200 disabled:bg-orange-300 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    Update
                  </button>
                </>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileForm;
