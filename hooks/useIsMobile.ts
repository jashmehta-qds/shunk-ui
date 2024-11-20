import { useEffect, useLayoutEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    console.log(isMobile);
  }, [isMobile]);
  useLayoutEffect(() => {
    const handleResize = () => {
      console.log(`innerWidth: ${window.innerWidth}`);
      console.log(`devicePixelRatio: ${window.devicePixelRatio}`);
      setIsMobile(window.innerWidth < 768); // md breakpoint is 768px
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};
