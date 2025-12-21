import React, { useEffect, useRef, useState } from "react";
import {
  Home,
  Users,
  Calendar,
  MapPin,
  Menu,
  X,
  Grid,
  Package,
  Hotel,
  Activity,
  LocateIcon,
  Car,
  MessageCircle,
  Image as ImageIcon,
  Star,
  Package2,
  Power,
} from "lucide-react";
import { getUserDetails } from "@/utils/auth";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { logout } from "@/features/authSlice";
import { useRouter } from "next/navigation";
import { setCurrentPage, setTotalPages } from "@/features/paginatorSlice";

interface AdminNavigationProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  navigationItems: { name: string; active: boolean }[];
  clickNavItem: (name: string) => void;
}

// Icon mapping for navigation items
const getIcon = (name: string) => {
  const iconMap: { [key: string]: any } = {
    Home: Home,
    Categories: Grid,
    Packages: Package,
    "Custom Packages": Package2,
    Accommodations: Hotel,
    Activities: Activity,
    Places: MapPin,
    "Place Activity": LocateIcon,
    Vehicles: Car,
    Bookings: Calendar,
    Users: Users,
    Chats: MessageCircle,
    Gallery: ImageIcon,
    Reviews: Star,
  };

  const IconComponent = iconMap[name] || Home;
  return <IconComponent size={20} />;
};

const AdminNavigation = ({
  showSidebar,
  setShowSidebar,
  navigationItems,
  clickNavItem,
}: AdminNavigationProps) => {
  const [showModal, setShowModal] = useState(false);
  const userDetails = getUserDetails();
  const dispatch = useDispatch();
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setShowModal(false);
    dispatch(logout());
    router.push("/");
  };

  return (
    <>
      {!showSidebar && (
        <button
          className="fixed top-4 left-4 lg:hidden bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow border border-white/20"
          onClick={() => setShowSidebar(true)}
        >
          <Menu size={24} className="text-gray-700" />
        </button>
      )}

      <div
        className={`${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static z-30 w-3/4 md:w-1/4 bg-white shadow-2xl flex flex-col transition-all duration-300 ease-in-out h-full border-r border-gray-100`}
      >
        <div className="px-6 py-8 bg-gradient-to-r from-red-500 to-orange-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>

          <button
            className="absolute top-6 right-4 lg:hidden bg-white/20 backdrop-blur-sm p-1.5 rounded-lg z-50"
            onClick={() => setShowSidebar(false)}
          >
            <X size={20} className="text-white" />
          </button>

          <div className="relative z-10 flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="object-contain w-auto h-10 md:h-12 drop-shadow-lg"
            />
            <h1 className="font-carattere text-3xl md:text-4xl text-white tracking-wide px-4">
              Jwing Tours
            </h1>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 overflow-y-auto scrollbar-thin scroll-smooth">
          <div className="space-y-2">
            {navigationItems.map((item, index) => (
              <div
                key={item.name}
                className={`group relative flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  item.active
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-[1.02]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:scale-[1.01]"
                }`}
                onClick={() => {
                  clickNavItem(item.name);
                  setShowSidebar(false);
                  dispatch(setTotalPages(0));
                  dispatch(setCurrentPage(1));
                }}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={`flex-shrink-0 ${
                    item.active
                      ? "text-white"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                >
                  {getIcon(item.name)}
                </div>

                <span className="font-medium text-sm tracking-wide">
                  {item.name}
                </span>

                {item.active && (
                  <div className="absolute right-3 w-2 h-2 bg-white rounded-full opacity-80"></div>
                )}

                <div
                  className={`absolute inset-0 rounded-xl transition-opacity duration-200 ${
                    item.active
                      ? "opacity-0"
                      : "opacity-0 group-hover:opacity-3 bg-gradient-to-r from-orange-500 to-red-500"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </nav>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <div
            onClick={() => setShowModal(!showModal)}
            className="flex items-center space-x-3 cursor-pointer user-profile-icon"
          >
            {userDetails && userDetails?.profileImage ? (
              <Image
                className={`w-8 h-8 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500`}
                src={userDetails?.profileImage}
                alt="Bordered avatar"
                width={40}
                height={40}
              />
            ) : (
              <div
                className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white`}
              >
                {userDetails.userName && (
                  <span>
                    {userDetails?.userName
                      .split(" ")
                      .map((word: string) => word[0])
                      .join("")}
                  </span>
                )}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {userDetails?.userName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {userDetails?.email}
              </p>
            </div>
          </div>
          {showModal && (
            <div
              ref={modalRef}
              className="z-50 bg-white border border-gray-200 rounded-xl shadow-xl p-4 min-w-[200px] absolute bottom-0 left-0 right-0 mb-16 mx-4"
            >
              <div className="flex flex-col w-full gap-2">
                <div className="flex items-center gap-2 border-b-2 pb-2 border-gray-200">
                  <div className="font-semibold text-lg text-gray-600">
                    {userDetails?.userName}
                  </div>
                </div>
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
        </div>
      </div>

      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden transition-opacity duration-300"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </>
  );
};

export default AdminNavigation;
