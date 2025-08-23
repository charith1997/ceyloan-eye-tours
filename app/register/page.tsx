"use client";

import Image from "next/image";
import React, { JSX } from "react";
import SignUpForm from "./SignUpForm";
import SocialSignUpButtons from "./SocialSignUpButtons";
import Link from "next/link";

export default function RegisterPage(): JSX.Element {
  return (
    <div className="min-h-screen block lg:flex">
      <div className="lg:w-1/2 flex items-center justify-center">
        <div className="max-w-xl w-full p-4 md:p-0">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Get Started Now
          </h1>

          <SignUpForm />

          <SocialSignUpButtons />

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
