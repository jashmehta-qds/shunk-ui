"use client";

import { CreateForm } from "@/components/CreateForm";
import Header from "@/components/Header";
import { Suspense } from "react";

export default function Home() {
  // const get1inchData = async () => {
  //   const response = await fetch("/api/oneinch");
  //   console.log(await response.json());
  // };

  return (
    <main className=" m-auto	 h-full flex flex-col items-center lg:px-24 lg:py-8">
      <title>Byob</title>
      {/* <button onClick={get1inchData}>get1inch</button> */}
      <Header />
      {/* <Watchlist /> */}

      <CreateForm />
    </main>
  );
}
