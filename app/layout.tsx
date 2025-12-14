"use client";

import Header from "@/components/containers/Header";
import "./globals.css";
import { Carattere } from "next/font/google";
import Footer from "../components/containers/Footer";
import { usePathname } from "next/navigation";
import ReduxProvider from "@/providers/ReduxProvider";
import { Toaster } from "react-hot-toast";
import { getUserRole } from "@/utils/auth";
import { useEffect, useState } from "react";
import GlobalLoader from "@/components/organisams/GlobalLoader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { login, logout } from "@/features/authSlice";
import ChatWidget from "./components/ChatWidget";

const carattere = Carattere({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-carattere",
});

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<string | null>(null);
  const pathName = usePathname();
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogged) {
      const role = getUserRole();

      if (role) setUserRole(role);
      else setUserRole(null);
    } else {
      setUserRole(null);
    }
  }, [isLogged]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(login());
    } else {
      dispatch(logout());
    }
  }, []);

  if (
    pathName === "/register" ||
    pathName === "/login" ||
    pathName === "/forgot-password" ||
    pathName === "/reset-password"
  ) {
    return (
      <main>
        {children}
        <ChatWidget />
      </main>
    );
  }

  if (userRole === "admin") {
    return <main>{children}</main>;
  }

  return (
    <main>
      <Header />
      {children}
      <Footer />
      <ChatWidget />
    </main>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${carattere.variable}`}>
      <head>
        <title>Jwing Tours</title>
      </head>
      <body>
        <ReduxProvider>
          <LayoutContent>{children}</LayoutContent>
          <Toaster position="top-right" />
          <GlobalLoader />
        </ReduxProvider>
      </body>
    </html>
  );
}
