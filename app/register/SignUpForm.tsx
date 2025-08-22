"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "@/components/atoms/Button";
import { FormikInput } from "@/components/atoms/FormikInput";
import { useRegisterMutation } from "@/services/authApi";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("* Name is required"),
  email: Yup.string().email("* Invalid email").required("* Email is required"),
  country: Yup.string().required("* Country is required"),
  phoneNo: Yup.string().required("* Phone number is required"),
  password: Yup.string()
    .min(6, "* Password must be at least 6 characters")
    .required("* Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "* Passwords must match")
    .required("* Repeat password is required"),
});

const SignUpForm = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        country: "",
        phoneNo: "",
        password: "",
        repeatPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const user = {
          name: values.name,
          email: values.email,
          country: values.country,
          phoneNo: values.phoneNo,
          password: values.password,
        };

        try {
          const response: any = await register(user).unwrap();
          toast.success(response?.message);
          resetForm();
          router.push("/login");
        } catch (error: any) {
          toast.error(error?.data?.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Form className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormikInput
            label="Name:"
            name="name"
            placeholder="Enter name"
            className="w-full text-sm border border-gray-400 rounded px-4 py-2 focus:outline-none"
          />
          <FormikInput
            label="Email:"
            name="email"
            placeholder="Enter email"
            className="w-full text-sm border border-gray-400 rounded px-4 py-2 focus:outline-none"
          />
          <FormikInput
            label="Country:"
            name="country"
            placeholder="Enter country"
            className="w-full text-sm border border-gray-400 rounded px-4 py-2 focus:outline-none"
          />
          <FormikInput
            label="Phone No:"
            name="phoneNo"
            placeholder="Enter phone number"
            className="w-full text-sm border border-gray-400 rounded px-4 py-2 focus:outline-none"
          />
          <FormikInput
            label="Password:"
            name="password"
            type="password"
            placeholder="Enter password"
            className="w-full text-sm border border-gray-400 rounded px-4 py-2 focus:outline-none"
          />
          <FormikInput
            label="Repeat Password:"
            name="repeatPassword"
            type="password"
            placeholder="Repeat password"
            className="w-full text-sm border border-gray-400 rounded px-4 py-2 focus:outline-none"
          />
        </div>

        <Button
          label="Register"
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
  );
};

export default SignUpForm;
