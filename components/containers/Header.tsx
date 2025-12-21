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
import { useDispatch, useSelector } from "react-redux";
import { logout, setRedirectPath } from "@/features/authSlice";
import { RootState } from "@/store";
import Image from "next/image";
import { useLazyGetUserDetailQuery } from "@/services/userApi";
import { checkImageUrl } from "@/utils/common";

export default function HeaderWrapper() {
  const pathname = usePathname();

  const bgClass =
    "bg-gradient-to-r from-[#CD1A40] to-[#FF803C] backdrop-blur-md bg-opacity-95";

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

type UserDetails = {
  profile_image: string;
  name: string;
};

function Header({ bgClass, pathname }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    profile_image: "",
    name: "",
  });

  const authToken = localStorage.getItem("authToken");

  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [getDetails] = useLazyGetUserDetailQuery();

  const dispatch = useDispatch();
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);

  const getLoggedUserDetails = async () => {
    const { data } = await getDetails();
    if (data?.success) setUserDetails(data.data);
  };

  useEffect(() => {
    if (authToken) getLoggedUserDetails();
  }, [authToken]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
    setShowModal(false);
    router.push("/");
  };

  useEffect(() => {
    if (isLogged) {
      getLoggedUserDetails();
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
      className="cursor-pointer user-profile-icon hidden md:flex transition-transform hover:scale-105"
    >
      {userDetails?.profile_image ? (
        <Image
          className={`w-${width} h-${height} rounded-full border-2 border-white/30 shadow-lg hover:border-white/60 transition-all`}
          src={checkImageUrl(userDetails?.profile_image)}
          alt="Bordered avatar"
          width={40}
          height={40}
        />
      ) : (
        <div
          className={`relative inline-flex items-center justify-center w-${width} h-${height} overflow-hidden bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30 hover:border-white/60 transition-all shadow-lg`}
        >
          <>
            {userDetails?.name ? (
              <span className="text-white font-semibold text-sm">
                {userDetails?.name
                  .split(" ")
                  .map((word: string) => word[0])
                  .join("")}
              </span>
            ) : (
              <span className="font-medium text-white"></span>
            )}
          </>
        </div>
      )}
    </div>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          pathname === "/" && !isScrolled
            ? "bg-transparent opacity-100"
            : `${bgClass} shadow-lg`
        }`}
      >
        <div className="mx-auto px-4 md:pl-16 py-4 flex justify-between items-center text-white">
          <Link
            href="/"
            className="font-carattere font-normal text-3xl leading-[100%] tracking-[0] transition-transform hover:scale-105 duration-300"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="object-contain w-auto h-10 md:h-12 drop-shadow-lg"
            />
          </Link>

          <nav className="hidden md:flex space-x-1 lg:space-x-4 text-sm items-center">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.group ? (
                  <div
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center text-[14px] leading-[100%] tracking-[0] whitespace-nowrap px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium">
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`ml-1 transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
                        activeDropdown === item.label
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <div className="py-2">
                        {item.group.map((subItem, index) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className={`block px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#CD1A40]/10 hover:to-[#FF803C]/10 hover:text-[#CD1A40] transition-all duration-200 text-[14px] font-medium ${
                              index !== item.group.length - 1
                                ? "border-b border-gray-100"
                                : ""
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-[14px] leading-[100%] tracking-[0] whitespace-nowrap px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium inline-block"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {!isLogged && (
            <div className="hidden md:flex space-x-4 items-center text-sm">
              <Link
                href="/login"
                className="font-semibold text-[14px] leading-[100%] tracking-[0] whitespace-nowrap px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                onClick={() => dispatch(setRedirectPath(pathname))}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-white text-[#CD1A40] px-6 py-2.5 rounded-full font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Sign Up
              </Link>
            </div>
          )}
          {isLogged && userDetails && userImage(10, 10)}

          {showModal && (
            <div
              ref={modalRef}
              className="z-50 bg-white rounded-2xl shadow-2xl p-5 min-w-[240px] absolute top-16 right-4 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div className="flex flex-col w-full gap-2">
                <div className="flex items-center gap-3 pb-4 mb-2 border-b-2 border-gray-100">
                  {userImage(10, 10)}
                  <div className="font-semibold text-base text-gray-800 truncate">
                    {userDetails?.name}
                  </div>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setShowModal(false)}
                  className="flex text-gray-700 gap-3 items-center hover:bg-gradient-to-r hover:from-[#CD1A40]/5 hover:to-[#FF803C]/5 hover:text-[#CD1A40] p-3 rounded-xl cursor-pointer transition-all duration-200 font-medium"
                >
                  <CircleUser width={20} height={20} />
                  <h6>My Profile</h6>
                </Link>
                <Link
                  href="/custom-packages"
                  onClick={() => setShowModal(false)}
                  className="flex text-gray-700 gap-3 items-center hover:bg-gradient-to-r hover:from-[#CD1A40]/5 hover:to-[#FF803C]/5 hover:text-[#CD1A40] p-3 rounded-xl cursor-pointer transition-all duration-200 font-medium"
                >
                  <Package width={20} height={20} />
                  <h6>My Packages</h6>
                </Link>
                <Link
                  href="/bookings"
                  onClick={() => setShowModal(false)}
                  className="flex text-gray-700 gap-3 items-center hover:bg-gradient-to-r hover:from-[#CD1A40]/5 hover:to-[#FF803C]/5 hover:text-[#CD1A40] p-3 rounded-xl cursor-pointer transition-all duration-200 font-medium"
                >
                  <Calendar width={20} height={20} />
                  <h6>My Bookings</h6>
                </Link>
                <div
                  className="flex text-gray-700 gap-3 items-center hover:bg-[#CD1A40]/5 hover:text-[#CD1A40] p-3 rounded-xl cursor-pointer transition-all duration-200 font-medium mt-2 border-t border-gray-100 pt-4"
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
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 md:hidden shadow-2xl transform transition-transform duration-300 ease-out ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#CD1A40] to-[#FF803C] px-6 py-5 flex justify-between items-center shadow-lg">
              <h2 className="text-white font-bold text-lg">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white p-2 hover:bg-white/20 rounded-lg transition-all duration-200"
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu Items Container */}
            <div className="flex flex-col h-[calc(100vh-80px)]">
              {/* Top Section - User Profile & Navigation */}
              <div className="flex-1 overflow-y-auto px-4 py-6">
                {/* User Profile - Only show when logged in */}
                {isLogged && userDetails && (
                  <div className="mb-6 pb-6 border-b-2 border-gray-200">
                    <div className="flex items-center gap-4 px-4 py-4 bg-gradient-to-r from-[#CD1A40]/5 to-[#FF803C]/5 rounded-xl">
                      {userDetails?.profile_image ? (
                        <Image
                          className="w-14 h-14 rounded-full border-2 border-[#CD1A40]/30 shadow-md"
                          src={checkImageUrl(userDetails?.profile_image)}
                          alt="Profile"
                          width={56}
                          height={56}
                        />
                      ) : (
                        <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-[#CD1A40] to-[#FF803C] rounded-full border-2 border-[#CD1A40]/30 shadow-md">
                          <span className="text-white font-bold text-lg">
                            {userDetails?.name
                              .split(" ")
                              .map((word: string) => word[0])
                              .join("")}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-gray-800 text-base truncate">
                          {userDetails?.name}
                        </div>
                        {/* <div className="text-xs text-gray-500 mt-0.5">
                          View Profile
                        </div> */}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Items - Same order as desktop */}
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <div key={item.label}>
                      {item.group ? (
                        <div>
                          <button
                            className="w-full flex items-center justify-between text-gray-800 font-semibold px-4 py-3.5 rounded-xl hover:bg-gradient-to-r hover:from-[#CD1A40]/5 hover:to-[#FF803C]/5 transition-all duration-200"
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === item.label
                                  ? null
                                  : item.label
                              )
                            }
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              size={18}
                              className={`transition-transform duration-300 ${
                                activeDropdown === item.label
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>
                          <div
                            className={`overflow-hidden transition-all duration-300 ${
                              activeDropdown === item.label
                                ? "max-h-96 opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="ml-4 mt-1 mb-2 space-y-1">
                              {item.group.map((subItem) => (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href}
                                  className="block py-3 px-4 text-gray-600 hover:text-[#CD1A40] hover:bg-gradient-to-r hover:from-[#CD1A40]/5 hover:to-[#FF803C]/5 rounded-lg transition-all duration-200 font-medium"
                                  onClick={() => {
                                    setMobileMenuOpen(false);
                                    setActiveDropdown(null);
                                  }}
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="block py-3.5 px-4 text-gray-800 hover:text-[#CD1A40] hover:bg-gradient-to-r hover:from-[#CD1A40]/5 hover:to-[#FF803C]/5 rounded-xl font-semibold transition-all duration-200"
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
                </nav>

                {/* User Actions - Only show when logged in */}
                {isLogged && userDetails && (
                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-1">
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex text-gray-700 gap-3 items-center hover:bg-gradient-to-r hover:from-[#CD1A40]/5 hover:to-[#FF803C]/5 hover:text-[#CD1A40] p-3 rounded-xl transition-all duration-200 font-medium"
                    >
                      <CircleUser width={20} height={20} />
                      <h6>My Profile</h6>
                    </Link>
                    <Link
                      href="/custom-packages"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex text-gray-700 gap-3 items-center hover:bg-gradient-to-r hover:from-[#CD1A40]/5 hover:to-[#FF803C]/5 hover:text-[#CD1A40] p-3 rounded-xl transition-all duration-200 font-medium"
                    >
                      <Package width={20} height={20} />
                      <h6>My Packages</h6>
                    </Link>
                    <Link
                      href="/bookings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex text-gray-700 gap-3 items-center hover:bg-gradient-to-r hover:from-[#CD1A40]/5 hover:to-[#FF803C]/5 hover:text-[#CD1A40] p-3 rounded-xl transition-all duration-200 font-medium"
                    >
                      <Calendar width={20} height={20} />
                      <h6>My Bookings</h6>
                    </Link>
                  </div>
                )}

                {/* Auth Buttons - Only show when not logged in */}
                {!isLogged && (
                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                    <Link
                      href="/login"
                      className="block w-full py-3.5 px-4 text-gray-800 border-2 border-gray-300 hover:border-[#CD1A40] hover:text-[#CD1A40] font-semibold rounded-xl text-center transition-all duration-200"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        dispatch(setRedirectPath(pathname));
                      }}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="block w-full py-3.5 px-4 bg-gradient-to-r from-[#CD1A40] to-[#FF803C] text-white font-semibold rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>

              {/* Bottom Section - Logout (sticky at bottom when logged in) */}
              {isLogged && (
                <div className="px-4 py-4 border-t-2 border-gray-200 bg-gray-50">
                  <button
                    className="w-full flex text-[#CD1A40] gap-3 items-center justify-center hover:bg-[#CD1A40]/5 p-3.5 rounded-xl transition-all duration-200 font-semibold"
                    onClick={handleLogout}
                  >
                    <Power width={22} height={22} />
                    <h6>Logout</h6>
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
