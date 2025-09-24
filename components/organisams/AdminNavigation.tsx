import React from "react";
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
  Image,
  Star,
  Package2,
} from "lucide-react";
import { getUserDetails } from "@/utils/auth";

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
    Gallery: Image,
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
  const userDetails = getUserDetails();
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

          <div className="relative z-10">
            <h1 className="font-carattere text-3xl md:text-4xl text-white tracking-wide px-4">
              Ceylon Eye Tours
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
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {userDetails?.userName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {userDetails?.email}
              </p>
            </div>
          </div>
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
