"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  IoThumbsUpOutline,
  IoThumbsUpSharp,
  IoThumbsDownOutline,
  IoThumbsDownSharp,
  IoClose,
} from "react-icons/io5";
import { GoLinkExternal } from "react-icons/go";
import { useRouter, useParams } from "next/navigation";
import { Datatable } from "@/shared/DataTable";
import React, { useEffect, useState } from "react";
import {
  TableHeaderField,
  TableHeaders,
  TableRows,
} from "@/shared/DataTable/typings";
import Image from "next/image";
import { ResponsiveLine, Line, Serie } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { linearGradientDef } from "@nivo/core";
import usdcIcon from "@/public/usdc.png";
import { leaderBoardData } from "@/constants/leaderboard";
import Header from "@/components/Header";
import { CoinData } from "@/actionTypings/createForm";
import axios from "axios";
import { Modal } from "@/shared/Modal";
import { useToast } from "@/shared/Toast/toastContext";
import TransactionForm from "@/components/TransactionForm";

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
  const portfolio = leaderBoardData[Number(id)];
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

      setCoinData(response?.data);
    };

    getCoinList();
  }, []);

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
      align: "flex-auto text-end",
    },
  ];

  const tableRows: TableRows[][] = portfolio.coins.map((item, key) => {
    const coinInfo = coinDataList.find((val) => val.symbol === item);

    return [
      {
        field: TableHeaderField.CRYPTO_INFO,
        component: (
          <div className="flex gap-8">
            {coinInfo && (
              <Image
                src={coinInfo.icon}
                alt={coinInfo.name + "logo"}
                className="w-10 h-10 mt-1 rounded-full"
                width={32}
                height={32}
              />
            )}
            <div>
              <p className="truncate w-48 flex gap-2 items-center">
                {coinInfo?.name} <GoLinkExternal className="cursor-pointer" />
              </p>
              <p>{coinInfo?.symbol}</p>
            </div>
          </div>
        ),
        searchText: coinInfo?.name + coinInfo?.symbol + "",
      },
      {
        field: TableHeaderField.CRYPTO_PRICE,
        component: (
          <div>
            <div className="text-xs">${coinInfo?.priceUSD}</div>
            <div className="font-bold">$23904</div>
          </div>
        ),
      },
      {
        field: TableHeaderField.MARKET_CAP,
        component: <div>$234.4m</div>,
      },
      {
        field: TableHeaderField.ALLOCATION,
        component: <div className="text-end">25%</div>,
      },
    ];
  });

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 px-2 py-8 h-[100vh] w-[100vw]  overflow-y-scroll overflow-x-hidden m-auto">
      <Header goBack={() => router.push("/leaderboard")} />
      <div className="w-[90%] flex justify-between bg-white p-4 w-[100%] rounded-lg items-center">
        <div className="flex bg-white w-[100%] rounded-lg items-center gap-4">
          <div>
            <Image
              width={40}
              height={40}
              src={`https://effigy.im/a/${portfolio.address}.png`}
              alt=""
            />
          </div>
          <div>
            <div className="font-silkscreen text-xl">{portfolio.name}</div>
            <div className="flex gap-4">
              <div
                style={{ border: "1.5px solid black" }}
                className="font-semibold text-sm shadow-md  pl-1 pr-1 rounded-md"
              >
                {portfolio.code}
              </div>
              <div
                onClick={() => {
                  addToast("success !", "action success", "success");
                }}
                className="flex gap-2 items-center"
              >
                0x34urf9438rfedfrfsd{" "}
                <GoLinkExternal className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        <Modal
          heading={`Investing - ${portfolio.name}`}
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
          secondaryButton={
            <></>
          }
          openModal={openinvest}
          setOpenModal={setOpenInvest}
          onClickPrimaryButton={() => {}}
          onClickSecondaryButton={() => {
            // setIsCreatingContract(false);
            setOpenInvest(false);
          }}
          modalContent={<TransactionForm isBuy strategy={portfolio} coinList={coinDataList} />}
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
        <Modal
          heading={`Withdrawing - ${portfolio.name} (${100} ${portfolio?.code})`}
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
          secondaryButton={
            <></>
          }
          openModal={openWithdraw}
          setOpenModal={setOpenWithdraw}
          onClickPrimaryButton={() => {}}
          onClickSecondaryButton={() => {
            // setIsCreatingContract(false);
            setOpenWithdraw(false);
          }}
          modalContent={<TransactionForm isBuy={false} strategy={portfolio} coinList={coinDataList} />}
        >
          {" "}
          <div
            onClick={() => {
              setOpenWithdraw(true);
            }}
            className="flex ml-4 gap-4 whitespace-nowrap"
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
      </div>
      <div className="flex w-[90%] rounded-lg items-center gap-8 justify-space-between">
        <div className="flex-1 bg-white rounded-lg p-4">
          <div className="text-xs">TVL</div>
          <div className="font-bold">{portfolio?.aum}</div>
        </div>
        <div className="flex-1 bg-white rounded-lg p-4">
          <div className="text-xs">Return</div>
          <div
            className={`font-bold text-${
              Number(portfolio.change) > 0 ? "green" : "red"
            }-500`}
          >
            {Number(portfolio.change) > 0
              ? "+" + portfolio.change
              : portfolio.change}
            %
          </div>
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
              data={portfolio.chartData}
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
                  { offset: 0, color: portfolio.chartData[0].color },
                  {
                    offset: 100,
                    color: portfolio.chartData[0].color,
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
                230
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
              <div className="flex justify-between w-[100%] items-center">
                <div className="text-sm">Management Fees</div>
                <div className="font-bold">2%</div>
              </div>
              <div className="flex justify-between w-[100%] items-center">
                <div className="text-sm">Performance Fees</div>
                <div className="font-bold">2%</div>
              </div>
              <div className="flex justify-between w-[100%] items-center">
                <div className="text-sm">Entry Fees</div>
                <div className="font-bold">2%</div>
              </div>
              <div className="flex justify-between w-[100%] items-center">
                <div className="text-sm">Exit Fees</div>
                <div className="font-bold">2%</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default StrategyDetails;
