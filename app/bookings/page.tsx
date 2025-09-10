"use client";

import Button from "@/components/atoms/Button";
import DetailContainer from "@/components/containers/DetailContainer";
import PageDetails from "@/components/organisams/PageDetails";
import { BookText, Component } from "lucide-react";
import Image from "next/image";
import React from "react";

function MyBookings() {
  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      {/* <PageRouting /> */}
      <PageDetails title="My Bookings" description="" />
      <DetailContainer className="max-h-[calc(100vh-182px)] overflow-y-auto scrollbar-thin scroll-smooth py-2">
        <div>
          <div className="hidden md:flex w-full items-center justify-between p-2 border-2 rounded-lg border-orange">
            <div className="flex items-center gap-8">
              <Image
                src="/round tours/round-tours_main.png"
                alt={`Category Image`}
                width={120}
                height={100}
                className="object-cover rounded-lg w-28 h-28"
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-md font-bold uppercase">Title</h3>
                <p className="flex text-sm gap-2 items-center">
                  <BookText width={16} />
                  Description
                </p>
                <span className="flex text-sm gap-2 items-center">
                  <Component width={16} /> Package Count: 5
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                label="Edit"
                className="w-20 p-2 rounded-lg text-white bg-orange text-sm uppercase"
              />
              <Button
                label="Delete"
                className="w-20 p-2 rounded-lg text-white bg-red text-sm uppercase"
                onClick={() => {}}
              />
            </div>
          </div>

          <div className="flex md:hidden w-full items-center justify-between p-2 border-2 rounded-lg border-orange gap-2">
            <Image
              src="/round tours/round-tours_main.png"
              alt={`Tour Image`}
              width={160}
              height={160}
              className="object-cover rounded-lg w-36 h-36"
            />
            <div className="grid gap-2">
              <div className="flex flex-col gap-1 text-sm">
                <h3 className="font-bold uppercase">Title</h3>
                <p className="flex gap-2 items-center">
                  <BookText width={16} />
                  Description
                </p>
                <p className="flex gap-2 items-center">
                  <Component width={16} />
                  Package Count: 5
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  label="Edit"
                  className="w-20 p-2 rounded-lg text-white bg-orange text-sm uppercase"
                />
                <Button
                  label="Delete"
                  className="w-20 p-2 rounded-lg text-white bg-red text-sm uppercase"
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </DetailContainer>
    </section>
  );
}

export default MyBookings;
