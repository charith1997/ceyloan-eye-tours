"use client";

import React from "react";
import ProfileForm from "@/components/pages/ProfileForm";
import PageRouting from "@/components/molecules/PageRouting";
import { useGetUserDetailQuery } from "@/services/userApi";

function ProfilePage() {
  const { data } = useGetUserDetailQuery();
  const userDetails = data?.data ?? {};
  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <PageRouting />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">My Profile</h1>
        <p className="text-gray-600 mb-8">Manage your account information</p>
        <ProfileForm
          initialValues={
            userDetails ?? {
              profile_image: null,
              name: "",
              email: "",
              country: "",
              phoneno: "",
              passport: "",
              password: "",
              confirmPassword: "",
            }
          }
        />
      </div>
    </section>
  );
}

export default ProfilePage;
