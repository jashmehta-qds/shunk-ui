"use client"; // Ensure this is a Client Component

import { coinListMetaData } from "@/constants/coinListMetadata";
import { CREATE_FORM_TABLE_COLUMN_SIZE } from "@/constants/tableSizes";
import { useHandleSearch } from "@/hooks/useHandleSearch";
import AnimatedNumber from "@/shared/AnimatedNumber";
import { BubbleDrag } from "@/shared/BubbleDrag";
import { Datatable } from "@/shared/DataTable";
import {
  TableHeaderField,
  TableHeaders,
  TableRows,
} from "@/shared/DataTable/typings";
import { Modal } from "@/shared/Modal";
import Image from "next/image";
import { useEffect, useState } from "react";
import { coinListApiResponse, CoinListData } from "../../constants/coinList";
import { Item, PercentageDistributor } from "../PercentageDistributor";
import Checkbox from "../primitives/Checkbox";
import ProfitLoss from "../shared/ProfitLoss";
import { OneInchInterface } from "@/app/api/oneinch/route";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 4,
});

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

export const CreateForm = () => {
  const [input, setInput] = useState<string>("");
  const [selectedCoinId, setSelectedCoinId] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [oneInchData, setOneInchData] = useState<OneInchInterface[]>([]);
  const { filteredData } = useHandleSearch<CoinListData>(
    coinListApiResponse.data,
    ["name", "symbol"],
    input
  );
  const [isCreatingContract, setIsCreatingContract] = useState<boolean>(false);

  useEffect(() => {
    const get1inchData = async () => {
      const response = await fetch("/api/oneinch");
      const responseData = await response.json();
      const data: OneInchInterface[] = [];

      for (const prop in responseData) {
        data.push(responseData[prop]);
      }

      // const response = await fetch("https://api.coingecko.com/api/v3/simple/token_price/id");
      // const responseData = await response.json();
      //   curl --request GET \
      //  --url https://api.coingecko.com/api/v3/simple/token_price/id \
      //  --header 'accept: application/json'
      setOneInchData(data);
    };

    get1inchData();
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
  ];
  const dataRows: TableRows[][] = oneInchData?.map((coinData, id) => {
    return [
      {
        field: TableHeaderField.CHECKBOX,
        component: (
          <Checkbox
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
          <div className="flex gap-8">
            <Image
              src={coinData.logoURI}
              alt={coinData.name + "logo"}
              className="w-10 h-10 mt-1"
              width={64}
              height={64}
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
          <div className="flex justify-end text-end">
            <div>
              {/* <p>{formatter.format(coinData.quote.USD.price)}</p> */}
              <p>{0}</p>

              <span>
                <ProfitLoss percentage={0} />
              </span>
            </div>
          </div>
        ),
      },
      {
        field: TableHeaderField.MARKET_CAP,
        component: (
          <p className="text-end">
            {/* {formatMarketCap(coinData.quote.USD.market_cap)} */}
          </p>
        ),
      },
    ];
  });
  return (
    <div>
      <div className="max-w[80vw] p-8 min-w[50vw] grid gap-4">
        <div className="relative w-full h-full">
          {selectedCoinId.map((coinId) => {
            const coinData = oneInchData.find((data) => data.symbol === coinId);
            return (
              <BubbleDrag
                key={coinId}
                isLoading={isCreatingContract}
                data={
                  <Image
                    src={coinData?.logoURI || ""}
                    alt={coinData?.name + "logo"}
                    className="w-14 h-14 pointer-events-none"
                    width={64}
                    height={64}
                  />
                }
                size={
                  Math.max((5 * 5) / Math.min(selectedCoinId.length, 10), 5) *
                  (isCreatingContract ? 2 : 1)
                }
              />
            );
          })}
        </div>
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          onClickPrimaryButton={() => {
            setIsCreatingContract(true);
          }}
          onClickSecondaryButton={() => {
            setIsCreatingContract(false);
            setOpenModal(false);
          }}
          modalContent={
            <div className="relative flex gap-10">
              {/* <ul className="w-2/4 flex flex-col border-r-2	border-indigo-500/100 h-full">
                {selectedCoinId.map((coinId) => {
                  const coinData = coinListApiResponse.data.find(
                    (data) => data.id === coinId
                  );
                  return (
                    <li
                      key={coinId}
                      className=" inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-white border-b-2	 border-gray-300 text-gray-900 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg cursor-pointer"
                    >
                      <div className="group flex justify-between w-full hover:text-indigo-600">
                        <div className="flex gap-8">
                          <Image
                            src={
                              coinListMetaData.data?.[coinData?.id + ""]
                                ?.logo || ""
                            }
                            alt={coinData?.name + "logo"}
                            className="w-10 h-10"
                            width={10}
                            height={10}
                          />
                          <div>
                            <p>{coinData?.name}</p>
                            <p>{coinData?.symbol}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul> */}
              <PercentageDistributor
                items={selectedCoinId.map((coinId) => {
                  const coinData = oneInchData.find(
                    (data) => data.symbol === coinId
                  );
                  return {
                    id: coinData?.symbol || coinId,
                    name: (
                      <li
                        key={coinId}
                        className=" inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-white border-b-2	 border-gray-300 text-gray-900 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg cursor-pointer"
                      >
                        <div className="group flex justify-between w-full hover:text-indigo-600">
                          <div className="flex gap-8">
                            <Image
                              src={coinData?.logoURI || ""}
                              alt={coinData?.name + "logo"}
                              className="w-10 h-10"
                              width={10}
                              height={10}
                            />
                            <div>
                              <p>{coinData?.name}</p>
                              <p>{coinData?.symbol}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ),
                    percentage: 100 / selectedCoinId.length,
                  } as Item;
                })}
                onValidSubmit={() => { }}
              ></PercentageDistributor>
            </div>
          }
        >
          <div className=" flex justify-between">
            <div className="content-center">
              {" "}
              <p className=" text-center text-2xl -z-10 font-medium">
                BUIDL your own bag (BYOB)
              </p>
            </div>
            <div>
              <button
                onClick={(e) => {
                  setOpenModal(true);
                }}
                className="modal-button relative items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-xl group"
              >
                <span className="relative w-auto text-base font-semibold text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                  Confirm
                  <AnimatedNumber value={selectedCoinId.length} />
                </span>
              </button>
            </div>
          </div>
        </Modal>
        <Datatable
          headers={tableHeaders}
          rows={dataRows}
          columnSizes={CREATE_FORM_TABLE_COLUMN_SIZE}
          customStyles={{ width: "600px" }}
        />
      </div>
    </div>
  );
};
