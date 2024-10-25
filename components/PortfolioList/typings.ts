export interface PortfolioListProps {
  portfolioListData: PortfolioTableData[];
}
export interface PortfolioTableData {
  id: number;
  bagIcon: string;
  bagName: string;
  bagCode: string;
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
