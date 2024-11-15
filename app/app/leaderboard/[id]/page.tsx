"use client";

import { CoinData } from "@/actionTypings/createForm";
import { coinDataList as fetchCoins } from "@/actions/createForm";
import { fetchChartData, fetchStrategyDetails } from "@/actions/strategy";
import Header from "@/components/Header";
import { timeFramesList } from "@/components/PortfolioList/constant";
import Shimmer from "@/components/shared/Shimmer";
import { ChartData, Strategy } from "@/constants/leaderboard";
import { Datatable } from "@/shared/DataTable";
import {
  TableHeaderField,
  TableHeaders,
  TableRows,
  TimeFrame,
} from "@/shared/DataTable/typings";
import { useToast } from "@/shared/Toast/toastContext";
import { linearGradientDef } from "@nivo/core";
import { ResponsiveLine } from "@nivo/line";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoLinkExternal } from "react-icons/go";
import { IoClose } from "react-icons/io5";

const customTooltip = ({ point }) => {
  return (
    <div
      style={{
        background: "white",
        padding: "5px",
        border: "1px solid #ccc",
      }}
    >
      {point.data.yFormatted}
    </div>
  );
};

const StrategyDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const DATA_COUNT = 12;
  const labels = [];

  const [strategyData, setStrategyData] = useState<Strategy | null>(null);
  const portfolio = strategyData;
  const [selectedId, setSelectedId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  // const [openModal, setOpenModal] = useState<boolean>(false);
  const [openinvest, setOpenInvest] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(TimeFrame.Month);
  const [chartData, setChartData] = useState<ChartData[] | null>(null);
  const { addToast } = useToast();

  for (let i = 0; i < DATA_COUNT; ++i) {
    labels.push(i.toString());
  }

  const [coinDataList, setCoinData] = useState<CoinData[]>([]);
  useEffect(() => {
    const getCoinList = async () => {

      const response = await fetchCoins();

      const response2 = await fetchStrategyDetails(String(id));
      let strategy: Strategy;
      if (response2?.data) {
        strategy = response2?.data;
        setStrategyData(strategy);
      }

      setCoinData(response);
    };

    getCoinList();
  }, [id]);

  useEffect(() => {
    const getChartData = async () => {
      const response = await fetchChartData(strategyData.code + "-USDT", selectedTimeFrame)
      if (response && response.data.timeFrame !== chartData?.[0].timeframe) {
        const len = response.data.data.length
        let color = ""
        if (
          response.data.data[0].price <
          response.data.data[len - 1].price
        ) {
          color = "hsl(154, 70%, 80%)";
        } else if (
          response.data.data[0].price >
          response.data.data[len - 1].price
        ) {
          color = "hsl(0, 70%, 80%)";
        }
        const chartdata: ChartData = {
          id: response.data._id,
          color: color,
          data: response.data.data.map((val, key) => {
            return {
              y: val.price,
              x: String(val.timestamp)
            }
          })
        }
        setChartData([chartdata]);
      }
    }
    if (strategyData && chartData === null) {
      getChartData()
    }
  }, [selectedTimeFrame, strategyData, chartData])

  const tableHeaders: TableHeaders[] = [
    {
      field: TableHeaderField.CRYPTO_INFO,
      component: "Coin",
      align: "text-start",
      isSearch: true,
    },
    {
      field: TableHeaderField.CRYPTO_PRICE,
      component: "Price/Invested",
      align: "flex-auto text-start",
    },
    {
      field: TableHeaderField.MARKET_CAP,
      component: "Market Cap",
      align: "text-end",
    },
    {
      field: TableHeaderField.ALLOCATION,
      component: "Allocation",
      align: "flex-auto text-right",
    },
  ];

  const tableRows: TableRows[][] = (strategyData?.coins || [...Array(4)]).map((item, key) => {
    const coinInfo = coinDataList.find((val) => val.symbol === item?.name);
    return [
      {
        field: TableHeaderField.CRYPTO_INFO,
        component: (
          <div className="flex gap-8">
            {coinInfo ? (
              <Image
                src={coinInfo.icon}
                alt={coinInfo.name + "logo"}
                className="w-10 h-10 mt-1 rounded-full"
                width={32}
                height={32}
              />) : <Shimmer height={32} width={32} isRounded />
            }
            <div>
              <p className="truncate w-48 flex gap-2 items-center">
                {strategyData ?
                  <>
                    {coinInfo?.name} <GoLinkExternal className="cursor-pointer" />
                  </> : <Shimmer height={20} width={80} />}
              </p>
              <p>{coinInfo?.symbol?.length ? coinInfo?.symbol : <Shimmer height={15} width={40} customStyle="mt-2" />}</p>
            </div>
          </div>
        ),
        searchText: coinInfo?.name + coinInfo?.symbol + "",
      },
      {
        field: TableHeaderField.CRYPTO_PRICE,
        component: (
          <div>
            {coinInfo ? <div className="text-xs">${coinInfo?.priceUSD}</div> : <Shimmer height={20} width={60} />}
            {strategyData ? <div className="font-bold">$23904</div> : <Shimmer height={20} width={60} customStyle="mt-2" />}
          </div>
        ),
      },
      {
        field: TableHeaderField.MARKET_CAP,
        component: coinInfo ? <div>${(coinInfo?.marketCap / 1000000).toFixed(2)}m</div> : <Shimmer height={20} width={60} />,
      },
      {
        field: TableHeaderField.ALLOCATION,
        component: <div className="text-right">{coinInfo ? item?.allocation + "%" : <div className="flex justify-end"><Shimmer height={20} width={40} /></div>}</div>,
      },
    ];
  });

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 px-4 py-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <Header goBack={() => router.push("/leaderboard")} />
      <div className="w-[95%] md:w-[90%] flex flex-col md:flex-row justify-between bg-white p-6 rounded-2xl items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex w-full items-center gap-6">
          <div className="relative">
            {portfolio?.address?.length ? (
              <Image
                width={56}
                height={56}
                className="rounded-full ring-2 ring-purple-100"
                src={`https://effigy.im/a/${portfolio?.address}.png`}
                alt=""
              /> 
            ) : <Shimmer height={56} width={56} isRounded />}
          </div>
          <div>
            <div className="font-silkscreen text-xl">{portfolio?.name?.length ? portfolio?.name : <Shimmer width={50} height={24} customStyle="rounded-sm" />}</div>
            <div className="flex gap-4">
              {portfolio?.code?.length ?
                <div
                  style={{ border: "1.5px solid black" }}
                  className="font-semibold text-sm shadow-md  pl-1 pr-1 rounded-md"
                >
                  {portfolio?.code}
                </div> : <Shimmer height={20} width={40} customStyle="rounded-sm mt-2" />}
              <div>
                {strategyData?.address?.length ? <span onClick={() => {
                  addToast("success !", "action success", "success");
                }}
                  className="flex gap-2 items-center">
                  {strategyData?.address}
                  <GoLinkExternal className="cursor-pointer" />
                </span> : <Shimmer height={20} width={100} customStyle="rounded-sm mt-2" />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 w-[95%] md:w-[90%] gap-4">
        {[
          { label: "TVL", value: portfolio?.aum },
          { 
            label: "Return", 
            value: portfolio?.change,
            isPositive: Number(portfolio?.change) > 0
          },
          { label: "Fees", value: "View Details", onClick: () => setModalOpen(true) }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -2 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            onClick={stat.onClick}
          >
            <div className="text-sm text-gray-600">{stat.label}</div>
            <div className={`text-xl font-bold mt-1 ${
              stat.label === "Return" 
                ? stat.isPositive 
                  ? "text-green-500"
                  : "text-red-500"
                : "text-gray-900"
            }`}>
              {stat.value || <Shimmer width={60} height={24} />}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="w-[95%] md:w-[90%] bg-white rounded-2xl p-6 shadow-sm">
        <div className="h-[50vh]">
          {chartData ? (
            <ResponsiveLine
              data={chartData || []}
              xScale={{ type: "point" }}
              curve="natural"
              enableArea={true}
              colors={{ datum: "color" }}
              enableGridX={false}
              enableGridY={false}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: true,
                reverse: false,
              }}
              defs={[
                linearGradientDef("gradientA", [
                  { offset: 0, color: chartData?.[0]?.color },
                  {
                    offset: 100,
                    color: chartData?.[0]?.color,
                    opacity: 0,
                  },
                ]),
              ]}
              fill={[{ match: "*", id: "gradientA" }]}
              axisTop={null}
              axisRight={null}
              axisBottom={null}
              axisLeft={null}
              pointSize={5}
              pointColor={{ theme: "background" }}
              pointBorderWidth={1}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
              tooltip={customTooltip}
              margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
              theme={{
                axis: {
                  ticks: {
                    text: {
                      fontSize: 12,
                      fill: "#6B7280"
                    }
                  }
                },
                grid: {
                  line: {
                    stroke: "#E5E7EB",
                    strokeWidth: 1
                  }
                }
              }}
            />
          ) : (
            <Shimmer width={100} height={100} />
          )}
        </div>
        <div className="flex justify-between mt-6">
          <div className="flex gap-2 p-1 bg-gray-50 rounded-lg">
            {timeFramesList.map((val, key) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedTimeFrame(val);
                  setChartData(null);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedTimeFrame === val
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[95%] md:w-[90%] bg-white rounded-2xl p-6 shadow-sm">
        <Datatable
          customStyles={{
            width: "100%",
            overflowX: "auto",
            borderRadius: "1rem"
          }}
          rows={tableRows}
          headers={tableHeaders}
          columnSizes={[25, 25, 25, 25]}
          hidePagination
        />
      </div>
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="absolute rounded-lg shadow-md translateX(50%) top-[50%] bg-white z-50"
            layoutId={"feesContainer"}
            onClick={() => setSelectedId("")}
          >
            <div className="p-4 w-[90vw] md:w-[33vw] relative">
              <div className="text-sm flex justify-between w-[100%] items-center">
                <div>Fees</div>
                <IoClose
                  onClick={() => setModalOpen(false)}
                  className="absolute top-2 right-2 cursor-pointer"
                />
              </div>
              {strategyData?.fees?.map((val, idx) => {
                return <div className="flex justify-between w-[100%] items-center" key={"fees-"+idx}>
                  <div className="text-sm">{val.id}</div>
                  <div className="font-bold">{val.data}%</div>
                </div>
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default StrategyDetails;
