import { motion, Variants } from "framer-motion";
import Slider from "react-slick";
import { CalendarDays, MapPin } from "lucide-react";
import Button from "@/components/atoms/Button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import React from "react";

export default function HeroSection() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    customPaging: (i: number) => (
      <button className="w-8 h-2 rounded-full bg-gray-500 transition-colors duration-300 hover:bg-red focus:bg-red"></button>
    ),
    appendDots: (dots: React.ReactNode) => (
      <div className="absolute bottom-4 left-0 right-0 z-20">
        <ul className="slick-dots flex gap-4 justify-center">{dots}</ul>
      </div>
    ),
  };

  const slideVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.8,
        ease: "easeIn" as const,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2 },
    },
  };

  const buttonVariants: Variants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const imageVariants: Variants = {
    initial: { x: 0, y: 0 },
    hover: {
      x: -20,
      y: -20,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const slides = [
    {
      title: "Explore Sri Lanka",
      subtitle: "Your Sri Lanka Adventure Starts",
      description:
        "Plan extraordinary journeys through paradise with expert guides, curated tours, and authentic experiences.",
      image: "/hero_1.png",
      content: (
        <div className="backdrop-blur-lg p-4 rounded-3xl flex flex-col md:flex-row items-center gap-4 w-full max-w-lg mt-8">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <MapPin size={20} />
            <div>
              <p className="text-base leading-[24px] tracking-normal">
                Location
              </p>
              <p className="font-bold text-[20px] leading-[24px] tracking-normal">
                Mirissa
              </p>
            </div>
          </div>
          <span className="hidden md:block h-10 w-px bg-gray-600 mx-auto"></span>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <CalendarDays size={20} />
            <div>
              <p className="text-base leading-[24px] tracking-normal">Date</p>
              <p className="font-bold text-[20px] leading-[24px] tracking-normal">
                13 September, 2025
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Discover Our Categories",
      subtitle: "Find Your Adventure",
      description:
        "Choose from a variety of travel categories tailored to your interests, from cultural tours to adventure escapes.",
      image: "/hero_2.jpg",
      button: { label: "Explore Categories", href: "/categories" },
    },
    {
      title: "Exclusive Packages",
      subtitle: "Curated for You",
      description:
        "Our handpicked travel packages offer unforgettable experiences, blending comfort and exploration.",
      image: "/hero_3.jpg",
      button: { label: "View Packages", href: "/packages" },
    },
    {
      title: "Round Tours",
      subtitle: "Journey Across Sri Lanka",
      description:
        "Experience the beauty of Sri Lanka with our comprehensive round tours, covering iconic destinations.",
      image: "/hero_4.jpg",
      button: { label: "Discover Round Tours", href: "/round-tours" },
    },
    {
      title: "Day Tours",
      subtitle: "Quick Adventures",
      description:
        "Perfect for a short getaway, our day tours offer immersive experiences in a single day.",
      image: "/hero_5.jpg",
      button: { label: "Book Day Tours", href: "/day-tours" },
    },
    {
      title: "Hotel Types",
      subtitle: "Stay Your Way",
      description:
        "From luxury resorts to cozy guesthouses, find the perfect accommodation for your trip.",
      image: "/hero_6.jpg",
      button: { label: "Explore Hotels", href: "/hotels" },
    },
  ];

  return (
    <section className="top-0 bg-center bg-cover h-screen w-full text-white overflow-hidden">
      <Slider {...sliderSettings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <motion.div
              className="absolute inset-0 bg-center bg-cover filter blur-[1px]"
              style={{ backgroundImage: `url(${slide.image})` }}
              variants={imageVariants}
              initial="initial"
              whileHover="hover"
            ></motion.div>
            <div
              className="relative z-10 pt-20 h-screen"
              style={{
                background:
                  "linear-gradient(90.28deg, rgba(0, 0, 0, 0.8) 0.23%, rgba(0, 0, 0, 0) 99.74%)",
              }}
            >
              <motion.div
                className="max-w-md md:max-w-4xl xl:max-w-6xl mx-auto flex flex-col gap-2 justify-center text-center md:text-left h-full text-white"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.h1
                  className="font-water text-4xl md:text-5xl"
                  variants={textVariants}
                >
                  {slide.title}
                </motion.h1>
                <motion.h1
                  className="font-bold text-5xl md:text-7xl"
                  variants={textVariants}
                >
                  {slide.subtitle}
                </motion.h1>
                <motion.p
                  className="text-base leading-6 tracking-[0] w-full md:w-lg"
                  variants={textVariants}
                >
                  {slide.description}
                </motion.p>
                {/* {slide.content && slide.content} */}
                {slide.button && (
                  <motion.div variants={textVariants} className="mt-8">
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="origin-left inline-block"
                    >
                      <Link href={slide.button.href}>
                        <Button
                          label={slide.button.label}
                          className="p-3 rounded-xl bg-gradient-to-r from-red to-orange hover:opacity-90 transition"
                        />
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
