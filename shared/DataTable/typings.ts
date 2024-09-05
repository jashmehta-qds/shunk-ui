import { CSSProperties } from "react";

export enum TableHeaderField {
  ACTIONS = "actions",
  CHECKBOX = "checkbox ",
  RANK = "rank",
  CRYPTO_INFO = "cryptoInfo",
  CRYPTO_PRICE = "price",
  MARKET_CAP = "marketCap",
  CHANGE = "change",
  CHANGE_PERCENTAGE = "changePercentage",
  CREATOR = "creator",
  COMPOSITION = "composition",
  AUM = "aum",
  CARET = "caret"
}
export interface TableHeaders {
  isSearch?: boolean;
  field: TableHeaderField;
  component: string | React.ReactNode;
  isSortable?: boolean;
  align?: string;
  width?: string
}

export interface TableRows {
  field: TableHeaderField;
  component: string | number | React.ReactNode;
  className?: string;
  searchText?: string;
}

export interface DataTableProps {
  headers: TableHeaders[];
  rows: TableRows[][];
  columnSizes?: number[];
  customStyles?: CSSProperties;
  hidePagination?: boolean;
}
