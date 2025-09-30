"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  CircleUser,
  Menu,
  Power,
  X,
  ChevronDown,
  Package,
} from "lucide-react";
import Button from "@/components/atoms/Button";
import { getUserDetails } from "@/utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/authSlice";
import { RootState } from "@/store";
import Image from "next/image";

export default function HeaderWrapper() {
  const pathname = usePathname();

  const bgClass = "bg-gradient-to-r from-red to-orange";

  return <Header bgClass={bgClass} pathname={pathname} />;
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Packages", href: "/packages" },
  {
    label: "Tours",
    group: [
      { label: "Round Tours", href: "/round-tours" },
      { label: "Day Tours", href: "/day-tours" },
    ],
  },
  {
    label: "Destinations",
    group: [
      { label: "Places", href: "/places" },
      { label: "Hotels", href: "/hotels" },
      { label: "Hotel Types", href: "/hotel-types" },
    ],
  },
  { label: "Rent a vehicle", href: "/rent" },
  { label: "Reviews", href: "/reviews" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/" },
];

type HeaderProps = {
  bgClass: string;
  pathname: string;
};

function Header({ bgClass, pathname }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const dispatch = useDispatch();
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);

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
    router.push("/");
  };

  useEffect(() => {
    const userDetails = getUserDetails();
    if (userDetails) {
      setUserDetails(userDetails);
    } else {
      setUserDetails(null);
    }
  }, [isLogged]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        !target.closest(".user-profile-icon")
      ) {
        setShowModal(false);
      }
    }

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  const toggleModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(!showModal);
  };

  const userImage = (height: number, width: number) => (
    <div
      onClick={toggleModal}
      className="cursor-pointer user-profile-icon hidden md:flex"
    >
      {userDetails && userDetails?.profileImage ? (
        <Image
          className={`w-${width} h-${height} p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500`}
          src={userDetails?.profileImage}
          alt="Bordered avatar"
          width={40}
          height={40}
        />
      ) : (
        <div
          className={`relative inline-flex items-center justify-center w-${width} h-${height} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500`}
        >
          <span>
            {userDetails?.userName
              .split(" ")
              .map((word: string) => word[0])
              .join("")}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        pathname === "/" && !isScrolled ? "bg-transparent" : `${bgClass}`
      }`}
    >
      <div className="mx-auto px-4 md:pl-16 py-4 flex justify-between items-center text-white">
        <Link
          href="/"
          className="font-carattere font-normal text-3xl leading-[100%] tracking-[0]"
        >
          Ceylon Eye Tours
        </Link>

        <nav className="hidden md:flex space-x-8 text-sm items-center">
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              {item.group ? (
                // Dropdown group
                <div
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center text-[14px] leading-[100%] tracking-[0] whitespace-nowrap hover:text-gray-200 transition-colors">
                    {item.label}
                    <ChevronDown size={16} className="ml-1" />
                  </button>

                  {/* Dropdown menu */}
                  <div
                    className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 transition-all duration-200 ${
                      activeDropdown === item.label
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    }`}
                  >
                    {item.group.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors text-[14px]"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                // Regular link
                <Link
                  href={item.href}
                  className="text-[14px] leading-[100%] tracking-[0] whitespace-nowrap hover:text-gray-200 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {!isLogged && (
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
        {isLogged && userImage(10, 10)}

        {showModal && (
          <div
            ref={modalRef}
            className="z-50 bg-white rounded-xl shadow-lg p-4 min-w-[200px] absolute top-16 right-4"
          >
            <div className="flex flex-col w-full gap-1">
              <div className="flex items-center gap-2 border-b-2 pb-2 border-gray-200">
                {userImage(8, 8)}
                <div className="font-semibold text-lg text-black">
                  {userDetails?.userName}
                </div>
              </div>
              <div className="flex text-black gap-2 items-center hover:bg-gray-100 p-2 rounded cursor-pointer">
                <CircleUser width={20} height={20} />
                <h6>My Profile</h6>
              </div>
              <Link
                href="/custom-packages"
                onClick={() => setShowModal(false)}
                className="flex text-black gap-2 items-center hover:bg-gray-100 p-2 rounded cursor-pointer"
              >
                <Package width={20} height={20} />
                <h6>My Packages</h6>
              </Link>
              <Link
                href="/bookings"
                onClick={() => setShowModal(false)}
                className="flex text-black gap-2 items-center hover:bg-gray-100 p-2 rounded cursor-pointer"
              >
                <Calendar width={20} height={20} />
                <h6>My Bookings</h6>
              </Link>
              <div
                className="flex text-black gap-2 items-center hover:bg-gray-100 p-2 rounded cursor-pointer"
                onClick={handleLogout}
              >
                <Power width={20} height={20} />
                <h6>Logout</h6>
              </div>
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
          {navItems.map((item) => (
            <div key={item.label}>
              {item.group ? (
                <div className="py-2">
                  <div
                    className="flex items-center justify-between text-gray-700 font-medium cursor-pointer"
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === item.label ? null : item.label
                      )
                    }
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {activeDropdown === item.label && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.group.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block py-1 text-gray-600 hover:text-blue-600"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setActiveDropdown(null);
                          }}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveDropdown(null);
                  }}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {!isLogged && (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <Link
                href="/login"
                className="block py-2 text-gray-700 hover:text-blue-600 font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="block py-2 bg-red text-white font-semibold rounded-2xl text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
