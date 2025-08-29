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

const carattere = Carattere({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-carattere",
});

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const [userRole, setUserRole] = useState<string | null>(null);
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("authToken");
  }
  const role = getUserRole();

  useEffect(() => {
    setUserRole(role);
  }, [role]);

  if (
    (pathName === "/register" && !token) ||
    (pathName === "/login" && !token)
  ) {
    return <main>{children}</main>;
  }

  if (userRole === "admin") {
    return <main>{children}</main>;
  }

  if (userRole === "user") {
    return (
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      {children}
      <Footer />
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
        <title>Ceyloan Eye Tours</title>
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
