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
import Tooltip from "@/shared/Tooltip";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCaretForward } from "react-icons/io5";
// import { isMobile } from "react-device-detect";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Strategy() {
  const router = useRouter();
  const [coinDataList, setCoinData] = useState<CoinData[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderBoard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

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
      component: <FavoriteStar disable />,
      align: "text-start",
      isMobile: true,
    },
    {
      field: TableHeaderField.CREATOR,
      component: "Creator",
      align: "text-start",
      isSearch: true,
      isMobile: true,
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
      isMobile: true,
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
        component: <FavoriteStar disable={isLoading} />,
        className: "p-2 lg:p-5",
        isMobile: true,
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
                className="w-10 h-10"
                width={40}
                height={40}
              />
            )}
            <div className="w-3/4 flex flex-col gap-1">
              <div className=" text-lg font-semibold	 text-gray-900">
                {isLoading ? (
                  <Skeleton isLoading={true} height="h-7" width={"w-full"} />
                ) : (
                  coinData?.name
                )}
              </div>
              <div className="text-sm font-medium	 text-gray-600">
                {isLoading ? (
                  <Skeleton isLoading={true} height="h-5" width={"w-1/2"} />
                ) : (
                  <Tooltip content={coinData.address} position="bottom">
                    {coinData?.address?.slice(0, 8) + "..."}
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        ),
        searchText: "",
        className: "p-2 lg:p-5",
        isMobile: true,
      },
      {
        field: TableHeaderField.COMPOSITION,
        component: (
          <div className="flex items-center ">
            {!isLoading ? (
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
        className: "p-2 lg:p-5",
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
        className: "p-2 lg:p-5",
      },
      {
        field: TableHeaderField.PRICE,
        component: (
          <div className="text-right items-end	justify-items-end	 flex flex-col gap-1	 font-semibold text-base text-gray-700">
            <Skeleton height={"h-5"} width={"w-2/3"} isLoading={isLoading}>
              {coinData?.price}
            </Skeleton>
            <Skeleton height={"h-4"} width={"w-1/2"} isLoading={isLoading}>
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
            </Skeleton>
          </div>
        ),
        className: "p-2 lg:p-5 text-right",
        isMobile: true,
      },
      {
        field: TableHeaderField.CARET,
        component: (
          <div
            className={` ${
              isLoading ? "opacity-0 scale-0" : "opacity-100 scale-100"
            } hover:scale-150	 duration-300  cursor-pointer text-end flex justify-end`}
          >
            <IoCaretForward
              className="w-5 h-5"
              onClick={() => router.push("/leaderboard/" + key)}
            />
          </div>
        ),
        className: "p-2 lg:p-5",
      },
    ];
  });
  return (
    <div className="m-auto	 h-full flex flex-col items-center lg:px-24 lg:py-8">
      <Header />
      <title>Leaderboard</title>
      <main className={`w-full m-auto flex  flex-col items-center  p-4 lg:p-8`}>
        <p className="w-full mb-4 text-left lg:text-center font-silkscreen  text-2xl lg:text-3xl -z-10 font-medium">
          Leaderboard
        </p>

        {/* {isDeviceMobile !== null ? (
        <div
          style={{ maxWidth: "80vw" }}
          className="min-w[50vw] h-full grid gap-4"
        >
          <p className="font-silkscreen text-3xl -z-10 font-medium">
            Leaderboard
          </p>
        </div>
      ) : null} */}
        <Datatable
          headers={tableHeaders}
          rows={dataRows}
          columnSizes={STRATEGY_LIST_COLUMN_SIZES}
          customStyles={isMobile ? "w-full" : " w-[800px]"}
        />
      </main>
    </div>
  );
}
