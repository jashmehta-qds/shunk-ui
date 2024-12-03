import { CSSProperties } from "react";

export enum TableHeaderField {
  ACTIONS = "actions",
  CHECKBOX = "checkbox ",
  RANK = "rank",
  CRYPTO_INFO = "cryptoInfo",
  BAG_INFO = "bagInfo",
  CRYPTO_PRICE = "price",
  MARKET_CAP = "marketCap",
  CHANGE = "change",
  CHANGE_PERCENTAGE = "changePercentage",
  INVESTED_VALUE = "investedValue",
  CURRENT_VALUE = "currentValue",
  CHANGE_WITH_PERCENTAGE = "changeWithPercentage",
  CREATOR = "creator",
  COMPOSITION = "composition",
  AUM = "aum",
  CARET = "caret",
  FAVOURITE = "FAVOURITE",
  CHART = "CHART",
  PRICE = "PRICE",
  ALLOCATION = "ALLOCATION",
  LTP = "ltp",
  MENU = "menu",
  TRADE_CURRENCY = "tradeCurrency",
  TRADE_CURRENCY_1 = "tradeCurrency1",
  TRADE_CURRENCY_2 = "tradeCurrency2",
  TRADE_CURRENCY_3 = "tradeCurrency3",
}
export interface TableHeaders {
  isSearch?: boolean;
  field: TableHeaderField;
  component: string | React.ReactNode;
  isSortable?: boolean;
  align?: string;
  width?: string;
  isMobile?: boolean;
}

export interface TableRows {
  field: TableHeaderField;
  component: string | number | React.ReactNode;
  className?: string;
  searchText?: string;
  isMobile?: boolean;
}

export interface DataTableProps {
  headers: TableHeaders[];
  rows: TableRows[][];
  columnSizes?: number[];
  customStyles?: string;
  hidePagination?: boolean;
  isLoading?: boolean;
}

export enum TimeFrame {
  Day = "1D",
  Week = "1W",
  Month = "1M",
  ThreeMonths = "3M",
  Year = "1Y",
  All = "ALL",
}
