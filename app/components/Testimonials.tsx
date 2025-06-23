import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Alice Johnson",
    location: "USA",
    rating: 5,
    image: "/testimonials/alice.png",
    text: "This was the most magical experience I’ve had in Asia. Everything was well organized and stunning!",
  },
  {
    name: "Nimal Perera",
    location: "Sri Lanka",
    rating: 4,
    image: "/testimonials/nimal.png",
    text: "Highly professional team. They showed us places even locals don’t know! Felt safe and thrilled throughout.",
  },
  {
    name: "Elena Rossi",
    location: "Italy",
    rating: 5,
    image: "/testimonials/elena.png",
    text: "I loved every second. The food, the beaches, the culture — unforgettable. Thank you Ceyloan Eye Tour!",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          What Our Travelers Say
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.location}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">“{t.text}”</p>

              <div className="flex text-yellow-500">
                {Array.from({ length: t.rating }).map((_, i) => (
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
