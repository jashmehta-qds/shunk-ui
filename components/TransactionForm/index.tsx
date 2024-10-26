"use client";

import { CoinData } from "@/actionTypings/createForm";
import { Strategy } from "@/constants/leaderboard";
import Image from "next/image";
import { useState } from "react";

interface Props {
  isBuy: boolean;
  strategy: Strategy | null;
  coinList: CoinData[];
}

const TransactionForm: React.FC<Props> = ({ isBuy, strategy, coinList }) => {
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const totalPortfolioQuantity = 100;
  const strategyRate = 1.394;
  return (
    <div>
      <div className="w-[100] flex justify-center">
        1 LXMI = &nbsp;
        <span className="font-semibold">{strategyRate}&nbsp;</span> USDC
      </div>
      <div className="overflow-y-scroll max-h-[200px]">
        {strategy?.coins.map((item, key) => {
          const price = Math.random() * 1000;
          const coinFound = coinList.find((coin) => coin.symbol === item.name);
          const coinQuantity = Math.random() * 1000;
          const sellCoinQuantity =
            (Number(quantity.length ? quantity : "0") * coinQuantity) /
            totalPortfolioQuantity;
          const allocatedAmount = isBuy
            ? (Number(amount.length ? amount : "0") * 25) / 100
            : sellCoinQuantity * price;

          return (
            <div className="grid grid-cols-4 gap-4 mb-2" key={key}>
              <div className="col-span-2">
                <div className="flex gap-2 items-center">
                  <div>
                    <Image
                      width={25}
                      height={25}
                      className="rounded-full"
                      src={coinFound?.icon}
                      alt="coin-icon"
                    />
                  </div>
                  <div>
                    <div className="text-sm">{coinFound?.name}</div>
                    <div className="text-xs">
                      ${price.toFixed(2)}{" "}
                      {!isBuy ? (
                        <span>
                          &nbsp; ({coinQuantity.toFixed(4)}{" "}
                          {coinFound?.symbol?.toUpperCase()})
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm font-semibold">
                ${allocatedAmount.toFixed(2)}
              </div>
              <div className="text-sm">
                {isBuy
                  ? (allocatedAmount / price).toFixed(2)
                  : sellCoinQuantity.toFixed(4)}{" "}
                {coinFound?.symbol?.toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between w-[100%] items-center">
        <div className="relative w-[200px] mt-2">
          {isBuy ? (
            <div className=" absolute left-0 top-0 py-3 px-4">
              <svg
                width="10"
                height="16"
                viewBox="0 0 10 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.63636 15.4545V0.90909H5.56818V15.4545H4.63636ZM7.77273 5.27273C7.70455 4.69697 7.42803 4.25 6.94318 3.93182C6.45833 3.61364 5.86364 3.45455 5.15909 3.45455C4.64394 3.45455 4.19318 3.53788 3.80682 3.70455C3.42424 3.87121 3.125 4.10038 2.90909 4.39205C2.69697 4.68371 2.59091 5.01515 2.59091 5.38636C2.59091 5.69697 2.66477 5.96401 2.8125 6.1875C2.96402 6.4072 3.1572 6.59091 3.39205 6.73864C3.62689 6.88258 3.87311 7.00189 4.13068 7.09659C4.38826 7.1875 4.625 7.26136 4.84091 7.31818L6.02273 7.63636C6.32576 7.71591 6.66288 7.82576 7.03409 7.96591C7.40909 8.10606 7.76705 8.29735 8.10795 8.53977C8.45265 8.77841 8.73674 9.08523 8.96023 9.46023C9.18371 9.83523 9.29545 10.2955 9.29545 10.8409C9.29545 11.4697 9.13068 12.0379 8.80114 12.5455C8.47538 13.053 7.99811 13.4564 7.36932 13.7557C6.74432 14.0549 5.98485 14.2045 5.09091 14.2045C4.25758 14.2045 3.53598 14.0701 2.92614 13.8011C2.32008 13.5322 1.8428 13.1572 1.49432 12.6761C1.14962 12.1951 0.954545 11.6364 0.909091 11H2.36364C2.40152 11.4394 2.54924 11.803 2.80682 12.0909C3.06818 12.375 3.39773 12.5871 3.79545 12.7273C4.19697 12.8636 4.62879 12.9318 5.09091 12.9318C5.62879 12.9318 6.11174 12.8447 6.53977 12.6705C6.9678 12.4924 7.30682 12.2462 7.55682 11.9318C7.80682 11.6136 7.93182 11.2424 7.93182 10.8182C7.93182 10.4318 7.82386 10.1174 7.60795 9.875C7.39205 9.63258 7.10795 9.43561 6.75568 9.28409C6.40341 9.13258 6.02273 9 5.61364 8.88636L4.18182 8.47727C3.27273 8.21591 2.55303 7.8428 2.02273 7.35795C1.49242 6.87311 1.22727 6.23864 1.22727 5.45455C1.22727 4.80303 1.40341 4.23485 1.75568 3.75C2.11174 3.26136 2.58902 2.88258 3.1875 2.61364C3.78977 2.34091 4.46212 2.20455 5.20455 2.20455C5.95455 2.20455 6.62121 2.33901 7.20455 2.60795C7.78788 2.87311 8.25 3.23674 8.59091 3.69886C8.93561 4.16098 9.11742 4.68561 9.13636 5.27273H7.77273Z"
                  fill="#6B7280"
                ></path>
              </svg>
            </div>
          ) : null}
          <input
            type="number"
            value={isBuy ? amount : quantity}
            onChange={(e) => {
              if (isBuy) setAmount(e.target.value);
              else setQuantity(e.target.value);
            }}
            className="block w-full max-w-xs pr-16 pl-9 py-2 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-300 focus:outline-none leading-relaxed"
            placeholder="Enter"
          />
          <div
            id="countries"
            className="w-10 text-gray-900 text-sm rounded-lg block absolute top-0 right-5 h-10 pl-3 border-l  focus:outline-none flex items-center"
          >
            {isBuy ? "USD" : strategy.code}
          </div>
        </div>
        <div>
          You will receive:{" "}
          {isBuy
            ? Number(amount.length ? amount : "0") / strategyRate +
              " " +
              strategy.code
            : (Number(quantity.length ? quantity : "0") * strategyRate).toFixed(
                2
              ) + " USD"}
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
