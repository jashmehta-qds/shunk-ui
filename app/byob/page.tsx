"use client";

import { CreateForm } from "@/components/CreateForm";
import Header from "@/components/Header";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className=" m-auto	 h-full flex flex-col items-center lg:px-24 lg:py-8">
      <title>Byob</title>
      <Header />
      <CreateForm />
    </main>
  );
}
