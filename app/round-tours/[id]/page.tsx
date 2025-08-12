"use client";

import CTAButton from "@/app/components/CTAButton";
import DetailCardGrid from "@/app/components/DetailCardGrid";
import Jumbotron from "@/components/molecules/Jumbotron";
import PageDetails from "@/components/organisams/PageDetails";
import { useGetPackagesByCategoryQuery } from "@/services/packageApi";
import { notFound, useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const validTourTypes = [
  "family",
  "adventure",
  "romantic",
  "cultural",
  "ayurveda",
  "wildlife",
  "luxury",
  "general",
];

const tourPackages = [
  {
    title: "Secrets of Lanka",
    imageUrl: "/family tours/Secrets of lanka.jpg",
    duration: "14 Days | 13 Nights",
    price: "1500",
    slug: "secrets-of-lanka",
  },
  {
    title: "Wildlife",
    imageUrl: "/family tours/Wildlife.jpg",
    duration: "3 Days | 2 Nights",
    price: "1500",
    slug: "wildlife",
  },
  {
    title: "Love Island",
    imageUrl: "/family tours/Love Island.jpg",
    duration: "3 Days | 2 Nights",
    price: "1500",
    slug: "love-island",
  },
  {
    title: "Soft Adventure",
    imageUrl: "/family tours/Soft Adventure.jpg",
    duration: "14 Days | 13 Nights",
    price: "1500",
    slug: "soft-adventure",
  },
  {
    title: "Mini adventure",
    imageUrl: "/family tours/Mini adventure.jpg",
    duration: "3 Days | 2 Nights",
    price: "1500",
    slug: "mini-adventure",
  },
  {
    title: "Down south",
    imageUrl: "/family tours/Down south.jpg",
    duration: "3 Days | 2 Nights",
    price: "1500",
    slug: "down-south",
  },
  {
    title: "Bird watching",
    imageUrl: "/family tours/Bird watching.jpg",
    duration: "3 Days | 2 Nights",
    price: "1500",
    slug: "bird-watching",
  },
];

interface PageProps {
  params: Promise<{ type: string }>;
}

export default function TourTypePage() {
  return (
    <section className="py-16 px-4 md:px-16">
      <Jumbotron
        title="Family Tours"
        description="Explore the beauty of family-friendly destinations."
        imageUrl="/round tours/Family Tour.jpg"
      />
      <PageDetails
        title="Family Tours in Sri Lanka"
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
      <div className="min-h-screen">
        <DetailCardGrid packages={tourPackages} />
        <CTAButton />
      </div>
    </section>
  );
}
