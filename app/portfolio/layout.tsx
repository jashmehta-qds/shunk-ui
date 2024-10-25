import Header from "@/components/Header";
import { Tabs } from "@/shared/Tabs";
import { TabList } from "@/shared/Tabs/typings";

export const portfolioTabList: TabList[] = [
  {
    id: "1",
    value: "Invested",
    redirection: "/portfolio/invested",
  },
  {
    id: "2",
    value: "Bag",
    redirection: "/portfolio/bag",
  },
];
export default function PortfolioLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    id: string;
  };
}) {
  console.log(JSON.stringify(params) + "tesr");
  return (
    <section className="w-full">
      <main className="overflow-auto m-auto	 flex min-h-screen flex-col items-center px-24 py-8">
        <Header />

        {children}
      </main>
    </section>
  );
}
