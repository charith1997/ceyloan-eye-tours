"use client";

import Header from "@/components/containers/Header";
import "./globals.css";
import { Work_Sans } from "next/font/google";
import { Carattere } from "next/font/google";
import Footer from "../components/containers/Footer";
import { usePathname } from "next/navigation";
import ReduxProvider from "@/providers/ReduxProvider";
import { Toaster } from "react-hot-toast";
import { getUserRole } from "@/utils/auth";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-work-sans",
});

const carattere = Carattere({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-carattere",
});

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const token = localStorage.getItem("authToken");
  const role = getUserRole();

  if (
    (pathName === "/register" && !token) ||
    (pathName === "/login" && !token)
  ) {
    return <main>{children}</main>;
  }

  if (role === "admin") {
    return <main>{children}</main>;
  }

  if (role === "user") {
    return (
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    );
  }

  return <main>{children}</main>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${workSans.variable}${carattere.variable}`}>
      <head>
        <title>Ceyloan Eye Tours</title>
      </head>
      <body>
        <ReduxProvider>
          <LayoutContent>{children}</LayoutContent>
          <Toaster position="top-right" />
        </ReduxProvider>
      </body>
    </html>
  );
}
