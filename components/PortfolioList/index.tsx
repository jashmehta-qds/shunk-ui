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
      align: "text-end",
    },
    {
      field: TableHeaderField.TRADE_CURRENCY,
      component: "",
      align: "flex-auto text-end",
    },
    {
      field: TableHeaderField.CURRENT_VALUE,
      component: "Current Value",
      align: "text-end",
    },
    {
      field: TableHeaderField.TRADE_CURRENCY,
      component: "",
      align: "flex-auto text-end",
    },
    {
      field: TableHeaderField.CHANGE_WITH_PERCENTAGE,
      component: "Profit/Loss",
      align: "text-end",
    },
    {
      field: TableHeaderField.TRADE_CURRENCY,
      component: "",
      align: "flex-auto text-end",
    },
    {
      field: TableHeaderField.MENU,
      component: "Options",
      align: "text-end",
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
        // {
        //   field: TableHeaderField.MENU,
        //   component: (
        //     <div className="dropdown relative inline-flex">
        //       <button
        //         type="button"
        //         data-target={`dropdown-with-icon`}
        //         id={`dropdown-with-icon`}
        //         className="dropdown-toggle inline-flex justify-center items-center gap-2 py-3 px-6 text-sm bg-indigo-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700 "
        //       >
        //         {coinData.bagCode}
        //         <svg
        //           className="dropdown-open:rotate-180 w-2.5 h-2.5 text-white"
        //           width="16"
        //           height="16"
        //           viewBox="0 0 16 16"
        //           fill="none"
        //           xmlns="http://www.w3.org/2000/svg"
        //         >
        //           <path
        //             d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
        //             stroke="currentColor"
        //             stroke-width="2"
        //             stroke-linecap="round"
        //           ></path>
        //         </svg>
        //       </button>
        //       <div
        //         id={`dropdown-with-icon`}
        //         className="dropdown-menu rounded-xl shadow-lg bg-white absolute right-0 top-full w-72 mt-2"
        //         aria-labelledby={`dropdown-with-icon`}
        //       >
        //         <ul className="py-2">
        //           <li>
        //             <a
        //               className="flex items-center gap-3 px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium"
        //               href="javascript:;"
        //             >
        //               <svg
        //                 width="20"
        //                 height="20"
        //                 viewBox="0 0 20 20"
        //                 fill="none"
        //                 xmlns="http://www.w3.org/2000/svg"
        //               >
        //                 <path
        //                   d="M15.4167 7.5C16.5673 7.5 17.5 8.43274 17.5 9.58333V12.5C17.5 14.857 17.5 16.0355 16.7678 16.7678C16.0355 17.5 14.857 17.5 12.5 17.5H7.5C5.14298 17.5 3.96447 17.5 3.23223 16.7678C2.5 16.0355 2.5 14.857 2.5 12.5V9.58333C2.5 8.43274 3.43274 7.5 4.58333 7.5M10 13.3333L6.50337 9.83671M10 13.3333L13.4966 9.83671M10 13.3333V2.5"
        //                   stroke="black"
        //                   stroke-width="1.6"
        //                   stroke-linecap="round"
        //                   stroke-linejoin="round"
        //                 />
        //               </svg>{" "}
        //               Explore Bag{" "}
        //             </a>
        //           </li>
        //           <li>
        //             <a
        //               className="flex items-center gap-3 px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium"
        //               href="javascript:;"
        //             >
        //               <svg
        //                 width="20"
        //                 height="20"
        //                 viewBox="0 0 20 20"
        //                 fill="none"
        //                 xmlns="http://www.w3.org/2000/svg"
        //               >
        //                 <path
        //                   d="M5 10.8333H11.6667M5 13.3333H8.33333M11.3883 1.94437V5.55548C11.3883 6.47595 12.1345 7.22214 13.055 7.22214H16.6661M10.6985 1.66666H8.5C5.67157 1.66666 4.25736 1.66666 3.37868 2.54534C2.5 3.42402 2.5 4.83823 2.5 7.66666V12.3333C2.5 15.1618 2.5 16.576 3.37868 17.4546C4.25736 18.3333 5.67156 18.3333 8.49997 18.3333C9.30683 18.3333 10.1356 18.3333 10.945 18.3333C13.7731 18.3333 15.1871 18.3333 16.0658 17.4546C16.9444 16.576 16.9444 15.1618 16.9444 12.3333V7.91257C16.9444 7.47054 16.7689 7.04662 16.4563 6.73406L11.877 2.15481C11.5645 1.84225 11.1406 1.66666 10.6985 1.66666Z"
        //                   stroke="#111827"
        //                   stroke-width="1.6"
        //                   stroke-linecap="round"
        //                 />
        //               </svg>{" "}
        //               Buy{" "}
        //             </a>
        //           </li>
        //           <li>
        //             <a
        //               className="flex items-center gap-3  px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium"
        //               href="javascript:;"
        //             >
        //               <svg
        //                 width="20"
        //                 height="20"
        //                 viewBox="0 0 20 20"
        //                 fill="none"
        //                 xmlns="http://www.w3.org/2000/svg"
        //               >
        //                 <path
        //                   d="M15.1116 9.16666C15.2575 10.9606 15.8104 12.3731 16.3475 13.3586C16.7027 14.0104 16.2305 15 15.4881 15H4.51181C3.76939 15 3.27739 13.995 3.61578 13.3342C4.28214 12.0329 4.99996 9.94714 4.99996 6.99999C4.99996 5.58582 5.52663 4.22916 6.46413 3.22916C7.40246 2.22916 8.67496 1.66666 9.99996 1.66666C10.2808 1.66666 10.56 1.69166 10.8333 1.74166M11.4416 17.5C11.2953 17.7528 11.0851 17.9626 10.832 18.1085C10.579 18.2544 10.292 18.3312 9.99996 18.3312C9.70788 18.3312 9.42094 18.2544 9.1679 18.1085C8.91487 17.9626 8.70464 17.7528 8.5583 17.5M15 6.66666C15.663 6.66666 16.2989 6.40326 16.7677 5.93442C17.2366 5.46558 17.5 4.8297 17.5 4.16666C17.5 3.50362 17.2366 2.86773 16.7677 2.39889C16.2989 1.93005 15.663 1.66666 15 1.66666C14.3369 1.66666 13.701 1.93005 13.2322 2.39889C12.7634 2.86773 12.5 3.50362 12.5 4.16666C12.5 4.8297 12.7634 5.46558 13.2322 5.93442C13.701 6.40326 14.3369 6.66666 15 6.66666Z"
        //                   stroke="#111827"
        //                   stroke-width="1.6"
        //                   stroke-linecap="round"
        //                   stroke-linejoin="round"
        //                 />
        //               </svg>{" "}
        //               Sell{" "}
        //             </a>
        //           </li>
        //           <li>
        //             <a
        //               className="flex items-center gap-3 px-6 py-2 hover:bg-gray-100 text-red-500 font-medium"
        //               href="javascript:;"
        //             >
        //               <svg
        //                 width="20"
        //                 height="20"
        //                 viewBox="0 0 20 20"
        //                 fill="none"
        //                 xmlns="http://www.w3.org/2000/svg"
        //               >
        //                 <path
        //                   d="M9.16667 17.5L5.83333 17.5V17.5C3.98765 17.5 2.5 16.0123 2.5 14.1667V14.1667L2.5 5.83333V5.83333C2.5 3.98765 3.98765 2.5 5.83333 2.5V2.5L9.16667 2.5M8.22814 10L17.117 10M14.3393 6.66667L17.0833 9.41074C17.3611 9.68852 17.5 9.82741 17.5 10C17.5 10.1726 17.3611 10.3115 17.0833 10.5893L14.3393 13.3333"
        //                   stroke="#EF4444"
        //                   stroke-width="1.6"
        //                   stroke-linecap="round"
        //                   stroke-linejoin="round"
        //                 />
        //               </svg>{" "}
        //               Historyt{" "}
        //             </a>
        //           </li>
        //         </ul>
        //       </div>
        //     </div>
        //   ),
        // },
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
      <div className="dropdown relative inline-flex">
        <button
          type="button"
          data-target={"dropdown-with-icon 1"}
          className="dropdown-toggle inline-flex justify-center items-center gap-2 py-3 px-6 text-sm bg-indigo-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700 "
        >
          testing
          <svg
            className="dropdown-open:rotate-180 w-2.5 h-2.5 text-white"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            ></path>
          </svg>
        </button>
        <div
          id={"dropdown-with-icon 1"}
          className="dropdown-menu rounded-xl shadow-lg bg-white absolute right-0 top-full w-72 mt-2"
          aria-labelledby="dropdown-with-icon"
        >
          <ul className="py-2">
            <li>
              <a
                className="flex items-center gap-3 px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium"
                href="javascript:;"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.4167 7.5C16.5673 7.5 17.5 8.43274 17.5 9.58333V12.5C17.5 14.857 17.5 16.0355 16.7678 16.7678C16.0355 17.5 14.857 17.5 12.5 17.5H7.5C5.14298 17.5 3.96447 17.5 3.23223 16.7678C2.5 16.0355 2.5 14.857 2.5 12.5V9.58333C2.5 8.43274 3.43274 7.5 4.58333 7.5M10 13.3333L6.50337 9.83671M10 13.3333L13.4966 9.83671M10 13.3333V2.5"
                    stroke="black"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>{" "}
                Explore Bag{" "}
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-3 px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium"
                href="javascript:;"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 10.8333H11.6667M5 13.3333H8.33333M11.3883 1.94437V5.55548C11.3883 6.47595 12.1345 7.22214 13.055 7.22214H16.6661M10.6985 1.66666H8.5C5.67157 1.66666 4.25736 1.66666 3.37868 2.54534C2.5 3.42402 2.5 4.83823 2.5 7.66666V12.3333C2.5 15.1618 2.5 16.576 3.37868 17.4546C4.25736 18.3333 5.67156 18.3333 8.49997 18.3333C9.30683 18.3333 10.1356 18.3333 10.945 18.3333C13.7731 18.3333 15.1871 18.3333 16.0658 17.4546C16.9444 16.576 16.9444 15.1618 16.9444 12.3333V7.91257C16.9444 7.47054 16.7689 7.04662 16.4563 6.73406L11.877 2.15481C11.5645 1.84225 11.1406 1.66666 10.6985 1.66666Z"
                    stroke="#111827"
                    stroke-width="1.6"
                    stroke-linecap="round"
                  />
                </svg>{" "}
                Buy{" "}
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-3  px-6 py-2 hover:bg-gray-100 text-gray-900 font-medium"
                href="javascript:;"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.1116 9.16666C15.2575 10.9606 15.8104 12.3731 16.3475 13.3586C16.7027 14.0104 16.2305 15 15.4881 15H4.51181C3.76939 15 3.27739 13.995 3.61578 13.3342C4.28214 12.0329 4.99996 9.94714 4.99996 6.99999C4.99996 5.58582 5.52663 4.22916 6.46413 3.22916C7.40246 2.22916 8.67496 1.66666 9.99996 1.66666C10.2808 1.66666 10.56 1.69166 10.8333 1.74166M11.4416 17.5C11.2953 17.7528 11.0851 17.9626 10.832 18.1085C10.579 18.2544 10.292 18.3312 9.99996 18.3312C9.70788 18.3312 9.42094 18.2544 9.1679 18.1085C8.91487 17.9626 8.70464 17.7528 8.5583 17.5M15 6.66666C15.663 6.66666 16.2989 6.40326 16.7677 5.93442C17.2366 5.46558 17.5 4.8297 17.5 4.16666C17.5 3.50362 17.2366 2.86773 16.7677 2.39889C16.2989 1.93005 15.663 1.66666 15 1.66666C14.3369 1.66666 13.701 1.93005 13.2322 2.39889C12.7634 2.86773 12.5 3.50362 12.5 4.16666C12.5 4.8297 12.7634 5.46558 13.2322 5.93442C13.701 6.40326 14.3369 6.66666 15 6.66666Z"
                    stroke="#111827"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>{" "}
                Sell{" "}
              </a>
            </li>
            <li>
              <a
                className="flex items-center gap-3 px-6 py-2 hover:bg-gray-100 text-red-500 font-medium"
                href="javascript:;"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.16667 17.5L5.83333 17.5V17.5C3.98765 17.5 2.5 16.0123 2.5 14.1667V14.1667L2.5 5.83333V5.83333C2.5 3.98765 3.98765 2.5 5.83333 2.5V2.5L9.16667 2.5M8.22814 10L17.117 10M14.3393 6.66667L17.0833 9.41074C17.3611 9.68852 17.5 9.82741 17.5 10C17.5 10.1726 17.3611 10.3115 17.0833 10.5893L14.3393 13.3333"
                    stroke="#EF4444"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>{" "}
                Historyt{" "}
              </a>
            </li>
          </ul>
        </div>
      </div>
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
