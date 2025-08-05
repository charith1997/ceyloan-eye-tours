"use client";

import Header from "@/app/components/Header";
import "./globals.css";
import { Work_Sans } from "next/font/google";
import { Carattere } from "next/font/google";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ReduxProvider from "@/providers/ReduxProvider";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const pathName = usePathname();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setIsAdmin(role === "admin");
  }, []);

  if (pathName === "/register" || pathName === "/login") {
    return (
      <html lang="en" className={`${workSans.variable}${carattere.variable}`}>
        <head>
          <title>Ceyloan Eye Tours</title>
        </head>
        <body>
          <main>
            <ReduxProvider>{children}</ReduxProvider>
          </main>
        </body>
      </html>
    );
  }

  if (isAdmin) {
    return (
      <html lang="en" className={`${workSans.variable}${carattere.variable}`}>
        <head>
          <title>Ceyloan Eye Tours</title>
        </head>
        <body>
          <main>
            <ReduxProvider>{children}</ReduxProvider>
          </main>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={`${workSans.variable}${carattere.variable}`}>
      <head>
        <title>Ceyloan Eye Tours</title>
      </head>
      <body>
        <main className="pt-16">
          <ReduxProvider>
            <Header />
            {children}
            <Footer />
          </ReduxProvider>
        </main>
      </body>
    </html>
  );
}
