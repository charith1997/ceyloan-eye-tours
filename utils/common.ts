import { usePathname } from "next/navigation";

export const ROUND_TOURS = 1;
export const DAY_TOURS = 0;

export const getLastParam = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").filter(Boolean).pop() ?? "";
  return lastSegment;
};

export const displayTourType = (type: number) => {
  if (ROUND_TOURS === type) {
    return "Round Tours";
  }
  return "Day Tours";
};

export const checkImageUrl = (url: string) => {
  if (url.includes("http") || url.includes("https")) {
    return url;
  }

  return `https://service.techsolutions.site${url}`;
};
