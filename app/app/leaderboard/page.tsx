"use client";

import { CoinData } from "@/app/api/coinData/route";
import Header from "@/components/Header";
import Shimmer from "@/components/shared/Shimmer";
import { LeaderBoard } from "@/constants/leaderboard";
import { STRATEGY_LIST_COLUMN_SIZES } from "@/constants/tableSizes";
import { Datatable } from "@/shared/DataTable";
import {
  TableHeaderField,
  TableHeaders,
  TableRows,
} from "@/shared/DataTable/typings";
import FavoriteStar from "@/shared/Favorites";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCaretForward } from "react-icons/io5";

export default function Strategy() {
  const router = useRouter();
  const [coinDataList, setCoinData] = useState<CoinData[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderBoard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
      setCoinData(response?.data);
    };

    const getLeaderboard = async () => {
      const response = await axios.get<LeaderBoard[]>(
        "https://api.shunk.io/leaderboard",
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );
      setLeaderboard(response.data);
    };

    getLeaderboard();
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
  const dataRows: TableRows[][] = (
    !isLoading ? leaderboard : [...Array(5)]
  ).map((coinData, key) => {
    return [
      {
        field: TableHeaderField.FAVOURITE,
        component: (
          <div>
            <FavoriteStar />
          </div>
        ),
        className: "p-2",
      },
      {
        field: TableHeaderField.CREATOR,
        component: (
          <div className="flex gap-2 items-center font-semibold text-sm">
            {isLoading ? (
              <Shimmer height={40} width={40} isRounded />
            ) : (
              <Image
                src={"https://pagedone.io/asset/uploads/1704275541.png"}
                alt={"profile icon"}
                className="w-10 h-10 mt-1"
                width={64}
                height={64}
              />
            )}
            <div>
              <div>
                {isLoading ? (
                  <Shimmer height={20} width={50} />
                ) : (
                  coinData?.name
                )}
              </div>
              <div className="text-gray-500 text-xs">
                {isLoading ? (
                  <Shimmer height={15} width={40} customStyle="mt-2" />
                ) : (
                  coinData?.address?.slice(0, 5) + "..."
                )}
              </div>
            </div>
          </div>
        ),
        searchText: "",
        className: "p-2",
      },
      {
        field: TableHeaderField.COMPOSITION,
        component: (
          <div className="flex items-center ">
            {coinDataList?.length ? (
              <div className="flex -space-x-2">
                {/* {coinData.coins.slice(0, 3).map((coin, key2) => {
                    return <img className={`animate-fade-in-right-${2 + key2}0 w-6 h-6 border-2 border-white rounded-full`} src={coinDataList.find(item => item.symbol === coin)?.icon || ""} />
                  })} */}
                {coinData?.coins?.length > 0 && (
                  <Image
                  width={24}
                  height={24}
                    className={`animate-fade-in-right-20 w-6 h-6 border-2 border-white rounded-full`}
                    src={
                      coinDataList.find(
                        (item) => item.symbol === coinData.coins[0].name
                      )?.icon || ""
                    }
                    alt={coinData.coins[0].name + "-coin"}
                  />
                )}
                {coinData?.coins?.length > 1 && (
                  <Image
                  width={24}
                  height={24}
                    className={`animate-fade-in-right-30 w-6 h-6 border-2 border-white rounded-full`}
                    src={
                      coinDataList.find(
                        (item) => item.symbol === coinData.coins[1].name
                      )?.icon || ""
                    }
                    alt={coinData.coins[1].name + "-coin"}
                  />
                )}
                {coinData?.coins?.length > 2 && (
                  <Image
                  width={24}
                  height={24}
                    className={`animate-fade-in-right-40 w-6 h-6 border-2 border-white rounded-full`}
                    src={
                      coinDataList.find(
                        (item) => item.symbol === coinData.coins[2].name
                      )?.icon || ""
                    }
                    alt={coinData.coins[2].name + "-coin"}
                  />
                )}
                {coinData?.coins?.length > 3 ? (
                  <div className="text-[0.625rem] animate-fade-in-right-50 w-6 h-6 border-2 border-white rounded-full bg-gray-200 flex items-center justify-between">
                    &nbsp;+{coinData.coins.length - 3}&nbsp;&nbsp;
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="relative h-[24px]">
                <Shimmer
                  height={24}
                  width={24}
                  isRounded
                  customStyle="absolute left-0"
                />
                <Shimmer
                  height={24}
                  width={24}
                  isRounded
                  customStyle="absolute left-4"
                />
                <Shimmer
                  height={24}
                  width={24}
                  isRounded
                  customStyle="absolute left-8"
                />
                <Shimmer
                  height={24}
                  width={24}
                  isRounded
                  customStyle="absolute left-12"
                />
              </div>
            )}
          </div>
        ),
        className: "p-2",
      },
      {
        field: TableHeaderField.AUM,
        component: (
          <div className="flex justify-end text-end font-semibold text-sm">
            {isLoading ? <Shimmer height={20} width={40} /> : coinData?.aum}
          </div>
        ),
        className: "p-2",
      },
      {
        field: TableHeaderField.PRICE,
        component: (
          <div className="pl-4 font-semibold text-sm">
            <div>
              {isLoading ? <Shimmer height={15} width={40} /> : coinData?.price}
            </div>
            {isLoading ? (
              <Shimmer height={15} width={30} customStyle="mt-2" />
            ) : (
              <div
                className={`text-${
                  Number(coinData?.change) > 0 ? "green" : "red"
                }-500 text-xs`}
              >
                {Number(coinData?.change) > 0
                  ? "+" + coinData?.change
                  : coinData?.change}
                %
              </div>
            )}
          </div>
        ),
        className: "p-2",
      },
      {
        field: TableHeaderField.CARET,
        component: (
          <div className="cursor-pointer text-end flex justify-end">
            <IoCaretForward
              onClick={() => router.push("/leaderboard/" + key)}
            />
          </div>
        ),
        className: "p-2",
      },
    ];
  });
  return (
    <main className=" m-auto	 flex min-h-screen flex-col items-center px-24 py-8">
      <title>Leaderboard</title>
      <Header />
      <div className="max-w[80vw] mt-16 p-8 min-w[50vw] h-full grid gap-4">
        <Datatable
          headers={tableHeaders}
          rows={dataRows}
          columnSizes={STRATEGY_LIST_COLUMN_SIZES}
          customStyles={{ width: "600px" }}
        />
      </div>
    </main>
  );
}
