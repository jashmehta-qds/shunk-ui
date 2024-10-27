"use client";

import Link from "next/link";
import { IoCaretBack } from "react-icons/io5";
import WalletConnect from "./WalletConnect";
import { useNetworkMismatch } from "@thirdweb-dev/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface HeaderProps {
  goBack?: () => void;
}

export default function Header({ goBack }: HeaderProps) {
  const isMismatch = useNetworkMismatch();
  const router = useRouter();
  const [showGoBack, setShowGoBack] = useState(false);

  useEffect(() => {
    if (goBack) {
      setShowGoBack(true);
    }
  }, [goBack]);

  return (
    <div className="sticky top-0 z-50">
      <header
        className={`sticky top-0 z-50 bg-white bg-opacity-70 backdrop-blur-lg rounded-full shadow-md min-w-[26vw] border-2 ${
          isMismatch ? "border-red-500" : "border-green-500"
        }`}
      >
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center py-4 gap-4">
            <div>
              <Link href="/">
                <span className="font-silkscreen text-3xl">Shunk</span>
              </Link>
            </div>

            <div>
              <div className="absolute top-3 right-8 cursor-pointer">
                <WalletConnect />
              </div>
            </div>
          </div>
          {goBack && (
            <div
              onClick={goBack}
              className={`group shadow-md absolute -left-20 top-1/2 transform -translate-y-1/2 bg-white font-silkscreen text-3xl h-16 w-16 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-500 ease-out ${
                showGoBack ? "scale-100" : "scale-0"
              } hover:bg-opacity-90 hover:shadow-lg`}
            >
              <IoCaretBack className="absolute left-4 transition-transform duration-300 group-hover:-translate-x-2" />
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
