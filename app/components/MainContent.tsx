import { Menu } from "lucide-react";
import React from "react";

interface MainContentData {
  setShowSidebar: (data: boolean) => void;
  children?: React.ReactNode;
}

const MainContent = ({ setShowSidebar, children }: MainContentData) => {
  return (
    <div className="lg:flex w-full bg-white border-r border-gray-200 flex-col">
      <div className="p-4 flex lg:hidden border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowSidebar(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default MainContent;
