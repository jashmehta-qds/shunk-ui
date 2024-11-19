import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};
export default function Page() {
  // const get1inchData = async () => {
  //   const response = await fetch("/api/oneinch");
  //   console.log(await response.json());
  // };

  return (
    <main className=" m-auto	 flex min-h-screen flex-col items-center px-24 py-8">
      <Header />
    </main>
  );
}
