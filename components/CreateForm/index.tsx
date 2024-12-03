"use client"; // Ensure this is a Client Component
import { CoinList } from "./CoinList";
import { useEffect, useState } from "react";
import { CoinData } from "@/app/api/coinData/route";
import axios from "axios";

export const CreateForm = () => {
  const [coinData, setCoinData] = useState<CoinData[]>([]);
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
  return <CoinList coinData={coinData} />;
};
