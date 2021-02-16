import { useState, useEffect } from "react";

type WindowSizeType = {
  width: number;
  height: number;
};

/**
 * Next.js does server-side rendering so we cannot explicitly get window size
 * Add a event listener on resize which updates the window size
 */
export function getWindowSize(): WindowSizeType {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}

/**
 * Returns true if the window with is smaller than 768px
 * This can be used to help build components specific to smaller screen sizes.
 */
export function displayMobileView(): boolean {
  return getWindowSize().width <= 768;
}
