"use client";

import React, { JSX } from "react";
import Image from "next/image";
import * as Yup from "yup";
import Link from "next/link";
import { Form, Formik } from "formik";
import { FormikInput } from "@/components/atoms/FormikInput";
import Button from "@/components/atoms/Button";
import { useForgotPasswordMutation } from "@/services/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ForgotPasswordPage(): JSX.Element {
  const [forgotPassword] = useForgotPasswordMutation();
  const router = useRouter();
  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-8 py-8">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Forgot Password!
          </h1>

          <h3 className="text-md font-normal text-gray-900 mb-8">
            Enter your email to reset your account
          </h3>

          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("* Invalid email")
                .required("* Email is required"),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                const payload = {
                  email: values.email,
                };
                const response = await forgotPassword({
                  data: payload,
                }).unwrap();
                toast.success(response?.message);
                resetForm();
                router.push("/reset-password");
              } catch (error: any) {
                toast.error(error?.data?.message);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <Form className="space-y-3">
              <FormikInput
                label="Email:"
                name="email"
                placeholder="Enter email"
                className="w-full text-sm border border-gray-400 rounded px-4 py-2 focus:outline-none"
              />

              <Button
                label="Forgot Password"
                type="submit"
                className="w-full tracking-[1] bg-gradient-to-r from-red to-orange text-white py-3 rounded-lg font-semibold mt-4"
              />

              <div className="relative mt-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>
            </Form>
          </Formik>

          <p className="mt-8 text-center text-gray-600">
            Have an account?{" "}
            <Link
              href="/login"
              className="text-red-500 hover:text-red-600 font-semibold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/family tours/Secrets of Lanka Tour.jpg"
          alt="Aerial view of ancient rock fortress surrounded by lush green landscape"
          className="w-full h-full object-cover rounded-l-2xl"
          width={1000}
          height={800}
        />
        <div className="absolute inset-0 bg-black/10 z-20 rounded-l-2xl"></div>
      </div>
    </div>
  );
}
