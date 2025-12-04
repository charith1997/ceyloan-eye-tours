import React, { useState } from "react";
import Home from "../../app/components/Home";
import AdminPackagePage from "./admin/package/AdminPackagePage";
import AdminAccommodationPage from "./admin/accommodation/AdminAccommodationPage";
import AdminGalleryPage from "./admin/gallery/AdminGalleryPage";
import AdminNavigation from "../organisams/AdminNavigation";
import MainContent from "../organisams/MainContent";
import AdminActivityPage from "./admin/activity/AdminActivityPage";
import AdminCategoryPage from "./admin/category/AdminCategoryPage";
import AdminPlaceActivityPage from "./admin/place-activity/AdminPlaceActivityPage";
import AdminPlacesPage from "./admin/place/AdminPlacesPage";
import AdminBookingsPage from "./admin/bookings/AdminBookingsPage";
import AdminReviewsPage from "./admin/reviews/AdminReviewsPage";
import AdminCustomPackagesPage from "./admin/custom-packages/AdminCustomPackagesPage";
import AdminVehiclesPage from "./admin/vehicle/AdminVehiclesPage";
import AdminChatPage from "./admin/chat/page";

type NavigationItem = {
  name: string;
  active: boolean;
  component: React.ReactNode;
};

const initialNavigationItems: NavigationItem[] = [
  { name: "Home", active: true, component: <Home /> },
  { name: "Categories", active: false, component: <AdminCategoryPage /> },
  { name: "Packages", active: false, component: <AdminPackagePage /> },
  {
    name: "Custom Packages",
    active: false,
    component: <AdminCustomPackagesPage />,
  },
  {
    name: "Accommodations",
    active: false,
    component: <AdminAccommodationPage />,
  },
  { name: "Activities", active: false, component: <AdminActivityPage /> },
  { name: "Places", active: false, component: <AdminPlacesPage /> },
  {
    name: "Place Activity",
    active: false,
    component: <AdminPlaceActivityPage />,
  },
  { name: "Vehicles", active: false, component: <AdminVehiclesPage /> },
  { name: "Bookings", active: false, component: <AdminBookingsPage /> },
  { name: "Chats", active: false, component: <AdminChatPage /> },
  { name: "Gallery", active: false, component: <AdminGalleryPage /> },
  { name: "Reviews", active: false, component: <AdminReviewsPage /> },
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
