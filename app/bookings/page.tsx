"use client";

import Button from "@/components/atoms/Button";
import BookingsPage from "@/components/pages/BookingsPage";
import DetailContainer from "@/components/containers/DetailContainer";
import PageRouting from "@/components/molecules/PageRouting";
import PageDetails from "@/components/organisams/PageDetails";
import { useGetBookingByIdQuery } from "@/services/bookingApi";
import { getUserDetails } from "@/utils/auth";
import { BookText, Component } from "lucide-react";
import Image from "next/image";
import React from "react";

const mockBooking = {
  id: "3a77e316-e510-45e0-974c-5ac1ffd62c2c",
  adult_count: 4,
  child_count: 3,
  status: "completed",
  start_date: "2025-09-16",
  message: "Booking message",
  Package: { title: "Package 7" },
  CustomPackage: null,
  User: { name: "Jane Smith", email: "customer2@example.com" },
  Review: { rating: 3, review: "This is review 7" },
  Payment: { payment_id: "320032519428", amount: "409.88", status: "success" },
};

function MyBookings() {
  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <PageRouting />
      <BookingsPage />
    </section>
  );
}

export default MyBookings;
