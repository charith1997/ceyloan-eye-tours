"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function HeaderWrapper() {
  const pathname = usePathname();

  const bgClass = "bg-gradient-to-r from-red to-orange";

  return <Header bgClass={bgClass} pathname={pathname} />;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Round Tours", href: "/round-tours" },
  { label: "Day Tours", href: "/" },
  { label: "Destinations", href: "/" },
  { label: "Hotels", href: "/hotels" },
  { label: "Rent a vehicle", href: "/rent" },
  { label: "Reviews", href: "/reviews" },
  { label: "About Us", href: "/" },
];

type HeaderProps = {
  bgClass: string;
  pathname: string;
};

function Header({ bgClass, pathname }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
        pathname === "/" && !isScrolled ? "bg-transparent" : `${bgClass}`
      }`}
    >
      <div className="mx-auto px-4 md:px-16 py-4 flex justify-between items-center text-white">
        <Link
          href="/"
          className="font-carattere font-normal text-[35px] leading-[100%] tracking-[0]"
        >
          Ceylon Eye Tours
        </Link>

        <nav className="hidden md:flex space-x-8 text-sm">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-work text-[14px] leading-[100%] tracking-[0] whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex space-x-8 items-center text-sm">
          <Link
            href="/login"
            className="underline font-work font-semibold text-[14px] leading-[100%] tracking-[0] whitespace-nowrap"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-red px-4 py-2 rounded-2xl text-white font-semibold"
          >
            Sign Up
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 shadow-md">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
