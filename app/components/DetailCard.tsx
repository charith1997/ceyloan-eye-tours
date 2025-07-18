"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Star } from 'lucide-react'
import Image from "next/image";

interface DetailCardProps {
    title: string;
    imageUrl: string;
    duration: string;
    price: string;
    slug: string;
}

export default function DetailCard({ title, imageUrl, duration, price, slug }: DetailCardProps) {
    const pathname = usePathname();

    return (
        <Link href={`${pathname}/${slug}`}>
            <div className="relative h-80 md:h-100 rounded-xl overflow-hidden shadow-lg group transition-transform hover:scale-105 cursor-pointer">
                <Image
                    src={imageUrl}
                    alt={title}
                    className="absolute inset-0 w-full h-60 md:h-80 object-cover bg-center bg-cover"
                    fill
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

                <div className="absolute bottom-0 w-full bg-red text-white p-4 flex flex-row justify-between gap-1 items-center">
                    <div>
                        <h3 className="font-work text-md md:text-lg font-extrabold uppercase tracking-widest">{title}</h3>
                        <p className="font-work text-sm md:text-base font-medium">{duration}</p>
                    </div>
                    <div className="text-end">
                        <h3 className="font-work text-sm md:text-sm font-normal">Starting from</h3>
                        <p className="font-work text-sm md:text-base font-normal">${price}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <p className="font-work text-sm md:text-xl font-normal">5</p>
                    </div>
                </div>
            </div></Link>
    );
}
