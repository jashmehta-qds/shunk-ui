"use client"; // Ensure this is a Client Component

import { PORTFOLIO_FORM_TABLE_COLUMN_SIZE } from "@/constants/tableSizes";
import { Datatable } from "@/shared/DataTable";
import {
  TableHeaderField,
  TableHeaders,
  TableRows,
} from "@/shared/DataTable/typings";
import KatexNumber from "@/shared/KatexNumber";
import Skeleton from "@/shared/Skeleton";

import Image from "next/image";
import { useMemo } from "react";
import ProfitLoss from "../shared/ProfitLoss";
// import { portfolioListData } from "./constant";
import DropDown from "@/shared/DropDown";

import { PortfolioListProps } from "./typings";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 4,
});

const shimmerArrayLoop = new Array(8).fill(1);
const dataRowsShimmer: TableRows[][] = shimmerArrayLoop.map(() => {
  return [
    {
      field: TableHeaderField.BAG_INFO,
      component: (
        <div className="items-center	 flex gap-8">
          <Skeleton isLoading={true} height="h-8" width={"w-8"} type="circle" />
          <div className="w-3/5 flex flex-col gap-2">
            <Skeleton isLoading={true} height="h-6" width={"w-full"} />
            <Skeleton isLoading={true} height="h-5" width={"w-1/2"} />
          </div>
        </div>
      ),
      className: "p-5",
      isMobile: true,
    },
    {
      field: TableHeaderField.LTP,
      component: (
        <div className="w-full  place-items-end	">
          <Skeleton isLoading={true} height="h-5" width={"w-full"} />
        </div>
      ),
    },
    {
      field: TableHeaderField.TRADE_CURRENCY,
      component: <Skeleton isLoading={true} width={"w-3/4"} />,
      className: "font-silkscreen text-gray-700	",
    },

    {
      field: TableHeaderField.INVESTED_VALUE,
      component: <Skeleton isLoading={true} height="h-5" width={"w-full"} />,
    },
    {
      field: TableHeaderField.TRADE_CURRENCY_1,
      component: <Skeleton isLoading={true} width={"w-3/4"} />,
      className: "font-silkscreen text-gray-700	",
    },
    {
      field: TableHeaderField.CURRENT_VALUE,
      component: (
        <div className="w-full  place-items-end	">
          <Skeleton isLoading={true} height="h-5" width={"w-full"} />
        </div>
      ),
      isMobile: true,
    },

    {
      field: TableHeaderField.TRADE_CURRENCY_3,
      component: <Skeleton isLoading={true} width={"w-3/4"} />,
      className: "font-silkscreen text-gray-700	",
    },

    {
      field: TableHeaderField.CHANGE_WITH_PERCENTAGE,
      component: (
        <div className="flex flex-col gap-2  items-end justify-end text-end">
          <Skeleton isLoading={true} height="h-5" width={"w-3/4"} />
          <Skeleton isLoading={true} height="h-4" width={"w-1/4"} />
        </div>
      ),
      isMobile: true,
    },
    {
      field: TableHeaderField.TRADE_CURRENCY_2,
      component: <Skeleton isLoading={true} width={"w-3/4"} />,
      className: "pt-5 content-start	font-silkscreen text-gray-700	",
    },
    {
      field: TableHeaderField.MENU,
      component: (
        <div className="w-full  place-items-end	">
          <Skeleton isLoading={true} height="h-10" width={"w-full"} />
        </div>
      ),
    },
  ];
});

export const PortfolioList: React.FC<PortfolioListProps> = ({
  portfolioListData,
}) => {
  const tableHeaders: TableHeaders[] = [
    {
      field: TableHeaderField.BAG_INFO,
      component: "Coin",
      align: "text-start",
      isSearch: true,
      isMobile: true,
    },
    {
      field: TableHeaderField.LTP,
      component: "Price",
      align: "flex-auto text-end",
    },
    {
      field: TableHeaderField.TRADE_CURRENCY,
      component: "",
      align: "flex-auto text-end",
    },
    {
      field: TableHeaderField.INVESTED_VALUE,
      component: "Invested Value",
      align: "justify-end ",
    },
    {
      field: TableHeaderField.TRADE_CURRENCY_1,
      component: "",
      align: "flex-auto justify-end ",
    },
    {
      field: TableHeaderField.CURRENT_VALUE,
      component: "Current Value",
      align: "justify-end ",
      isMobile: true,
    },
    {
      field: TableHeaderField.TRADE_CURRENCY_2,
      component: "",
      align: "flex-auto text-end",
    },
    {
      field: TableHeaderField.CHANGE_WITH_PERCENTAGE,
      component: "Profit/Loss",
      align: "justify-end text-end",
      isMobile: true,
    },
    {
      field: TableHeaderField.TRADE_CURRENCY_3,
      component: "",
      align: "flex-auto justify-end ",
    },
    {
      field: TableHeaderField.MENU,
      component: "Options",
      align: "justify-end ",
    },
  ];

  const dataRows: TableRows[][] = useMemo(() => {
    return portfolioListData?.map((coinData, id) => {
      return [
        {
          field: TableHeaderField.BAG_INFO,
          component: (
            <div key={"BagInfo" + coinData.bagSymbol} className="flex gap-8">
              {/* <Image
                src={coinData.bagSymbol}
                alt={coinData.bagSymbol + "logo"}
                className="w-10 h-10 mt-1 rounded-full"
                width={32}
                height={32}
              /> */}
              <div>
                <p className="truncate ...  font-semibold md:font-bold text-base md:text-lg	">
                  {coinData.bagName.substring(0, 15) +
                    (coinData.bagName.length > 15 ? "..." : "")}
                </p>
                <p className="text-sm md:text-base	 font-silkscreen  text-gray-700">
                  {coinData.bagSymbol}
                </p>
              </div>
            </div>
          ),
          searchText: coinData.bagName.concat(",", coinData.bagSymbol),
          isMobile: true,
        },
        {
          field: TableHeaderField.LTP,
          component: (
            <div
              key={"cryptoPrice" + coinData.bagName}
              className="text-base flex justify-end text-end"
            >
              {/* <p>{formatter.format(coinData.quote.USD.price)}</p> */}
              <p>
                {coinData?.ltp < 0.0001 ? (
                  <KatexNumber price={coinData?.ltp} />
                ) : (
                  (coinData?.ltp || 0).toFixed(4)
                )}
              </p>
            </div>
          ),
        },
        {
          field: TableHeaderField.TRADE_CURRENCY,
          component: (
            <div key={"curreny" + coinData.bagName} className="">
              USD
            </div>
          ),
          className: "font-silkscreen text-gray-700	",
        },

        {
          field: TableHeaderField.INVESTED_VALUE,
          component: (
            <div
              key={"investedValue" + coinData.bagName}
              className=" text-base flex justify-end text-end"
            >
              <div>
                {/* <p>{formatter.format(coinData.quote.USD.price)}</p> */}
                <p>
                  {coinData?.totalInvested < 0.0001 ? (
                    <KatexNumber price={coinData?.ltp} />
                  ) : (
                    (coinData?.totalInvested || 0).toFixed(4)
                  )}
                </p>
              </div>
            </div>
          ),
        },
        {
          field: TableHeaderField.TRADE_CURRENCY_1,
          component: <div key={"curreny" + coinData.bagName}>USD</div>,
          className: "font-silkscreen text-gray-700	",
        },
        {
          field: TableHeaderField.CURRENT_VALUE,
          component: (
            <div
              key={"currentValue" + coinData.bagName}
              className="text-base flex justify-end text-end"
            >
              <div>
                <p>
                  {coinData?.currentValue < 0.0001 ? (
                    <KatexNumber price={coinData?.ltp} />
                  ) : (
                    (coinData?.currentValue || 0).toFixed(4)
                  )}
                </p>
              </div>
            </div>
          ),
          isMobile: true,
        },

        {
          field: TableHeaderField.TRADE_CURRENCY_2,
          component: <div key={"curreny" + coinData.bagName}>USD</div>,
          className: "font-silkscreen text-gray-700	",
        },

        {
          field: TableHeaderField.CHANGE_WITH_PERCENTAGE,
          component: (
            <div
              key={"change" + coinData.bagName}
              className="flex justify-end text-end"
            >
              <div className="text-base">
                {/* <p>{formatter.format(coinData.quote.USD.price)}</p> */}
                <p>
                  {coinData?.returnValue < 0.0001 ? (
                    <KatexNumber price={coinData?.ltp} />
                  ) : (
                    (coinData?.returnValue || 0).toFixed(4)
                  )}
                </p>

                <span>
                  <ProfitLoss percentage={coinData?.returnsPercentage || 0} />
                </span>
              </div>
            </div>
          ),
          isMobile: true,
        },
        {
          field: TableHeaderField.TRADE_CURRENCY_3,
          component: <div key={"curreny" + coinData.bagName}>USD</div>,
          className: "pt-5 content-start	font-silkscreen text-gray-700	",
        },
        {
          field: TableHeaderField.MENU,
          component: (
            <DropDown
              dropdownContent={[
                {
                  id: "1",
                  value: "Overview",
                  redirect: "/leaderboard/0",
                },
              ]}
              dropDownInfo={"MORE"}
              alignment="bottom-left"
            />
          ),
        },
      ];
    });
  }, [portfolioListData]);

  return (
    <div className=" justify-self-center	mt-8 w-11/12 md:w-full   h-full ">
      <Datatable
        headers={tableHeaders}
        rows={dataRows?.length === 0 ? dataRowsShimmer : dataRows}
        columnSizes={PORTFOLIO_FORM_TABLE_COLUMN_SIZE}
        isLoading={dataRows?.length === 0}
      />
    </div>
  );
};
