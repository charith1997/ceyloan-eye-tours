"use client";

import React, { useEffect, useState } from "react";
import DashboardPage from "../components/pages/DashboardPage";
import "../styles/common.css";
import { getUserDetails } from "@/utils/auth";
import { useRouter } from "next/navigation";
import HomePage from "@/components/pages/home/page";

export default function Home() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userDetails = getUserDetails();
    setRole(userDetails && userDetails.role ? userDetails.role : "user");
  }, [router]);

  if (role === "admin") {
    return <DashboardPage />;
  }

  return <HomePage />;
}
