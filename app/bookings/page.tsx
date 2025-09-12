"use client";

import BookingsPage from "@/app/bookings/BookingsPage";
import PageRouting from "@/components/molecules/PageRouting";

import React from "react";

function MyBookings() {
  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <PageRouting />
      <BookingsPage />
    </section>
  );
}

export default MyBookings;
