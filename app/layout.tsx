"use client"; // This ensures the file is treated as a Client Component

import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./globals.css";
import { Sidebar } from "@/shared/Sidebar";

const activeChain = "base"; // Set this to your desired blockchain

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/pagedone@1.2.1/src/css/pagedone.css"
        />
      </head>
      <body>
        <ThirdwebProvider activeChain={activeChain}>
          <div className="flex">
            <Sidebar />
            {children}
          </div>
        </ThirdwebProvider>
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/pagedone@1.2.1/src/js/pagedone.js"
        ></script>
      </body>
    </html>
  );
}
