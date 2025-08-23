import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikInput } from "@/components/atoms/FormikInput";
import Link from "next/link";
import { useLoginMutation } from "@/services/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/authSlice";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("* Invalid email").required("* Email is required"),
  password: Yup.string()
    .min(6, "* Password must be at least 6 characters")
    .required("* Password is required"),
});

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const response: any = await login(values).unwrap();
          toast.success(response?.message);
          resetForm();
          if (response.data) {
            localStorage.setItem("authToken", response.data);
            const decoded: {
              userId: string;
              userName: string;
              email: string;
              role: string;
            } = jwtDecode(response.data);
            dispatch(
              setCredentials({
                user: {
                  userId: decoded.userId,
                  userName: decoded.userName,
                  email: decoded.email,
                  role: decoded.role,
                },
              })
            );
          }
          router.push("/");
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
        <FormikInput
          label="Password:"
          name="password"
          type="password"
          placeholder="Enter password"
          className="w-full text-sm border border-gray-400 rounded px-4 py-2 focus:outline-none"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember for 30 days
            </label>
          </div>
          <div>
            <Link
              href="#"
              className="text-red-500 hover:text-red-600 underline"
            >
              Forgot password?
            </Link>
          </div>
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
    // <form className="space-y-4" onSubmit={handleSubmit}>
    //   <div>
    //     <label
    //       htmlFor="email"
    //       className="block text-sm font-medium text-gray-700 mb-1"
    //     >
    //       Email address
    //     </label>
    //     <input
    //       type="email"
    //       id="email"
    //       name="email"
    //       value={formData.email}
    //       onChange={handleInputChange}
    //       placeholder="Enter your email"
    //       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-none outline-none transition-colors"
    //     />
    //   </div>

    //   <div>
    //     <label
    //       htmlFor="password"
    //       className="block text-sm font-medium text-gray-700 mb-1"
    //     >
    //       Password
    //     </label>
    //     <input
    //       type="password"
    //       id="password"
    //       name="password"
    //       value={formData.password}
    //       onChange={handleInputChange}
    //       placeholder="Enter your password"
    //       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-none outline-none transition-colors"
    //     />
    //   </div>

    //   <div className="flex justify-between text-sm text-gray-600">
    //     <div className="flex items-center">
    //       <input
    //         type="checkbox"
    //         id="rememberMe"
    //         name="rememberMe"
    //         checked={formData.rememberMe}
    //         onChange={handleInputChange}
    //         className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
    //       />
    //       <label
    //         htmlFor="rememberMe"
    //         className="ml-2 block text-sm text-gray-700"
    //       >
    //         Remember for 30 days
    //       </label>
    //     </div>
    //     <div>
    //       <a href="#" className="text-red-500 hover:text-red-600 underline">
    //         Forgot password?
    //       </a>
    //     </div>
    //   </div>

    //   <Button
    //     label="Login"
    //     type="submit"
    //     className="w-full bg-gradient-to-r from-red-500 to-orange-400 text-white py-3 px-4 rounded-lg font-semibold cursor-pointer duration-200"
    //   />

    //   <div className="relative mt-4">
    //     <div className="absolute inset-0 flex items-center">
    //       <div className="w-full border-t border-gray-300"></div>
    //     </div>
    //     <div className="relative flex justify-center text-sm">
    //       <span className="px-2 bg-white text-gray-500">Or</span>
    //     </div>
    //   </div>
    // </form>
  );
};

export default LoginForm;
