"use client";

import Image from "next/image";
import React, { JSX, useState } from "react";

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const { password } = formData;
    if (password === "admin" || password === "Admin") {
      localStorage.setItem("userRole", "admin");
    } else {
      localStorage.setItem("userRole", "user");
    }
    window.location.href = "/";
    console.log("Form submitted:", formData);
  };

  const handleGoogleSignIn = (): void => {
    console.log("Google sign in clicked");
  };

  const handleAppleSignIn = (): void => {
    console.log("Apple sign in clicked");
  };

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

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-none outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-none outline-none transition-colors"
              />
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
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
                <a
                  href="#"
                  className="text-red-500 hover:text-red-600 underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-red-500 to-orange-400 text-white py-3 px-4 rounded-lg font-semibold cursor-pointer duration-200"
            >
              Login
            </button>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>

              <button
                onClick={handleAppleSignIn}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                  />
                </svg>
                Sign in with Apple
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-red-500 hover:text-red-600 font-semibold"
            >
              Sign Up
            </a>
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
