"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { Pagination } from "../Pagination";
import {
  tableHeadingClassName,
  tableRowsStringClassName,
} from "../styles/commonStyles";
import { DataTableProps, TableRows } from "./typings";

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
