import React from "react";

interface AdminNavigationProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  navigationItems: { name: string; active: boolean }[];
  clickNavItem: (name: string) => void;
}

const AdminNavigation = ({
  showSidebar,
  setShowSidebar,
  navigationItems,
  clickNavItem,
}: AdminNavigationProps) => {
  return (
    <>
      <div
        className={`${showSidebar ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static z-30 w-64 lg:w-96 bg-gradient-to-b from-orange-400 to-red-500 text-white flex flex-col transition-transform duration-300 ease-in-out h-full items-center`}
      >
        <div className="px-4 pt-6 pb-4 border-b-2 border-white">
          <h1 className="font-carattere font-normal text-[35px] leading-[100%] tracking-[0]">Ceylon Eye Tours</h1>
        </div>

        <nav className="flex-1 px-4 w-full justify-items-center mt-4">
          {navigationItems.map((item) => (
            <div
              key={item.name}
              className={`w-full py-4 px-4 mb-1 cursor-pointer transition-colors flex justify-center ${item.active
                ? "bg-pink-200 text-red-800 rounded"
                : "hover:bg-white/10"
                }`}
              onClick={() => {
                clickNavItem(item.name);
                setShowSidebar(false);
              }}
            >
              <span className="text-lg font-medium">{item.name}</span>
            </div>
          ))}
        </nav>
      </div>

      {showSidebar && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </>
  );
};

export default AdminNavigation;
