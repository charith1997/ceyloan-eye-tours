import { jwtDecode } from "jwt-decode";

export function getUserRole() {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("authToken");
  if (!token) return null;
  try {
    const decoded: {
      userId: string;
      userName: string;
      email: string;
      role: string;
      iat: number;
      exp: number;
    } = jwtDecode(token);
    return decoded?.role || null;
  } catch {
    return null;
  }
}
