"use client";
import {
  ConnectWallet,
  useAddress,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import Image from "next/image";
import { IoWallet } from "react-icons/io5";
import baseIcon from "../public/baseIcon.png";
import exclamationIcon from "../public/exclamation.png";

export const BASE_CHAIN_ID = 8453;

export default function WalletConnect() {
  const address = useAddress();
  const [, switchNetwork] = useNetwork();
  const isMismatch = useNetworkMismatch();
  // console.log(isMismatch, "called");

  return (
    <div className="transition-all duration-300 flex justify-center items-center">
      <div className="relative flex gap-2">
        <div className="flex gap-2 items-center">
          <div
            className="relative h-6 w-6"
            onClick={() => switchNetwork && switchNetwork(BASE_CHAIN_ID)}
          >
            {isMismatch ? (
              <Image
                width={16}
                height={16}
                className="absolute -top-3 -right-1 "
                src={exclamationIcon.src}
                alt="wrong-network"
              />
            ) : null}
            <Image src={baseIcon.src} alt="baseIcon" width={24} height={24} />
          </div>
        </div>
        <div
          className={`relative ${
            address ? "mt-0" : "mt-2"
          } transition-margin duration-300`}
        >
          <div
            className={`absolute  transition-all duration-300 w-2 h-2 ${
              address ? "bg-green-500" : "bg-amber-500"
            } rounded-full -top-1`}
          ></div>
          <IoWallet size={"32px"} className={`justify-end`} />
          <div
            className={`text-xs transition-opacity duration-300 ${
              address ? "opacity-1" : "opacity-0"
            }`}
          >
            {address ? address.slice(-4) : "****"}
          </div>
          <div className="absolute top-0 right-0 !h-[32px] !w-[32px] overflow-hidden">
            <ConnectWallet
              className="!opacity-0 !h-[32px] !w-[32px]"
              theme={"light"}
              onConnect={(wallet) => {
                // console.log(wallet, "CALLED");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
