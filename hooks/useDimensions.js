"use client"

import { useCallback, useEffect, useState } from 'react';

export const useDimensions = (el) => {
    
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)  

    const layoutChange = useCallback(() => {
        const element = el || document;
        setHeight(element.clientHeight);
        setWidth(element.clientWidth);
    }, [el])

    useEffect(() => {

        layoutChange();

        window.addEventListener("resize", layoutChange);

        return () => window.removeEventListener("resize", layoutChange);
    }, [layoutChange])

    return {
        height,
        width
    }
};

function getWindowDimensions() {
  const use = typeof window !== "undefined" ? window : {};
  const { innerWidth: width, innerHeight: height } = use;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function handleResize() {
      const dim = getWindowDimensions();
      setWindowDimensions(dim);
      setIsMobile(dim.width <= 768);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {...windowDimensions, isMobile: isMobile};
}