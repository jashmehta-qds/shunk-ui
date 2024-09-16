"use client";

import { CreateForm } from "@/components/CreateForm";
import Header from "@/components/Header";

export default function Home() {
  // const get1inchData = async () => {
  //   const response = await fetch("/api/oneinch");
  //   console.log(await response.json());
  // };

  return (
    <main className=" m-auto	 flex min-h-screen flex-col items-center px-24 py-8">
      {/* <button onClick={get1inchData}>get1inch</button> */}
      <Header />
      {/* <Watchlist /> */}
      <CreateForm />
    </main>
  );
}
