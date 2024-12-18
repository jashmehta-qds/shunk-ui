export interface PortfolioListProps {
  portfolioListData: PortfolioTableData[];
}
export interface PortfolioTableData {
  id: number;
  bagSymbol: string;
  bagName: string;
  bagIcon: string;
  totalInvested: number;
  currentValue: number;
  returnValue: number;
  returnsPercentage: number;
  ltp: number;
  fundInfo?: FundInfo;
}

export interface FundInfo {
  fees: {
    id: string;
    data: string;
    earning: number;
  }[];
  startDate: number;
  lastModified: number;
  investorsCount: number;
}
