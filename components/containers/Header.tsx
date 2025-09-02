"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CircleUser, Menu, X } from "lucide-react";
import Button from "@/components/atoms/Button";
import { getUserDetails } from "@/utils/auth";
import { useDispatch } from "react-redux";
import { logout } from "@/features/authSlice";

export default function HeaderWrapper() {
  const pathname = usePathname();

  const bgClass = "bg-gradient-to-r from-red to-orange";

  return <Header bgClass={bgClass} pathname={pathname} />;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Round Tours", href: "/round-tours" },
  { label: "Day Tours", href: "/day-tours" },
  { label: "Destinations", href: "/destinations" },
  { label: "Hotels", href: "/hotels" },
  { label: "Rent a vehicle", href: "/rent" },
  { label: "Reviews", href: "/reviews" },
  { label: "Gallery", href: "/reviews" },
  { label: "About Us", href: "/" },
];

type HeaderProps = {
  bgClass: string;
  pathname: string;
};

function Header({ bgClass, pathname }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("authToken");
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
    setShowModal(false);
  };

  useEffect(() => {
    const userDetails = getUserDetails();
    if (userDetails) {
      setUserDetails(userDetails);
    } else {
      setUserDetails(null);
    }
  }, [token]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        pathname === "/" && !isScrolled ? "bg-transparent" : `${bgClass}`
      }`}
    >
      <div className="mx-auto px-4 md:pl-16 md:pr-8 py-4 flex justify-between items-center text-white">
        <Link
          href="/"
          className="font-carattere font-normal text-3xl leading-[100%] tracking-[0]"
        >
          Ceylon Eye Tours
        </Link>

        <nav className="hidden md:flex space-x-8 text-sm">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[14px] leading-[100%] tracking-[0] whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {!userDetails && (
          <div className="hidden md:flex space-x-8 items-center text-sm">
            <Link
              href="/login"
              className="underline font-semibold text-[14px] leading-[100%] tracking-[0] whitespace-nowrap"
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
        )}
        {userDetails && (
          <CircleUser
            width={30}
            height={30}
            className="cursor-pointer"
            onClick={() => setShowModal(!showModal)}
          />
        )}

        {showModal && (
          <div className="z-50 flex bg-white rounded shadow-lg p-4 min-w-[200px] absolute right-0 mr-8 mt-42">
            <div className="flex flex-col w-full gap-2">
              <div className="font-semibold text-lg text-gray-500">
                {userDetails?.userName}
              </div>
              <button
                className="py-2 bg-gradient-to-r from-red to-orange text-white rounded cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}

        <Button
          label={mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 shadow-md">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
