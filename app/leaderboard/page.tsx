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
import Skeleton from "@/shared/Skeleton";
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
      align: "justify-end",
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
        className: "p-5",
      },
      {
        field: TableHeaderField.CREATOR,
        component: (
          <div className="flex gap-4 items-center ">
            {isLoading ? (
              <Skeleton
                isLoading={true}
                height="h-10"
                width={"w-10"}
                type="circle"
              />
            ) : (
              <Image
                src={"https://pagedone.io/asset/uploads/1704275541.png"}
                alt={"profile icon"}
                className="w-10 h-10 mt-1"
                width={40}
                height={40}
              />
            )}
            <div className="w-3/4 flex flex-col gap-1">
              <div className=" text-lg font-semibold	 text-gray-900">
                {isLoading ? (
                  <Skeleton isLoading={true} height="h-6" width={"w-full"} />
                ) : (
                  coinData?.name
                )}
              </div>
              <div className="text-sm font-medium	 text-gray-700">
                {isLoading ? (
                  <Skeleton isLoading={true} height="h-4" width={"w-1/2"} />
                ) : (
                  coinData?.address?.slice(0, 8) + "..."
                )}
              </div>
            </div>
          </div>
        ),
        searchText: "",
        className: "p-5",
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
                    width={36}
                    height={36}
                    className={`animate-fade-in-right-20 w-9 h-9 border-2 border-white rounded-full`}
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
                    width={36}
                    height={36}
                    className={`animate-fade-in-right-30 w-9 h-9 border-2 border-white rounded-full`}
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
                    width={36}
                    height={36}
                    className={`animate-fade-in-right-40 w-9 h-9 border-2 border-white rounded-full`}
                    src={
                      coinDataList.find(
                        (item) => item.symbol === coinData.coins[2].name
                      )?.icon || ""
                    }
                    alt={coinData.coins[2].name + "-coin"}
                  />
                )}
                {coinData?.coins?.length > 3 ? (
                  <p className=" text-lg text-gray-200  animate-fade-in-right-50 w-9 h-9 border-2 border-white rounded-full bg-gray-200 flex items-center justify-between">
                    &nbsp;+{coinData.coins.length - 3}&nbsp;&nbsp;
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="relative h-9">
                <Shimmer
                  height={36}
                  width={36}
                  isRounded
                  customStyle="absolute left-0"
                />
                <Shimmer
                  height={36}
                  width={36}
                  isRounded
                  customStyle="absolute left-6"
                />
                <Shimmer
                  height={36}
                  width={36}
                  isRounded
                  customStyle="absolute left-12"
                />
                <Shimmer
                  height={36}
                  width={36}
                  isRounded
                  customStyle="absolute left-18"
                />
              </div>
            )}
          </div>
        ),
        className: "p-5",
      },
      {
        field: TableHeaderField.AUM,
        component: (
          <div className="w-full flex justify-end text-end text-base text-gray-900 font-semibold ">
            <Skeleton isLoading={isLoading} height="h-6" width={"w-full"}>
              {coinData?.aum}
            </Skeleton>
          </div>
        ),
        className: "p-5",
      },
      {
        field: TableHeaderField.PRICE,
        component: (
          <div className="text-right	 pl-4 font-semibold text-base text-gray-700">
            <div>
              {isLoading ? <Shimmer height={15} width={40} /> : coinData?.price}
            </div>
            {isLoading ? (
              <Shimmer height={15} width={30} customStyle="mt-2" />
            ) : (
              <div
                className={` text-${
                  Number(coinData?.change) > 0 ? "green" : "red"
                }-500 font-medium text-sm`}
              >
                {Number(coinData?.change) > 0
                  ? "+" + coinData?.change
                  : coinData?.change}
                %
              </div>
            )}
          </div>
        ),
        className: "p-5",
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
        className: "p-5",
      },
    ];
  });
  return (
    <main className=" m-auto	 flex min-h-screen flex-col items-center px-24 py-8">
      <title>Leaderboard</title>
      <Header />

      <div className="max-w[80vw]  p-8 min-w[50vw] h-full grid gap-4">
        <p className="font-silkscreen text-3xl -z-10 font-medium">
          Leaderboard
        </p>
        <Datatable
          headers={tableHeaders}
          rows={dataRows}
          columnSizes={STRATEGY_LIST_COLUMN_SIZES}
          customStyles={{ width: "800px" }}
        />
      </div>
    </main>
  );
}
