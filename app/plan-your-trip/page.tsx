import React from "react";

export default function PlanYourTrip() {
  return (
    <section className="py-16 px-4 md:px-16">
      <div
        className="rounded-xl shadow-md bg-cover bg-center h-[300px]  inset-0 z-0 relative"
        style={{ backgroundImage: 'url("/round tours/round-tours_main.png")' }}
      >
        <div className="absolute inset-0 bg-black/20 rounded-xl z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white gap-6">
          <p className="font-[Work_Sans] text-[36px] md:text-[64px] font-bold leading-[100%] tracking-[0] whitespace-nowrap">
            Plan Your Tour
          </p>
          <p className="font-[Work_Sans] text-[16px] font-medium leading-[24px] tracking-[0] w-full sm:w-3/5 text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s,
          </p>
        </div>
      </div>
      <div className="py-12">
        <div className="mb-4 text-sm font-medium text-gray-700">
          <span className="font-work text-[14px] md:text-[16px] text-black font-semibold leading-[100%] tracking-wide">
            Home
          </span>
          <span className="mx-1">{">"}</span>
          <span className="font-work text-[14px] md:text-[16px] text-red font-semibold leading-[100%] tracking-wide">
            Plan Your Tour
          </span>
        </div>

        <h1 className="font-work text-[28px] md:text-[36px] font-semibold leading-[100%] tracking-[0] pb-6 pt-2">
          Start Planning Your Family Tour in Sri Lanka
        </h1>

        <p className="text-[#6c6b6b] leading-relaxed font-work text-[16px] font-bold tracking-[0] text-justify">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div>
      <div className="w-full grid md:grid-cols-2 gap-10">
        <form className="space-y-6">
          <div>
            <label className="block text-sm mb-1 font-work font-semibold">
              Tour Package *
            </label>
            <input
              type="text"
              className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-work font-semibold"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-work font-semibold">
              Your Name *
            </label>
            <input
              type="text"
              className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-work font-semibold"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-work font-semibold">
              Your Email Address *
            </label>
            <input
              type="email"
              className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-work font-semibold"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 font-work font-semibold">
                Tour start Date
              </label>
              <input
                type="date"
                className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-work font-semibold"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-work font-semibold">
                Pick up Location
              </label>
              <input
                type="text"
                className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-work font-semibold"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 font-work font-semibold">
                Contact Number
              </label>
              <input
                type="text"
                className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-work font-semibold"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-work font-semibold">
                Nationality
              </label>
              <input
                type="text"
                className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-work font-semibold"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 font-work font-semibold">
                Adults *
              </label>
              <input
                type="number"
                className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-work font-semibold"
              />

              <p className="text-xs text-[#FF803C] mt-1 font-work font-semibold">
                Above 11 Years
              </p>
            </div>
            <div>
              <label className="block text-sm mb-1 font-work font-semibold">
                Children
              </label>
              <input
                type="number"
                className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-work font-semibold"
              />

              <p className="text-xs text-[#FF803C] mt-1 font-work font-semibold">
                Aged 03 - 11 Years
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1 font-work font-semibold">
              Message
            </label>
            <textarea
              rows={5}
              className="w-full p-2 rounded text-black outline-1 outline-gray-300 font-work font-semibold"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-red to-orange hover:opacity-90 font-work text-white font-semibold py-3 px-6 rounded w-full max-w-xs"
            >
              SUBMIT DETAILS
            </button>
          </div>
        </form>

        {/* Description section */}
        <div className="text-gray-500 space-y-6 text-sm leading-relaxed font-work font-bold">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown.
          </p>
        </div>
      </div>
    </section>
  );
}
