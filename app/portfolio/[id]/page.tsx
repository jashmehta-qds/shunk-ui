"use client";

import { PortfolioList } from "@/components/PortfolioList";
import { PortfolioTableData } from "@/components/PortfolioList/typings";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const portfolioCardData = [
    {
      id: "tpv",
      title: "Total Portfolio Value",
      value: "5555.55",
      currency: "USD",
    },
    {
      id: "iv",
      title: "Invested Value",
      value: "3000.55",
      currency: "USD",
    },
    {
      id: "cv",
      title: "Current Value",
      value: "5000.55",
      currency: "USD",
    },
    {
      id: "returns",
      title: "Returns",
      value: "21.55",
      currency: "USD",
    },
  ];

  const [portfolioListData, setPortfolioListData] = useState<
    PortfolioTableData[]
  >([]);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  useEffect(() => {
    const getCoinList = async () => {
      const endPoint = params.id === "bag" ? "creators" : "investors";
      const response = await axios.get<PortfolioTableData[]>(
        `https://api.shunk.io/portfolio/${endPoint}`,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );

      setPortfolioListData(response?.data);
    };

    getCoinList();
  }, [params]);

  // Mock data for the percentage-filled bar chart
  // value should be prev+ next.
  //also in reverse order
  const portfolioSegments = [
    { id: 4, label: "Cash", value: 100, color: "bg-yellow-500" },
    { id: 3, label: "Bonds", value: 90, color: "bg-green-500" },
    { id: 2, label: "Crypto", value: 70, color: "bg-purple-500" },
    { id: 1, label: "Stocks", value: 40, color: "bg-blue-500" },
    //prev+next
  ];

  return (
    <main className="rounded-xl mt-8 min-h-screen flex flex-col items-center p-8 m-auto bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-full max-w-6xl">
        {/* Portfolio Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
          {portfolioCardData.map((data) => (
            <motion.div
              key={data.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <h2 className="font-bold text-xl text-gray-800">
                  {data.title}
                </h2>
                <h3 className="flex items-center gap-2">
                  <p className="font-semibold text-gray-700">
                    {data.value}{" "}
                    <span className="italic text-gray-500">
                      {data.currency}
                    </span>
                  </p>
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Percentage-Filled Bar Chart */}
        <motion.div
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-bold text-xl text-gray-800 mb-4">
            Portfolio Allocation
          </h2>
          <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden relative">
            {portfolioSegments.map((segment, index) => (
              <motion.div
                key={segment.id}
                className={`absolute z-[${
                  portfolioSegments.length - index
                }]  h-full ${segment.color}`}
                style={{ width: `${segment.value}%` }}
                onHoverStart={() => setHoveredSegment(index)}
                onHoverEnd={() => setHoveredSegment(null)}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {hoveredSegment === index && (
                  <motion.div
                    className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {`${segment.label}: ${segment.value}%`}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Portfolio List */}
        <motion.div
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PortfolioList portfolioListData={portfolioListData} />
        </motion.div>
      </div>
    </main>
  );
}
