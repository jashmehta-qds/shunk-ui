"use client"

import axios from "axios";
import { IoCaretForward, IoStarOutline, IoStar } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Datatable } from "@/shared/DataTable";
import React, { useEffect, useState } from "react";
import { TableHeaderField, TableHeaders, TableRows } from "@/shared/DataTable/typings";
import { STRATEGY_LIST_COLUMN_SIZES } from "@/constants/tableSizes";
import Image from "next/image";
import Header from "@/components/Header";
import { leaderBoardData } from "@/constants/leaderboard";
import { CoinData } from "@/app/api/coinData/route";

export default function Strategy() {
  const router = useRouter();
  const [coinDataList, setCoinData] = useState<CoinData[]>([]);
  useEffect(() => {
    const getCoinList = async () => {
      const response = await axios.get<CoinData[]>(
        "https://api.shunk.io/tokens",
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );

      setCoinData(response?.data);
    };

    getCoinList();
  }, []);

  const tableHeaders: TableHeaders[] = [
    {
      field: TableHeaderField.FAVOURITE,
      component: "",
      align: "text-start",
    },
    {
      field: TableHeaderField.CREATOR,
      component: "Creator",
      align: "text-start",
      isSearch: true,
    },
    {
      field: TableHeaderField.COMPOSITION,
      component: "Coins",
      align: "text-start",
    },
    {
      field: TableHeaderField.AUM,
      component: "AUM",
      align: "flex-auto text-end",
    },
    {
      field: TableHeaderField.PRICE,
      component: "Price(USDC)",
      align: "text-center",
    },
    {
      field: TableHeaderField.CARET,
      component: "",
      align: "text-end",
    },
  ];
  const dataRows: TableRows[][] = leaderBoardData.map((coinData, key) => {
    const random = Math.random() * 100;
    return [
      {
        field: TableHeaderField.FAVOURITE,
        component: (
          <div>
            <IoStar color="yellow" />
          </div>
        ),
        className: "p-2"
      },
      {
        field: TableHeaderField.CREATOR,
        component: (
          <div className="flex gap-2 items-center font-semibold text-sm">
            <Image
              src={"https://pagedone.io/asset/uploads/1704275541.png"}
              alt={"profile icon"}
              className="w-10 h-10 mt-1"
              width={64}
              height={64}
            />
            <div>
              <div>
                {coinData.name}
              </div>
              <div className="text-gray-500 text-xs">
                {coinData.address.slice(0, 5) + "..."}
              </div>
            </div>
          </div>
        ),
        searchText: "",
        className: "p-2"
      },
      {
        field: TableHeaderField.COMPOSITION,
        component: (
          <div className="flex items-center ">
            {coinDataList.length ?
              <div className="flex -space-x-2">
                  {/* {coinData.coins.slice(0, 3).map((coin, key2) => {
                    return <img className={`animate-fade-in-right-${2 + key2}0 w-6 h-6 border-2 border-white rounded-full`} src={coinDataList.find(item => item.symbol === coin)?.icon || ""} />
                  })} */}
                {coinData.coins.length > 0 && <img className={`animate-fade-in-right-20 w-6 h-6 border-2 border-white rounded-full`} src={coinDataList.find(item => item.symbol === coinData.coins[0])?.icon || ""} />}
                {coinData.coins.length > 1 && <img className={`animate-fade-in-right-30 w-6 h-6 border-2 border-white rounded-full`} src={coinDataList.find(item => item.symbol === coinData.coins[1])?.icon || ""} />}
                {coinData.coins.length > 2 && <img className={`animate-fade-in-right-40 w-6 h-6 border-2 border-white rounded-full`} src={coinDataList.find(item => item.symbol === coinData.coins[2])?.icon || ""} />}
                {coinData.coins.length > 3 ?
                  <div className="text-[0.625rem] animate-fade-in-right-50 w-6 h-6 border-2 border-white rounded-full bg-gray-200 flex items-center justify-between">&nbsp;+{coinData.coins.length - 3}&nbsp;&nbsp;</div> : null}
              </div> : null}
          </div>
        ),
        className: "p-2"
      },
      {
        field: TableHeaderField.AUM,
        component: (
          <div className="flex justify-end text-end font-semibold text-sm">
            {coinData.aum}
          </div>
        ),
        className: "p-2"
      },
      {
        field: TableHeaderField.PRICE,
        component: (
          <div className="pl-4 font-semibold text-sm">
            <div>{coinData.price}</div>
            <div className={`text-${Number(coinData.change) > 0 ? "green" : "red"}-500 text-xs`}>{Number(coinData.change) > 0 ? "+" + coinData.change : coinData.change}%</div>
          </div>
        ),
        className: "p-2"
      },
      {
        field: TableHeaderField.CARET,
        component: (
          <div className="cursor-pointer text-end flex justify-end">
            <IoCaretForward onClick={() => router.push("/leaderboard/" + key)} />
          </div>
        ),
        className: "p-2"
      }
    ];
  });
  return <main className="flex min-h-screen flex-col items-center justify-between px-24 py-8">
    <Header goBack={() => router.push("/")} />
    <div>
      <Datatable
        headers={tableHeaders}
        rows={dataRows}
        columnSizes={STRATEGY_LIST_COLUMN_SIZES}
        customStyles={{ width: "600px" }}
      />
    </div>
  </main>
}