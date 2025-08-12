"use client";

import Image from "next/image";
import React, { JSX } from "react";
import LoginForm from "./LoginForm";
import SocialLoginButtons from "./SocialLoginButtons";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setStack } from "@/features/routingSlice";

export default function LoginPage(): JSX.Element {
  const dispatch = useDispatch();
  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-8 py-8">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back!
          </h1>

          <h3 className="text-md font-normal text-gray-900 mb-8">
            Enter your Credentials to access your account
          </h3>

          <LoginForm />

          <SocialLoginButtons />

          <p className="mt-8 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-red-500 hover:text-red-600 font-semibold"
              onClick={() => dispatch(setStack(["register"]))}
            >
              Sign Up
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
