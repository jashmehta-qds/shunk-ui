"use client";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./globals.css";
import { Sidebar } from "@/shared/Sidebar";

import ToastManager from "@/shared/Toast/toastManages";
import { ToastProvider } from "@/shared/Toast/toastContext";

import Navigation from "@/components/Navigation";
import dynamic from "next/dynamic";

const activeChain = "base"; // Set this to your desired blockchain
const ThreeScene = dynamic(() => import("../components/ThreeScene"), {
  ssr: false,
  loading: () => (
    <div
      style={{ background: "rgb(214, 219, 220)" }}
      className="w-full h-screen"
    />
  ),
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="of:version" content="1.0.0" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="of:accepts:protocol_identifier" content="websocket" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* NNEED TO SEE THE USE OF THIS */}
        {/* <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/pagedone@1.2.1/src/css/pagedone.css"
        /> */}

        {/* Tailwind CSS (Last to take precedence) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        />
      </head>

      <body className="overflow-y-scroll overflow-x-hidden">
        <ThirdwebProvider activeChain={activeChain}>
          <ToastProvider>
            <div style={{ zIndex: -1 }} className="fixed inset-0">
              <ThreeScene />
            </div>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex flex-col w-full">
                <Navigation />
                <div>{children}</div>
              </div>
            </div>
          </ToastProvider>
        </ThirdwebProvider>
        <ToastManager />
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/pagedone@1.2.1/src/js/pagedone.js"
        ></script>
      </body>
    </html>
  );
}
