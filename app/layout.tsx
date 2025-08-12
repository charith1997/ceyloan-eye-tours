"use client";

import Header from "@/app/components/Header";
import "./globals.css";
import { Work_Sans } from "next/font/google";
import { Carattere } from "next/font/google";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ReduxProvider from "@/providers/ReduxProvider";
import { useSelector } from "react-redux";

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
  const routingStack = useSelector((state: any) => state.routing.stack);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const pathName = usePathname();

  useEffect(() => {
    localStorage.setItem("routingStack", JSON.stringify(routingStack));
  }, [routingStack]);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setIsAdmin(role === "admin");
  }, []);

  if (pathName === "/register" || pathName === "/login") {
    return <main>{children}</main>;
  }

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <main className="pt-16">
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
    <html lang="en" className={`${workSans.variable}${carattere.variable}`}>
      <head>
        <title>Ceyloan Eye Tours</title>
      </head>
      <body>
        <ReduxProvider>
          <LayoutContent>{children}</LayoutContent>
        </ReduxProvider>
      </body>
    </html>
  );
}
