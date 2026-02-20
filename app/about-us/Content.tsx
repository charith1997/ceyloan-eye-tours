import React from "react";
import {
  Globe,
  Users,
  Leaf,
  Shield,
  Award,
  Heart,
  MapPin,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

function Content() {
  const features = [
    {
      icon: Award,
      title: "10+ Years of Excellence",
      description:
        "A trusted, locally owned company organizing unforgettable journeys across Sri Lanka.",
    },
    {
      icon: Users,
      title: "Personalized Experiences",
      description:
        "Catering to solo travelers, couples, groups, and convention delegates with tailor-made adventures.",
    },
    {
      icon: Leaf,
      title: "Carbon-Neutral Fleet",
      description:
        "The first carbon-neutral fleet in Asia, partnering with Travelife for responsible tourism.",
    },
    {
      icon: Shield,
      title: "Safety & Comfort",
      description:
        "Full liability coverage and authentic accommodations from jungle cabanas to boutique retreats.",
    },
  ];

  const experiences = [
    {
      title: "Relaxation",
      description: "Unwind in serene tropical paradises",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Adventure",
      description: "Thrilling experiences in nature",
      gradient: "from-[#cd1a40] to-[#ff803c]",
    },
    {
      title: "Culture",
      description: "Immerse in ancient traditions",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Cuisine",
      description: "Savor authentic tropical flavors",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="md:max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-8 md:pt-16 pb-12">
      <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
        <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#cd1a40] to-[#ff803c] rounded-full mb-6 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#cd1a40] to-[#ff803c] rounded-full blur-lg opacity-50 animate-pulse" />
          <Heart className="text-white relative z-10" size={32} />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
          Over 10 Years of Creating Memories
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#cd1a40] to-[#ff803c] rounded-full mx-auto mb-6" />

        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Experience the enchantment of Sri Lanka with Jwing Tours, a trusted,
          locally owned company that has been organizing unforgettable journeys
          for over 10 years. Whether you&apos;re a solo traveler, a couple, a
          group of friends, or a convention delegate, we cater to all.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="bg-gradient-to-br from-orange-100 to-red-100 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="text-[#cd1a40]" size={28} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-16 sm:mb-20">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Tailored Experiences
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#cd1a40] to-[#ff803c] rounded-full mx-auto mb-6" />
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From relaxation and thrilling adventures to cultural immersion and
            tropical cuisine, every experience is tailor-made to suit your
            desires.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl h-56 sm:h-64 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${experience.gradient} transition-transform duration-700 group-hover:scale-110`}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500" />

              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <div className="relative h-full flex flex-col items-center justify-center text-white p-6 text-center z-10">
                <Sparkles
                  className="mb-4 opacity-80 group-hover:scale-110 transition-transform duration-500"
                  size={32}
                />
                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                  {experience.title}
                </h3>
                <p className="text-sm text-gray-200">
                  {experience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-16 sm:mb-20 border border-orange-100 shadow-xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-8 text-center">
            Discover Sri Lanka with Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#cd1a40] to-[#ff803c] rounded-full mx-auto mb-8 sm:mb-10" />

          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-start gap-4 group">
              <div className="bg-white rounded-full p-3 shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="text-[#cd1a40]" size={24} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Explore Rich Landscapes
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Discover lush landscapes, ancient ruins, and colonial
                  treasures that tell the story of Sri Lanka&apos;s rich
                  heritage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="bg-white rounded-full p-3 shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Leaf className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Sustainable Travel
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Our carbon-neutral fleet, the first in Asia, allows you to
                  travel sustainably, while our partnership with Travelife
                  reflects our commitment to responsible tourism.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="bg-white rounded-full p-3 shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Globe className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Authentic Accommodations
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  We offer diverse accommodation options, from jungle cabanas to
                  boutique retreats, all designed to ensure comfort and
                  authenticity. Liability coverage and your safety is always
                  assured.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center bg-gradient-to-r from-[#cd1a40] to-[#ff803c] rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-white/90">
            Let us create an unforgettable experience tailored just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/packages"
              className="inline-flex items-center justify-center bg-white text-[#cd1a40] px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Explore Packages
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Content;
