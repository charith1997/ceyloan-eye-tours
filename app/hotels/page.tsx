import React from "react";
import HotelGrid from "./HotelGrid";

export default function Hotels() {
    return (
        <section className="py-16 px-4 md:px-16">
            <div
                className="rounded-xl shadow-md bg-cover bg-center h-[300px] relative inset-0 z-0"
                style={{ backgroundImage: 'url("/hotels/Hotels Main.jpg")' }}
            >
                <div className="absolute inset-0 bg-black/60 rounded-xl z-0" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white gap-6">
                    <p className="font-work text-[36px] md:text-[64px] font-bold leading-[100%] tracking-[0] whitespace-nowrap">
                        Accommodation
                    </p>
                    <p className="font-work text-[16px] font-medium leading-[24px] tracking-[0] w-full sm:w-3/5 text-center">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                    </p>
                </div>
            </div>
            <div className="px-6 md:px-20 lg:px-4 py-12">
                <div className="mb-4 text-sm font-medium text-gray-700">
                    <span className="font-work text-[14px] md:text-[16px] text-black font-semibold leading-[100%] tracking-wide">
                        Home
                    </span>
                    <span className="mx-1">{">"}</span>
                    <span className="font-work text-[14px] md:text-[16px] text-red font-semibold leading-[100%] tracking-wide">
                        Hotels
                    </span>
                </div>

                <h1 className="font-work text-[28px] md:text-[36px] font-semibold leading-[100%] tracking-[0] pb-6 pt-2">
                    Sri Lanka Tours
                </h1>

                <p className="text-[#6c6b6b] leading-relaxed font-work text-[16px] font-normal tracking-[0] text-justify">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <HotelGrid />
        </section>
    );
}
