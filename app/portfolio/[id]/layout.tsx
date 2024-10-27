import { PORTFOLIO_ROUTES, PortfolioRouteType } from "@/constants/routes";
import { Tabs } from "@/shared/Tabs";
import { TabList } from "@/shared/Tabs/typings";
import { notFound } from "next/navigation";

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
  const isValidRoute = (route: string): route is PortfolioRouteType => {
    return Object.values(PORTFOLIO_ROUTES).includes(
      route as PortfolioRouteType
    );
  };

  if (!isValidRoute(params.id)) {
    return notFound(); // This should trigger the not-found.tsx page
  }
  return (
    <section className="w-full h-[85vh]">
      <div className="w-full content-start	">
        <Tabs tabList={portfolioTabList} selected={params.id} />
      </div>
      {children}
    </section>
  );
}
