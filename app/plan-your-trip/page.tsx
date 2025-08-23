import Button from "@/components/atoms/Button";
import Jumbotron from "@/components/molecules/Jumbotron";
import PageDetails from "@/components/organisams/PageDetails";
import React from "react";

export default function PlanYourTrip() {
  return (
    <section className="py-16 px-4 md:px-16">
      <Jumbotron
        title="Plan Your Trip"
        description="Create your perfect itinerary with our expert guides."
        imageUrl="/round tours/round-tours_main.png"
      />
      <PageDetails
        title="Start Planning Your Family Tour in Sri Lanka"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum."
      />
      <div className="w-full grid md:grid-cols-2 gap-10">
        <form className="space-y-6">
          <div>
            <label className="block text-sm mb-1 font-semibold">
              Tour Package *
            </label>
            <input
              type="text"
              className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-semibold"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-semibold">
              Your Name *
            </label>
            <input
              type="text"
              className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-semibold"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-semibold">
              Your Email Address *
            </label>
            <input
              type="email"
              className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-semibold"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 font-semibold">
                Tour start Date
              </label>
              <input
                type="date"
                className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-semibold"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-semibold">
                Pick up Location
              </label>
              <input
                type="text"
                className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-semibold"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 font-semibold">
                Contact Number
              </label>
              <input
                type="text"
                className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-semibold"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-semibold">
                Nationality
              </label>
              <input
                type="text"
                className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-semibold"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 font-semibold">
                Adults *
              </label>
              <input
                type="number"
                className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-semibold"
              />

              <p className="text-xs text-[#FF803C] mt-1 font-semibold">
                Above 11 Years
              </p>
            </div>
            <div>
              <label className="block text-sm mb-1 font-semibold">
                Children
              </label>
              <input
                type="number"
                className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-semibold"
              />

              <p className="text-xs text-[#FF803C] mt-1 font-semibold">
                Aged 03 - 11 Years
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1 font-semibold">
              Message
            </label>
            <textarea
              rows={5}
              className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-semibold"
            />
          </div>
          <div className="flex justify-center">
            <Button
              label="SUBMIT DETAILS"
              type="submit"
              className="bg-gradient-to-r from-red to-orange hover:opacity-90 text-white font-semibold py-3 px-6 rounded w-full max-w-xs"
            />
          </div>
        </form>

        {/* Description section */}
        <div className="text-gray-500 space-y-6 text-sm leading-relaxed font-bold">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown.
          </p>
        </div>
      </div>
    </section>
  );
}
