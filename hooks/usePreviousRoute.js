"use client"
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export const usePreviousRoute = () => {

    const pathname = usePathname();
  
    const ref = useRef(null);
  
    useEffect(() => {
        return () => {
            if (pathname) ref.current = pathname;
        }
    }, [pathname]);
  
    return ref.current;
};