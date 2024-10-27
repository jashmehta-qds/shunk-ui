"use client";

import { CoinData } from "@/actionTypings/createForm";
import Header from "@/components/Header";
import TransactionForm from "@/components/TransactionForm";
import Shimmer from "@/components/shared/Shimmer";
import { Strategy } from "@/constants/leaderboard";
import { Datatable } from "@/shared/DataTable";
import {
  TableHeaderField,
  TableHeaders,
  TableRows,
} from "@/shared/DataTable/typings";
import { Modal } from "@/shared/Modal";
import { useToast } from "@/shared/Toast/toastContext";
import { linearGradientDef } from "@nivo/core";
import { ResponsiveLine } from "@nivo/line";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoLinkExternal } from "react-icons/go";
import { IoClose, IoThumbsUpSharp } from "react-icons/io5";
import dynamic from "next/dynamic";

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
  const { addToast } = useToast();

  for (let i = 0; i < DATA_COUNT; ++i) {
    labels.push(i.toString());
  }

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
      const response2 = await axios.get<Strategy>(
        `https://api.shunk.io/bag/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );
      let strategy: Strategy;
      if (response2) {
        strategy = response2.data;
        if (strategy?.chartData?.length) {
          const len = strategy.chartData[0].data.length;
          if (
            strategy.chartData[0].data[0].y <
            strategy.chartData[0].data[len - 1].y
          ) {
            strategy.chartData[0].color = "hsl(154, 70%, 80%)";
          } else if (
            strategy.chartData[0].data[0].y >
            strategy.chartData[0].data[len - 1].y
          ) {
            strategy.chartData[0].color = "hsl(0, 70%, 80%)";
          }
        }
      }

      setStrategyData(strategy);
      setCoinData(response?.data);
    };

    getCoinList();
  }, [id]);

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

  const tableRows: TableRows[][] = (strategyData?.coins || [...Array(4)]).map(
    (item, key) => {
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
                />
              ) : (
                <Shimmer height={32} width={32} isRounded />
              )}
              <div>
                <p className="truncate w-48 flex gap-2 items-center">
                  {strategyData ? (
                    <>
                      {coinInfo?.name}{" "}
                      <GoLinkExternal className="cursor-pointer" />
                    </>
                  ) : (
                    <Shimmer height={20} width={80} />
                  )}
                </p>
                <p>
                  {coinInfo?.symbol?.length ? (
                    coinInfo?.symbol
                  ) : (
                    <Shimmer height={15} width={40} customStyle="mt-2" />
                  )}
                </p>
              </div>
            </div>
          ),
          searchText: coinInfo?.name + coinInfo?.symbol + "",
        },
        {
          field: TableHeaderField.CRYPTO_PRICE,
          component: (
            <div>
              {coinInfo ? (
                <div className="text-xs">${coinInfo?.priceUSD}</div>
              ) : (
                <Shimmer height={20} width={60} />
              )}
              {strategyData ? (
                <div className="font-bold">$23904</div>
              ) : (
                <Shimmer height={20} width={60} customStyle="mt-2" />
              )}
            </div>
          ),
        },
        {
          field: TableHeaderField.MARKET_CAP,
          component: coinInfo ? (
            <div>${(coinInfo?.marketCap / 1000000).toFixed(2)}m</div>
          ) : (
            <Shimmer height={20} width={60} />
          ),
        },
        {
          field: TableHeaderField.ALLOCATION,
          component: (
            <div className="text-right">
              {coinInfo ? (
                item?.allocation + "%"
              ) : (
                <div className="flex justify-end">
                  <Shimmer height={20} width={40} />
                </div>
              )}
            </div>
          ),
        },
      ];
    }
  );

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 px-2 py-8 h-[100vh] w-[100vw]  overflow-y-scroll overflow-x-hidden m-auto">
      <Header goBack={() => router.push("/leaderboard")} />
      <div className="w-[90%] flex justify-between bg-white p-4 w-[100%] rounded-lg items-center">
        <div className="flex bg-white w-[100%] rounded-lg items-center gap-4">
          <div>
            {portfolio?.address?.length ? (
              <Image
                width={40}
                height={40}
                src={`https://effigy.im/a/${portfolio?.address}.png`}
                alt=""
              />
            ) : (
              <Shimmer height={40} width={40} isRounded />
            )}
          </div>
          <div>
            <div className="font-silkscreen text-xl">
              {portfolio?.name?.length ? (
                portfolio?.name
              ) : (
                <Shimmer width={50} height={24} customStyle="rounded-sm" />
              )}
            </div>
            <div className="flex gap-4">
              {portfolio?.code?.length ? (
                <div
                  style={{ border: "1.5px solid black" }}
                  className="font-semibold text-sm shadow-md  pl-1 pr-1 rounded-md"
                >
                  {portfolio?.code}
                </div>
              ) : (
                <Shimmer height={20} width={40} customStyle="rounded-sm mt-2" />
              )}
              <div>
                {strategyData?.address?.length ? (
                  <span
                    onClick={() => {
                      addToast("success !", "action success", "success");
                    }}
                    className="flex gap-2 items-center"
                  >
                    {strategyData?.address}
                    <GoLinkExternal className="cursor-pointer" />
                  </span>
                ) : (
                  <Shimmer
                    height={20}
                    width={100}
                    customStyle="rounded-sm mt-2"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          {strategyData ? (
            <Modal
              heading={`Investing - ${portfolio?.name}`}
              primaryButton={
                <button
                  onClick={() => {}}
                  className={`w-52 h-12 ${
                    true
                      ? "bg-purple-600 hover:bg-purple-800"
                      : "bg-indigo-600 hover:bg-indigo-800"
                  } transition-all duration-300 rounded-full shadow-xs text-white text-base font-semibold leading-6`}
                >
                  {true ? "Create" : "Next"}
                </button>
              }
              secondaryButton={<></>}
              openModal={openinvest}
              setOpenModal={setOpenInvest}
              onClickPrimaryButton={() => {}}
              onClickSecondaryButton={() => {
                // setIsCreatingContract(false);
                setOpenInvest(false);
              }}
              modalContent={
                <TransactionForm
                  isBuy
                  strategy={portfolio}
                  coinList={coinDataList}
                />
              }
            >
              {" "}
              <div
                onClick={() => {
                  setOpenInvest(true);
                }}
                className=" flex gap-4 whitespace-nowrap"
              >
                <button className="relative group inline-flex items-center px-8 py-1.5 overflow-hidden text-lg font-medium text-customBlue border-2 border-customBlue rounded-full hover:text-white group hover:bg-gray-50">
                  <span className="absolute right-0 block w-full h-0 transition-all bg-customBlue opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>

                  {/* Arrow with angled downward motion */}
                  <span className="absolute left-0 flex items-center justify-end w-10 h-10 duration-300 transform -translate-x-full group-hover:translate-x-0 ease">
                    <svg
                      className="w-5 h-5 transform rotate-45 group-hover:-rotate-45 transition-transform duration-300 ease"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      ></path>
                    </svg>
                  </span>

                  <span className="relative text-base font-semibold transition-all duration-300 group-hover:translate-x-3">
                    Invest
                  </span>
                </button>
              </div>
            </Modal>
          ) : (
            <Shimmer
              width={111}
              height={40}
              isRounded
              customStyle="flex w-[100%]"
            />
          )}
          {strategyData ? (
            <Modal
              heading={`Withdrawing - ${portfolio?.name} (${100} ${
                portfolio?.code
              })`}
              primaryButton={
                <button
                  onClick={() => {}}
                  className={`w-52 h-12 ${
                    true
                      ? "bg-purple-600 hover:bg-purple-800"
                      : "bg-indigo-600 hover:bg-indigo-800"
                  } transition-all duration-300 rounded-full shadow-xs text-white text-base font-semibold leading-6`}
                >
                  {true ? "Create" : "Next"}
                </button>
              }
              secondaryButton={<></>}
              openModal={openWithdraw}
              setOpenModal={setOpenWithdraw}
              onClickPrimaryButton={() => {}}
              onClickSecondaryButton={() => {
                // setIsCreatingContract(false);
                setOpenWithdraw(false);
              }}
              modalContent={
                <TransactionForm
                  isBuy={false}
                  strategy={portfolio}
                  coinList={coinDataList}
                />
              }
            >
              {" "}
              <div
                onClick={() => {
                  setOpenWithdraw(true);
                }}
                className="flex gap-4 whitespace-nowrap"
              >
                <button className="relative group inline-flex items-center px-8 py-1.5 overflow-hidden text-lg font-medium text-customBlue border-2 border-customBlue rounded-full hover:text-white group hover:bg-gray-50">
                  <span className="absolute left-0 block w-full h-0 transition-all bg-customBlue opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>

                  {/* Arrow with angled upward motion from the right */}
                  <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                    <svg
                      className="w-5 h-5 transform rotate-45 group-hover:-rotate-45 transition-transform duration-300 ease"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>

                  {/* Text moves left when arrow arrives */}
                  <span className="relative text-base font-semibold transition-all duration-300 group-hover:-translate-x-3">
                    Withdraw
                  </span>
                </button>
              </div>
            </Modal>
          ) : (
            <Shimmer
              height={40}
              width={111}
              isRounded
              customStyle="flex w-[100%]"
            />
          )}
        </div>
      </div>
      <div className="flex w-[90%] rounded-lg items-center gap-8 justify-space-between">
        <div className="flex-1 bg-white rounded-lg p-4">
          <div className="text-xs">TVL</div>
          <div className="font-bold">
            {portfolio?.aum?.length ? (
              portfolio?.aum
            ) : (
              <Shimmer width={50} height={20} />
            )}
          </div>
        </div>
        <div className="flex-1 bg-white rounded-lg p-4">
          <div className="text-xs">Return</div>
          {portfolio?.change.length ? (
            <div
              className={`font-bold text-${
                Number(portfolio?.change) > 0 ? "green" : "red"
              }-500`}
            >
              {Number(portfolio?.change) > 0
                ? "+" + portfolio?.change
                : portfolio?.change}
              %
            </div>
          ) : (
            <Shimmer width={60} height={20} />
          )}
        </div>
        <motion.div
          onClick={() => setModalOpen(true)}
          layoutId={"feesContainer"}
          className="flex-1 bg-white rounded-lg p-4 cursor-pointer"
        >
          <div className="text-xs">Click to view fees</div>
          <div className="font-bold">Fees</div>
        </motion.div>
      </div>
      <div className="flex gap-8 m-1 w-[100%] justify-center">
        <div
          style={{ height: "calc(50vh + 50px)", width: "100%" }}
          className="bg-white-500 flex flex-col items-center"
        >
          <div
            style={{
              height: "50vh",
              width: "90%",
              backgroundColor: "white",
              borderRadius: "0.5rem",
              overflow: "hidden",
            }}
            className="bg-white-500"
          >
            <ResponsiveLine
              data={strategyData?.chartData || []}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
                  { offset: 0, color: strategyData?.chartData?.[0]?.color },
                  {
                    offset: 100,
                    color: strategyData?.chartData?.[0]?.color,
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
            />
          </div>
          <div className="flex justify-between mt-4 w-[90%] flex-row-reverse">
            <div className="flex gap-2 bg-white rounded-full border border-gray-300 cursor-pointer">
              <div className="flex gap-2 items-center rounded-full hover:bg-gray-200 pl-2 pr-2">
                <IoThumbsUpSharp />
                {strategyData?.favoriteCounts}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] flex justify-center">
        <Datatable
          customStyles={{ width: "90%" }}
          rows={tableRows}
          headers={tableHeaders}
          columnSizes={[25, 25, 25, 25]}
          hidePagination
        />
      </div>
      <AnimatePresence>
        {modalOpen && (
          <div
            className="absolute top-0 left-0 right-0 bottom-0 z-5 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          ></div>
        )}
        {modalOpen && (
          <motion.div
            className="absolute rounded-lg shadow-md translateX(50%) top-[50%] bg-white z-50"
            layoutId={"feesContainer"}
            onClick={() => setSelectedId("")}
          >
            <div className="p-4 w-[33vw] relative">
              <div className="text-sm flex justify-between w-[100%] items-center">
                <div>Fees</div>
                <IoClose
                  onClick={() => setModalOpen(false)}
                  className="absolute top-2 right-2 cursor-pointer"
                />
              </div>
              {strategyData?.fees?.map((val, idx) => {
                return (
                  <div
                    className="flex justify-between w-[100%] items-center"
                    key={"fees-" + idx}
                  >
                    <div className="text-sm">{val.id}</div>
                    <div className="font-bold">{val.data}%</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default StrategyDetails;
