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

export interface Strategy {
  id: number;
  isFavourite: boolean;
  name: string;
  code: string;
  address: string;
  coins: {
    name: string;
    allocation: number;
  }[];
  fees: {
    id: string;
    data: number;
  }[];
  favoriteCounts: number;
  aum: string;
  price: string;
  change: string;
  chartData: ChartData[];
}

export interface ChartData {
  id: string;
  color: string;
  timeframe?: string;
  data: {
    x: string;
    y: number;
  }[];
}

export interface ChartResponse {
  data: {
    price: number;
    timestamp: number;
    _id: string;
  }[];
  quoteCurrency: string;
  timeFrame: string;
  tradeCurrency: string;
  _id: string;
}

export interface LeaderBoard {
  id: number;
  isFavourite: boolean;
  name: string;
  code: string;
  address: string;
  coins: {
    name: string;
    allocation: number;
  }[];
  aum: string;
  price: string;
  change: string;
}
