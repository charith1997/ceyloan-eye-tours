"use client";

import React, { useEffect, useState } from "react";
import DashboardPage from "../components/pages/DashboardPage";
import "../styles/common.css";
import { getUserRole } from "@/utils/auth";
import { useRouter } from "next/navigation";
import HomePage from "@/components/pages/home/page";

export default function Home() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(getUserRole());
  }, [router]);

  if (role === "admin") {
    return <DashboardPage />;
  }

  if (role === "user") {
    return <HomePage />;
  }
  return <HomePage />;
}
