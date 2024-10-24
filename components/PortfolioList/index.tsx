"use client"; // Ensure this is a Client Component

import {
  CREATE_FORM_TABLE_COLUMN_SIZE,
  PORTFOLIO_FORM_TABLE_COLUMN_SIZE,
} from "@/constants/tableSizes";
import { Datatable } from "@/shared/DataTable";
import {
  TableHeaderField,
  TableHeaders,
  TableRows,
} from "@/shared/DataTable/typings";
import KatexNumber from "@/shared/KatexNumber";
import Skeleton from "@/shared/Skeleton";
import { Stepper, StepperInterface } from "@/shared/Stepper/index";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import ProfitLoss from "../shared/ProfitLoss";
import { portfolioListData } from "./constant";
import DropDown from "@/shared/DropDown";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 4,
});

const shimmerArrayLoop = new Array(8).fill(1);
const dataRowsShimmer: TableRows[][] = shimmerArrayLoop.map(() => {
  return [
    {
      field: TableHeaderField.CHECKBOX,
      component: (
        <Skeleton isLoading={true} width="w-5 rounded-md	" height="h-5" />
      ),
      className: "p-5",
    },
    {
      field: TableHeaderField.CRYPTO_INFO,
      component: (
        <div className=" w-full flex gap-4">
          <Skeleton
            isLoading={true}
            height="h-10"
            width={"w-10"}
            type="circle"
          />
          <div className="w-3/5 flex flex-col gap-4">
            <Skeleton isLoading={true} height="h-4" width={"w-full"} />
            <Skeleton isLoading={true} height="h-4" width={"w-1/2"} />
          </div>
        </div>
      ),
    },
    {
      field: TableHeaderField.CRYPTO_PRICE,
      component: (
        <div className="w-full flex flex-col gap-4 place-items-end		">
          <Skeleton isLoading={true} height="h-4" width={"w-full"} />
          <Skeleton isLoading={true} height="h-4" width={"w-1/3"} />
        </div>
      ),
    },
    {
      field: TableHeaderField.MARKET_CAP,
      component: (
        <div className="w-full  place-items-end	">
          <Skeleton isLoading={true} width={"w-full"} />
        </div>
      ),
    },
    {
      field: TableHeaderField.CHART,
      component: (
        <div className="w-full  place-items-end	">
          <Skeleton
            type="chart"
            isLoading={true}
            height="h-[60px] "
            width={"w-full"}
          />
        </div>
      ),
    },
  ];
});

export const PortfolioList = () => {
  const [selectedCoinId, setSelectedCoinId] = useState<string[]>([]);

  const [isCreatingContract, setIsCreatingContract] = useState<boolean>(false);

  const tableHeaders: TableHeaders[] = [
    {
      field: TableHeaderField.BAG_INFO,
      component: "Coin",
      align: "text-start",
      isSearch: true,
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
      field: TableHeaderField.TRADE_CURRENCY,
      component: "",
      align: "flex-auto justify-end ",
    },
    {
      field: TableHeaderField.CURRENT_VALUE,
      component: "Current Value",
      align: "justify-end ",
    },
    {
      field: TableHeaderField.TRADE_CURRENCY,
      component: "",
      align: "flex-auto text-end",
    },
    {
      field: TableHeaderField.CHANGE_WITH_PERCENTAGE,
      component: "Profit/Loss",
      align: "justify-end text-end",
    },
    {
      field: TableHeaderField.TRADE_CURRENCY,
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
            <div key={"BagInfo" + coinData.bagCode} className="flex gap-8">
              <Image
                src={coinData.bagIcon}
                alt={coinData.bagCode + "logo"}
                className="w-10 h-10 mt-1 rounded-full"
                width={32}
                height={32}
              />
              <div>
                <p className="truncate w-48">{coinData.bagName}</p>
                <p>{coinData.bagCode}</p>
              </div>
            </div>
          ),
          searchText: coinData.bagName.concat(",", coinData.bagCode),
        },
        {
          field: TableHeaderField.LTP,
          component: (
            <div
              key={"cryptoPrice" + coinData.bagName}
              className="flex justify-end text-end"
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
            <div
              key={"curreny" + coinData.bagName}
              className="flex justify-end text-end"
            >
              USD
            </div>
          ),
        },

        {
          field: TableHeaderField.INVESTED_VALUE,
          component: (
            <div
              key={"investedValue" + coinData.bagName}
              className="flex justify-end text-end"
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
          component: (
            <div
              key={"curreny" + coinData.bagName}
              className="flex justify-end text-end"
            >
              USD
            </div>
          ),
        },
        {
          field: TableHeaderField.CURRENT_VALUE,
          component: (
            <div
              key={"currentValue" + coinData.bagName}
              className="flex justify-end text-end"
            >
              <div>
                {/* <p>{formatter.format(coinData.quote.USD.price)}</p> */}
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
        },

        {
          field: TableHeaderField.TRADE_CURRENCY_3,
          component: (
            <div
              key={"curreny" + coinData.bagName}
              className="flex justify-end text-end"
            >
              USD
            </div>
          ),
        },

        {
          field: TableHeaderField.CHANGE_WITH_PERCENTAGE,
          component: (
            <div
              key={"change" + coinData.bagName}
              className="flex justify-end text-end"
            >
              <div>
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
        },
        {
          field: TableHeaderField.TRADE_CURRENCY_2,
          component: (
            <div
              key={"curreny" + coinData.bagName}
              className="flex justify-start text-start"
            >
              USD
            </div>
          ),
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
  }, []);

  // useEffect(() => {
  //   const setAsyncItems = async () => {
  //     const fac = new FastAverageColor();
  //     const result = await Promise.all(
  //       selectedCoinId.map(async (coinId, id) => {
  //         const data = coinData.find((data) => data.symbol === coinId);
  //         let color = "initial";
  //         try {
  //           color = (await fac.getColorAsync(data.icon))?.hex;
  //         } catch (e) {}
  //         const adjust = 100 % selectedCoinId.length;

  //         return {
  //           id: data?.["_id"],
  //           name: (
  //             <li
  //               key={coinId}
  //               className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-white text-gray-900 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg cursor-pointer"
  //             >
  //               <div className="group flex justify-between w-full hover:text-indigo-600">
  //                 <div className="flex gap-8">
  //                   <Image
  //                     src={data.icon}
  //                     alt={data?.name + " logo"}
  //                     className="w-10 h-10 rounded-full self-center mt-1"
  //                     width={32}
  //                     height={32}
  //                   />
  //                   <div>
  //                     <p className="text-lg pt-1">{data?.symbol}</p>
  //                     <p className="text-md pt-1">{data?.name}</p>
  //                   </div>
  //                 </div>
  //               </div>
  //             </li>
  //           ),
  //           percentage:
  //             (id === 1 ? adjust : 0) + (100 - adjust) / selectedCoinId.length,
  //           color: color ?? "",
  //         } as Item;
  //       })
  //     );
  //     setItemContent(result);
  //   };

  //   setAsyncItems();
  // }, [coinData, selectedCoinId]);

  return (
    <div>
      <div className="mt-8 w-full   h-full ">
        <Datatable
          headers={tableHeaders}
          rows={portfolioListData.length === 0 ? dataRowsShimmer : dataRows}
          columnSizes={PORTFOLIO_FORM_TABLE_COLUMN_SIZE}
          // customStyles={{ width: "800px" }}
          isLoading={portfolioListData.length === 0}
        />
      </div>
    </div>
  );
};
