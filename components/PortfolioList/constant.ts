import { TimeFrame } from "@/shared/DataTable/typings";

export const portfolioListData = [
  {
    id: 1,
    bagSymbol: "",
    bagName: "Laxmi chit fund",
    bagCode: "LXMI",
    totalInvested: 5555,
    currentValue: 6000,
    returnValue: 4444,
    returnsPercentage: 10,
    ltp: 112,
  },
  {
    id: 2,
    bagSymbol: "",
    bagName: "hhhhh chit fund",
    bagCode: "d",
    totalInvested: 5555,
    currentValue: 6000,
    returnValue: 4444,
    returnsPercentage: 10,

    ltp: 112,
  },
  {
    id: 3,
    bagSymbol: "",
    bagName: "gsegefg chit fund",
    bagCode: "a",
    totalInvested: 5555,
    currentValue: 6000,
    returnValue: 4444,
    returnsPercentage: 10,
    ltp: 112,
  },
  {
    id: 4,
    bagSymbol: "",
    bagName: "dawdawd chit fund",
    bagCode: "x",
    totalInvested: 5555,
    currentValue: 6000,
    returnValue: 4444,
    returnsPercentage: 10,
    ltp: 112,
  },
];

export const timeFramesList = [
  TimeFrame.Day,
  TimeFrame.Week,
  TimeFrame.Month,
  TimeFrame.ThreeMonths,
  TimeFrame.Year,
  TimeFrame.All
]