import { Tabs } from "@/shared/Tabs";
import { TabList } from "@/shared/Tabs/typings";

export const portfolioTabList: TabList[] = [
  {
    id: "invested",
    value: "Invested",
    redirection: "/portfolio/invested",
  },
  {
    id: "bag",
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
      <div className="w-full content-start	">
        <Tabs tabList={portfolioTabList} selected={params.id} />
      </div>
      {children}
    </section>
  );
}
