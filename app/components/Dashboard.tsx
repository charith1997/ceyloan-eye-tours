import React, { useState } from "react";
import AdminNavigation from "./AdminNavigation";
import MainContent from "./MainContent";
import Home from "./Home";
import AdminTours from "./AdminTours";
import AdminHotels from "./AdminHotels";
import AdminVehicles from "./AdminVehicles";
import AdminPlaces from "./AdminPlaces";

type NavigationItem = {
  name: string;
  active: boolean;
  component: React.ReactNode;
};

const initialNavigationItems: NavigationItem[] = [
  { name: "Home", active: true, component: <Home /> },
  { name: "Tours", active: false, component: <AdminTours /> },
  { name: "Hotels", active: false, component: <AdminHotels /> },
  { name: "Vehicles", active: false, component: <AdminVehicles /> },
  { name: "Orders", active: false, component: <Home /> },
  { name: "Chats", active: false, component: <Home /> },
  { name: "Gallery", active: false, component: <Home /> },
  { name: "Places", active: false, component: <AdminPlaces /> },
];

const DashboardPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>(
    initialNavigationItems
  );

  const clickNavItem = (name: string) => {
    setNavigationItems((prevItems) =>
      prevItems.map((item) =>
        item.name === name
          ? { ...item, active: true }
          : { ...item, active: false }
      )
    );
  };

  const activeComponent = navigationItems.find(
    (item) => item.active
  )?.component;

  return (
    <div className="flex h-screen w-full">
      <AdminNavigation
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        navigationItems={navigationItems}
        clickNavItem={clickNavItem}
      />
      <MainContent setShowSidebar={setShowSidebar}>
        {activeComponent}
      </MainContent>
    </div>
  );
};

export default DashboardPage;
