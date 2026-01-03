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
      gradient: "from-orange-500 to-red-500",
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
    <section className="md:max-w-6xl mx-auto md:px-6 lg:px-8 pt-8 md:pt-16">
      <div className="text-center max-w-4xl mx-auto mb-20">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-6">
          <Heart className="text-white" size={32} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Over 10 Years of Creating Memories
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Experience the enchantment of Sri Lanka with Jwing Tours, a trusted,
          locally owned company that has been organizing unforgettable journeys
          for over 10 years. Whether you&apos;re a solo traveler, a couple, a group
          of friends, or a convention delegate, we cater to all.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
          >
            <div className="bg-gradient-to-br from-orange-100 to-red-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <feature.icon className="text-orange-600" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Experiences Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tailored Experiences
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From relaxation and thrilling adventures to cultural immersion and
            tropical cuisine, every experience is tailor-made to suit your
            desires.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl h-64"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${experience.gradient} transition-transform duration-500 group-hover:scale-110`}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              <div className="relative h-full flex flex-col items-center justify-center text-white p-6 text-center">
                <Sparkles className="mb-4 opacity-80" size={32} />
                <h3 className="text-2xl font-bold mb-2">{experience.title}</h3>
                <p className="text-sm text-gray-200">
                  {experience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 md:p-12 mb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Discover Sri Lanka with Us
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-white rounded-full p-3 shadow-md flex-shrink-0">
                <MapPin className="text-orange-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Explore Rich Landscapes
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Discover lush landscapes, ancient ruins, and colonial
                  treasures that tell the story of Sri Lanka&apos;s rich heritage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white rounded-full p-3 shadow-md flex-shrink-0">
                <Leaf className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Sustainable Travel
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our carbon-neutral fleet, the first in Asia, allows you to
                  travel sustainably, while our partnership with Travelife
                  reflects our commitment to responsible tourism.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white rounded-full p-3 shadow-md flex-shrink-0">
                <Globe className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Authentic Accommodations
                </h3>
                <p className="text-gray-700 leading-relaxed">
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

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-12 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl mb-8 text-orange-50">
          Let us create an unforgettable experience tailored just for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/packages"
            className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Explore Packages
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Content;
