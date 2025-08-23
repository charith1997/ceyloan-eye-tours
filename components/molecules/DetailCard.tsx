"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface DetailCardProps {
  title: string;
  imageUrl: string;
  price: string;
  slug: string;
  children: React.ReactNode;
}

export default function DetailCard({
  title,
  imageUrl,
  slug,
  children,
}: DetailCardProps) {
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
        {children}
      </div>
    </Link>
  );
}
