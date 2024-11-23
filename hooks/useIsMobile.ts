import { useEffect, useLayoutEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800); // md breakpoint is 768px
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};
