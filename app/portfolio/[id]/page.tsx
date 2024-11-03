"use client";

import { CoinList } from "@/components/CreateForm/CoinList";
import { PortfolioList } from "@/components/PortfolioList";
import { PortfolioTableData } from "@/components/PortfolioList/typings";
import AnimatedCard, { ModalState } from "@/shared/AnimatedCard";
import ApexChart from "@/shared/ApexCharts";
import axios from "axios";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    uniqueId: "",
    modalContent: null,
  });
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
  const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };
  const [portfolioListData, setPortfolioListData] = useState<
    PortfolioTableData[]
  >([]);
  useEffect(() => {
    const getCoinList = async () => {
      const endPoint = params.id === "bag" ? "creators" : "investors";
      const response = await axios.get<PortfolioTableData[]>(
        `http://app.shunk.io/portfolio/${endPoint}`,
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
  return (
    <main className="flex flex-col items-center m-auto">
      <div className="w-full overflow-auto height-[90%] mt-8">
        <div className="w-full relative flex gap-4 justify-between items-center justify-center h-auto">
          <motion.div
            className="group bg-white shadow-lg shadow-gray-200 rounded-xl p-2.5  w-1/2 hover:shadow-gray-300"
            layoutId="portfolioValue"
            onClick={() =>
              setModalState({
                isOpen: true,
                uniqueId: "portfolioValue",
                modalContent: (
                  <div className="w-flex flex-col items-center justify-center py-6 px-4 gap-4 text-center">
                    {portfolioCardData.map((data) => {
                      return (
                        <div
                          key={data.id}
                          className="flex gap-24 items-center justify-between w-full mb-2"
                        >
                          <motion.h2 className="font-manrope font-bold text-2xl text-gray-900 ">
                            {data.title}
                          </motion.h2>
                          <motion.h3 className="flex items-center justify-end gap-3">
                            <p className="text-lg font-medium text-gray-800">
                              {data.value} <span>{data.currency}</span>{" "}
                            </p>
                          </motion.h3>
                        </div>
                      );
                    })}
                  </div>
                ),
              })
            }
          >
            <div className="flex flex-col items-center justify-center py-6 px-4 gap-4 text-center">
              {portfolioCardData.map((data) => {
                return (
                  <div
                    key={data.id}
                    className="flex  items-center justify-between w-full mb-2"
                  >
                    <h2 className="font-manrope font-bold text-2xl text-gray-900 ">
                      {data.title}
                    </h2>
                    <h3 className="flex items-center justify-end gap-3">
                      <p className="text-lg font-medium text-gray-800">
                        {data.value} <span>{data.currency}</span>{" "}
                      </p>
                    </h3>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            layoutId="barchart"
            className="group2 bg-white shadow-lg shadow-gray-200 rounded-xl p-2.5  w-1/2 hover:shadow-gray-300"
            onClick={() =>
              setModalState({
                isOpen: true,
                uniqueId: "barchart",
                modalContent: (
                  <div className=" w-flex flex-col items-center justify-center py-6 px-4 gap-4 text-center">
                    <ApexChart />
                    <motion.ul
                      variants={{
                        open: {
                          clipPath: "inset(0% 0% 0% 0% round 10px)",
                          transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.3,
                            staggerChildren: 0.05,
                          },
                        },
                        closed: {
                          clipPath: "inset(10% 50% 90% 50% round 10px)",
                          transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.3,
                          },
                        },
                      }}
                      style={{ pointerEvents: "auto" }}
                    >
                      <motion.li variants={itemVariants}>Item 1 </motion.li>
                      <motion.li variants={itemVariants}>Item 2 </motion.li>
                      <motion.li variants={itemVariants}>Item 3 </motion.li>
                      <motion.li variants={itemVariants}>Item 4 </motion.li>
                      <motion.li variants={itemVariants}>Item 5 </motion.li>
                    </motion.ul>
                  </div>
                ),
              })
            }
          >
            <div className="flex flex-col items-center justify-center py-6 px-4 gap-4 text-center">
              <ApexChart />
            </div>
          </motion.div>
        </div>
        <PortfolioList portfolioListData={portfolioListData} />
      </div>
      <AnimatedCard modalState={modalState} setModalState={setModalState} />
    </main>
  );
}
