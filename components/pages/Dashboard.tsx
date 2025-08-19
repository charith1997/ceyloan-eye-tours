import React, { useState } from "react";
import Home from "../../app/components/Home";
import AdminPackagePage from "./admin/package/AdminPackagePage";
import AdminHotelsPage from "./admin/accommodation/AdminHotelsPage";
import AdminVehiclesPage from "./admin/AdminVehiclesPage";
import AdminPlacesPage from "./admin/AdminPlacesPage";
import AdminOrdersPage from "./admin/AdminOrdersPage";
import AdminGalleryPage from "./admin/gallery/AdminGalleryPage";
import AdminNavigation from "../organisams/AdminNavigation";
import MainContent from "../organisams/MainContent";
import AdminActivityPage from "./admin/activity/AdminActivityPage";
import AdminCategoryPage from "./admin/category/AdminCategoryPage";

type NavigationItem = {
  name: string;
  active: boolean;
  component: React.ReactNode;
};

const initialNavigationItems: NavigationItem[] = [
  { name: "Home", active: true, component: <Home /> },
  { name: "Categories", active: false, component: <AdminCategoryPage /> },
  { name: "Packages", active: false, component: <AdminPackagePage /> },
  { name: "Accommodations", active: false, component: <AdminHotelsPage /> },
  { name: "Vehicles", active: false, component: <AdminVehiclesPage /> },
  { name: "Orders", active: false, component: <AdminOrdersPage /> },
  { name: "Chats", active: false, component: <Home /> },
  { name: "Gallery", active: false, component: <AdminGalleryPage /> },
  { name: "Places", active: false, component: <AdminPlacesPage /> },
  { name: "Activities", active: false, component: <AdminActivityPage /> },
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
