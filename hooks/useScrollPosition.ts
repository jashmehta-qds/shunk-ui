"use client";

import { useEffect, useState, useRef } from "react";

// Custom hook for scroll position detection
export const useScrollPosition = (
  scrollContainerRef: React.RefObject<HTMLDivElement>
) => {
  const [isOnTop, setIsOnTop] = useState(true);
  const [isOnBottom, setIsOnBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;

      // Check if we're at the top
      setIsOnTop(scrollTop === 0);

      // Check if we're at the bottom
      setIsOnBottom(Math.abs(scrollHeight - clientHeight - scrollTop) < 1);
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      // Initial check
      handleScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollContainerRef]);

  return { isOnTop, isOnBottom };
};
