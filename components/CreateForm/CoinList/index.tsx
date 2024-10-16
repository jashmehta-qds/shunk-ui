"use client"; // Ensure this is a Client Component

import { CoinData } from "@/app/api/coinData/route";
import { CREATE_FORM_TABLE_COLUMN_SIZE } from "@/constants/tableSizes";
import AnimatedNumber from "@/shared/AnimatedNumber";
import { BubbleDrag } from "@/shared/BubbleDrag";
import { Datatable } from "@/shared/DataTable";
import {
  TableHeaderField,
  TableHeaders,
  TableRows,
} from "@/shared/DataTable/typings";
import KatexNumber from "@/shared/KatexNumber";
import LineChart from "@/shared/LineChart";
import { Modal } from "@/shared/Modal";
import Skeleton from "@/shared/Skeleton";
import { Stepper, StepperInterface } from "@/shared/Stepper/index";
import Tooltip from "@/shared/Tooltip";
import { useContract } from "@thirdweb-dev/react";
import axios from "axios";
import { FastAverageColor } from "fast-average-color";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Item, PercentageDistributor } from "../../PercentageDistributor";
import Checkbox from "../../primitives/Checkbox";
import ProfitLoss from "../../shared/ProfitLoss";
import { ShunkFactoryABI } from "../CONTRACT_ABI";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 4,
});
const FEES = [
  {
    id: 1,
    heading: "Management Fees",
    content:
      "Flat fee charged to manage the vault. Measured as an annualized % of Total Value Locked.",
  },
  {
    id: 1,
    heading: "Performance Fees",
    content:
      "Fee charged based on the vault performance. Measured based on the difference between the vault’s current price and its high watermark (the highest previous point).",
  },
  {
    id: 1,
    heading: "Entry Fees",
    content:
      "Flat fee charged when user deposits into vault. Measured as a % of the deposit amount.",
  },
  {
    id: 1,
    heading: "Exit Fees",
    content:
      "Charged when user withdraws from vault. Measured as a % of the withdrawal amount.",
  },
];
const formatMarketCap = (marketCap: number) => {
  if (marketCap > 1_000_000_000) {
    return (
      (marketCap / 1_000_000_000).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }) + "B"
    );
  } else if (marketCap > 1_000_000) {
    return (
      (marketCap / 1_000_000).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      }) + "M"
    );
  } else if (marketCap > 1_000) {
    return (
      (marketCap / 1_000).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      }) + "k"
    );
  } else {
    return marketCap;
  }
};

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

const CONTRACT_ADDRESS = "0x5BbD57Fc377cA22F26a714c53Eda3509f13B505B";
export const CoinList = () => {
  const [input, setInput] = useState<string>("");
  const [selectedCoinId, setSelectedCoinId] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [coinData, setCoinData] = useState<CoinData[]>([]);
  // const { filteredData } = useHandleSearch<CoinListData>(
  //   coinListApiResponse.data,
  //   ["name", "symbol"],
  //   input
  // );

  const [step, setStep] = useState<number>(1);
  const [isCreatingContract, setIsCreatingContract] = useState<boolean>(false);

  const { contract, isLoading, isError } = useContract(
    CONTRACT_ADDRESS,
    ShunkFactoryABI
  );
  // const { mutateAsync, isLoading, error } = useContractWrite(
  //   // contract,
  //   "createToken"
  // );
  useEffect(() => {
    console.log("contract");
    console.log(contract);
    console.log(isLoading);
    console.log(isError);
    console.log(CONTRACT_ADDRESS);
  }, [contract, isError, isLoading]);
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
      field: TableHeaderField.CHECKBOX,
      component: (
        <input
          disabled
          type="checkbox"
          value=""
          className="w-5 h-5 appearance-none border   rounded-md mr-2 border-indigo-500 bg-indigo-100 "
        />
      ),
      align: "text-start",
    },
    {
      field: TableHeaderField.CRYPTO_INFO,
      component: "Coin",
      align: "text-start",
      isSearch: true,
    },
    {
      field: TableHeaderField.CRYPTO_PRICE,
      component: "Price",
      align: "flex-auto text-end",
    },
    {
      field: TableHeaderField.MARKET_CAP,
      component: "Market Cap",
      align: "text-end",
    },
    {
      field: TableHeaderField.CHART,
      component: "7D Chart",
      align: "text-end",
    },
  ];

  const dataRows: TableRows[][] = useMemo(() => {
    return coinData?.map((coinData, id) => {
      return [
        {
          field: TableHeaderField.CHECKBOX,
          component: (
            <Checkbox
              key={"checkbox" + id}
              label={""}
              checked={selectedCoinId.includes(coinData.symbol)}
              onChange={() => {
                setSelectedCoinId((prev) => {
                  if (prev.includes(coinData.symbol)) {
                    return prev.filter((id) => id != coinData.symbol);
                  } else {
                    const newSelection = [...prev, coinData.symbol];
                    return newSelection;
                  }
                });
              }}
            />
          ),
          className: "p-5",
        },
        {
          field: TableHeaderField.CRYPTO_INFO,
          component: (
            <div key={"cryptoInfo" + coinData.name} className="flex gap-8">
              <Image
                src={coinData.icon}
                alt={coinData.name + "logo"}
                className="w-10 h-10 mt-1 rounded-full"
                width={32}
                height={32}
              />
              <div>
                <p className="truncate w-48">{coinData.name}</p>
                <p>{coinData.symbol}</p>
              </div>
            </div>
          ),
          searchText: coinData.name.concat(",", coinData.symbol),
        },
        {
          field: TableHeaderField.CRYPTO_PRICE,
          component: (
            <div
              key={"cryptoPrice" + coinData.name}
              className="flex justify-end text-end"
            >
              <div>
                {/* <p>{formatter.format(coinData.quote.USD.price)}</p> */}
                <p>
                  {coinData?.priceUSD < 0.0001 ? (
                    <KatexNumber price={coinData?.priceUSD} />
                  ) : (
                    (coinData?.priceUSD || 0).toFixed(4)
                  )}
                </p>

                <span>
                  <ProfitLoss percentage={coinData?.percentChange || 0} />
                </span>
              </div>
            </div>
          ),
        },
        {
          field: TableHeaderField.MARKET_CAP,
          component: (
            <p key={"marketCap" + coinData.name} className="text-end">
              {formatMarketCap(coinData?.marketCap || 0)}
            </p>
          ),
        },
        {
          field: TableHeaderField.CHART,
          component: (
            <div
              key={"chart" + coinData.name}
              className="chart-container w-full"
            >
              <LineChart
                isGreen={(coinData?.percentChange || 0) > 0}
                uniqueId={coinData.name}
                data={coinData.sparkline_price_in_7d}
              />
            </div>
          ),
        },
      ];
    });
  }, [coinData, selectedCoinId]);

  const [itemsContent, setItemContent] = useState<Item[]>([]);

  useEffect(() => {
    const setAsyncItems = async () => {
      const fac = new FastAverageColor();
      const result = await Promise.all(
        selectedCoinId.map(async (coinId, id) => {
          const data = coinData.find((data) => data.symbol === coinId);
          let color = "initial";
          try {
            color = (await fac.getColorAsync(data.icon))?.hex;
          } catch (e) {}
          const adjust = 100 % selectedCoinId.length;

          return {
            id: data?.["_id"],
            name: (
              <li
                key={coinId}
                className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-white text-gray-900 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg cursor-pointer"
              >
                <div className="group flex justify-between w-full hover:text-indigo-600">
                  <div className="flex gap-8">
                    <Image
                      src={data.icon}
                      alt={data?.name + " logo"}
                      className="w-10 h-10 rounded-full self-center mt-1"
                      width={32}
                      height={32}
                    />
                    <div>
                      <p className="text-lg pt-1">{data?.symbol}</p>
                      <p className="text-md pt-1">{data?.name}</p>
                    </div>
                  </div>
                </div>
              </li>
            ),
            percentage:
              (id === 1 ? adjust : 0) + (100 - adjust) / selectedCoinId.length,
            color: color ?? "",
          } as Item;
        })
      );
      setItemContent(result);
    };

    setAsyncItems();
  }, [coinData, selectedCoinId]);

  const handleChange = (id: number | string, value: number) => {
    setItemContent((data) => {
      const updatedData = data.map((item) =>
        item.id === id ? { ...item, percentage: value } : item
      );
      return updatedData;
    });
  };

  const stepper: StepperInterface[] = [
    {
      id: 1,
      content: <p>Details</p>,
    },
    {
      id: 2,
      content: <p>Fees</p>,
    },
    {
      id: 3,
      content: <p>Allocation </p>,
    },
  ];

  const createNewToken = async () => {
    try {
      // Prepare the initStrategy data
      const initStrategy = selectedCoinId.map((coinId) => {
        const coinInfo = coinData.find((data) => data.symbol === coinId);
        return {
          contractAddress: coinInfo.platforms.base,
          proportion: 5,
        };
      });

      // Define name and symbol for your new token
      const tokenName = "Your Token Name";
      const tokenSymbol = "YTN";

      // Call the createToken function
      const result = await contract.call("createToken", [
        tokenName,
        tokenSymbol,
        initStrategy,
      ]);

      console.log("Token created successfully:", result);
    } catch (error) {
      console.error("Error creating token:", error);
    }
  };

  const stepperContent = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <form action="">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
              <div className="relative mb-6">
                <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
                  {" "}
                  Name{" "}
                  <svg
                    width="7"
                    height="7"
                    className="ml-1"
                    viewBox="0 0 7 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </label>
                <input
                  type="text"
                  id="default-search"
                  className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
                  placeholder="Enter Name Here"
                />
              </div>
              <div className="relative mb-6">
                <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
                  {" "}
                  Symbol
                  <svg
                    width="7"
                    height="7"
                    className="ml-1"
                    viewBox="0 0 7 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                      fill="#EF4444"
                    />
                  </svg>
                </label>
                <input
                  type="text"
                  id="default-search"
                  className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
                  placeholder="Enter Symbol"
                />
              </div>
            </div>

            <div className="relative mb-6">
              <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                {" "}
                Contract Description{" "}
                <svg
                  width="7"
                  height="7"
                  className="ml-1"
                  viewBox="0 0 7 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                    fill="#EF4444"
                  ></path>
                </svg>
              </label>
              <div className="flex">
                <div className="relative w-full">
                  <textarea
                    className="block w-full h-40 px-4 py-2.5 text-base leading-7 font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-2xl placeholder-gray-400 focus:outline-none resize-none"
                    placeholder="Give a Description"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        );

      case 2:
        return (
          <p>
            <div>
              <form action="">
                {FEES.map((data) => {
                  return (
                    <div key={data.id} className="relative mb-6">
                      <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
                        {data.heading}(%){" "}
                        <svg
                          width="7"
                          height="7"
                          className="ml-1"
                          viewBox="0 0 7 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                            fill="#EF4444"
                          />
                        </svg>
                        <span className="ml-2">
                          <Tooltip content={data.content} position="bottom">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                              ></circle>
                              <line
                                x1="12"
                                y1="16"
                                x2="12"
                                y2="12"
                                stroke="currentColor"
                              ></line>
                              <line
                                x1="12"
                                y1="8"
                                x2="12.01"
                                y2="8"
                                stroke="currentColor"
                              ></line>
                            </svg>
                          </Tooltip>
                        </span>
                      </label>
                      <input
                        defaultValue={0}
                        type="number"
                        id={data.content}
                        className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
                        placeholder={data.content}
                      />
                    </div>
                  );
                })}
              </form>
            </div>
          </p>
        );

      case 3:
        return (
          <div className="ml-4">
            <PercentageDistributor
              items={itemsContent}
              handleChange={handleChange}
            />
          </div>
        );

      default:
        return <></>;
    }
  }, [itemsContent, step]);
  return (
    <div>
      <div className="max-w[80vw] p-8 min-w[50vw] h-full grid gap-4">
        <div
          className={`fixed w-full h-full ${
            isCreatingContract ? "z-1000" : ""
          }`}
        >
          {selectedCoinId.map((coinId) => {
            const data = coinData.find((data) => data.symbol === coinId);

            return (
              <BubbleDrag
                key={coinId}
                isLoading={isCreatingContract}
                data={
                  <Image
                    src={data?.icon || ""}
                    alt={data?.name + "logo"}
                    className="w-14 h-14 pointer-events-none rounded-full"
                    width={64}
                    height={64}
                  />
                }
                color={data.icon}
                size={
                  Math.max((5 * 5) / Math.min(selectedCoinId.length, 10), 5) *
                  (isCreatingContract ? 2 : 1)
                }
              />
            );
          })}
        </div>
        <Modal
          heading="BUILD YOUR OWN BAG - ALLOCATION"
          primaryButton={
            <button
              onClick={async () => {
                if (step === 3) {
                  setIsCreatingContract(true);
                  await createNewToken();
                  setIsCreatingContract(false);
                } else setStep((prev) => prev + 1);
              }}
              className={`w-52 h-12  bg-indigo-600 hover:bg-indigo-800
               transition-all duration-300 rounded-full shadow-xs text-white text-base font-semibold leading-6`}
            >
              {step === 3 ? "Create" : "Next"}
            </button>
          }
          secondaryButton={
            <button
              onClick={() => {
                if (step === 1) {
                  setIsCreatingContract(false);
                  setOpenModal(false);
                } else setStep((prev) => prev - 1);
              }}
              className={`w-52 h-12 border ${
                step === 1
                  ? "hidden "
                  : "border-indigo-600 bg-transparent text-indigo-600 hover:bg-indigo-100 "
              } transition-all duration-300 rounded-full shadow-xs text-base font-semibold leading-6`}
            >
              {step === 1 ? "Close" : "Prev"}
            </button>
          }
          openModal={openModal}
          setOpenModal={setOpenModal}
          onClickPrimaryButton={() => {}}
          onClickSecondaryButton={() => {
            setIsCreatingContract(false);
            setOpenModal(false);
          }}
          modalContent={
            <div className=" h-[50vh] justify-center relative flex gap-10  ">
              <div className="w-1/5 border-r-2 border-grey-700">
                <Stepper selectedId={step} list={stepper} />
              </div>
              <div className="w-4/5 align-left overflow-auto thin-scrollbar p-4 ">
                {stepperContent}
              </div>
            </div>
          }
        >
          <div className=" flex justify-between">
            <div className="content-center">
              {" "}
              <p className="font-silkscreen text-center text-2xl -z-10 font-medium">
                BUILD your own bag (BYOB)
              </p>
            </div>
            <div>
              <button
                onClick={(e) => {
                  if (selectedCoinId.length === 0) {
                    return;
                  }
                  setOpenModal(true);
                }}
                disabled={selectedCoinId.length === 0}
                className={`modal-button relative items-center justify-start px-6 py-3 overflow-hidden font-semibold transition-all duration-300 rounded-xl group
    ${
      selectedCoinId.length === 0
        ? " bg-indigo-300 text-white  text-center shadow-xs cursor-not-allowed"
        : "bg-indigo-500 text-base  group-hover:text-white"
    }
  `}
              >
                <span className="relative w-auto text-base font-semibold text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">
                  Confirm
                  <AnimatedNumber value={selectedCoinId.length} />
                </span>
              </button>
            </div>
          </div>
        </Modal>
        <Datatable
          headers={tableHeaders}
          rows={coinData.length === 0 ? dataRowsShimmer : dataRows}
          columnSizes={CREATE_FORM_TABLE_COLUMN_SIZE}
          customStyles={{ width: "800px" }}
          isLoading={coinData.length === 0}
        />
      </div>
    </div>
  );
};
