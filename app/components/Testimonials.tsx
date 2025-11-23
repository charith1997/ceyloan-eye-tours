import { useGetAllReviewsQuery } from "@/services/reviewApi";
import { Star } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
  const { data } = useGetAllReviewsQuery();
  const reviews = Array.isArray(data?.data) ? [...data.data].slice(0, 3) : [];
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          What Our Travelers Say
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review: any, idx: number) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                {review && review?.User.profile_image ? (
                  <Image
                    className={`w-8 h-8 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500`}
                    src={review?.User.profile_image}
                    alt="Bordered avatar"
                    width={40}
                    height={40}
                  />
                ) : (
                  <div
                    className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500`}
                  >
                    <span className="text-white">
                      {review?.User.name
                        .split(" ")
                        .map((word: string) => word[0])
                        .join("")}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold">{review?.User.name}</p>
                  {/* <p className="text-sm text-gray-500">{t.location}</p> */}
                </div>
              </div>

              <p className="text-gray-700 mb-4">“{review.review}”</p>

              <div className="flex text-yellow-500">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
