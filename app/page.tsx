
import { CreateForm } from "@/components/CreateForm";
import Header from "@/components/Header";
import { fetchMetadata } from "frames.js/next";
 
export async function generateMetadata() {
  return {
    title: "SHUNK - A Decentralised AMC",
    other: {
      // ...
      ...(await fetchMetadata(
        // provide full URL to your /frames endpoint
        new URL(
          "/frames",
          "http://localhost:3000"
        )
      )),
    },
  };
}

export default function Home() {
  // const get1inchData = async () => {
  //   const response = await fetch("/api/oneinch");
  //   console.log(await response.json());
  // };

  return (
    <main className=" m-auto	 flex min-h-screen flex-col items-center px-24 py-8"></main>
  );
}
