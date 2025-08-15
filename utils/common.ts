import { usePathname } from "next/navigation";

export const ROUND_TOURS = 0;
export const DAY_TOURS = 1;

export const getLastParam = () => {
    const pathname = usePathname();
    const lastSegment = pathname.split("/").filter(Boolean).pop() ?? "";
    return lastSegment;
}

export const displayTourType = (type : number) => {
    if(ROUND_TOURS === type) {
        return 'Round Tours';
    } 
    return 'Day Tours';
} 