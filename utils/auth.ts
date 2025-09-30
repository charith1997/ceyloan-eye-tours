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

const DEFAULT_USER = {
  userId: "",
  userName: null,
  email: null,
  profileImage: null,
  role: null,
};

export function getUserDetails() {
  if (typeof window === "undefined") return DEFAULT_USER;
  const token = localStorage.getItem("authToken");
  if (!token) return DEFAULT_USER;

  try {
    const decoded: {
      userId: string;
      userName: string;
      email: string;
      role: string;
      iat: number;
      exp: number;
      profileImage: string;
    } = jwtDecode(token);
    return {
      userId: decoded.userId,
      userName: decoded.userName,
      email: decoded.email,
      profileImage: decoded.profileImage,
      role: decoded.role,
    };
  } catch {
    return DEFAULT_USER;
  }
}
