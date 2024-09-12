"use client"

import profileIcon from "@/public/pfp.png";
import positiveArrow from "@/public/Up_green_arrow.png";
import negativeArrow from "@/public/Down_red_arrow.png";
import { IoCaretForward, IoStarOutline, IoStar } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Datatable } from "@/shared/DataTable";
import React, { useState } from "react";
import { TableHeaderField, TableHeaders, TableRows } from "@/shared/DataTable/typings";
import { STRATEGY_LIST_COLUMN_SIZES } from "@/constants/tableSizes";
import Image from "next/image";
import Header from "@/components/Header";
import { Modal } from "@/shared/Modal";
import { BubbleDrag } from "@/shared/BubbleDrag";

export default function Strategy() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [compositionData, setCompositionData] = useState([]);
  const tableHeaders: TableHeaders[] = [
    {
      field: TableHeaderField.FAVOURITE,
      component: "",
      align: "text-start",
    },
    {
      field: TableHeaderField.CREATOR,
      component: "Creator",
      align: "text-start",
      isSearch: true,
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
      field: TableHeaderField.CHANGE,
      component: "Chng.",
      align: "text-end",
    },
    {
      field: TableHeaderField.CARET,
      component: "",
      align: "text-end",
    },
  ];
  const dataRows: TableRows[][] = [...Array(10)].map((coinData, key) => {
    const random = Math.random() * 100;
    return [
      {
        field: TableHeaderField.FAVOURITE,
        component:(
          <div>
            <IoStar color="yellow" />
          </div>
        ),
        className: "p-2"
      },
      {
        field: TableHeaderField.CREATOR,
        component: (
          <div className="flex gap-2 items-center">
            <Image
              src={"https://pagedone.io/asset/uploads/1704275541.png"}
              alt={"profile icon"}
              className="w-10 h-10 mt-1"
              width={64}
              height={64}
            />
            <div>
              <div>
              John Doe-{key}
              </div>
              <div className="text-gray-500 text-xs">
                0xrwh738dh73dhded....
              </div>
            </div>
          </div>
        ),
        searchText: "",
        className: "p-2"
      },
      {
        field: TableHeaderField.COMPOSITION,
        component: (
          <div className="flex items-center cursor-pointer" onClick={()=>{
            const composition = [{coinImage:"https://s2.coinmarketcap.com/static/img/coins/32x32/1.png", composition: 25 },
              {coinImage:"https://s2.coinmarketcap.com/static/img/coins/32x32/1027.png", composition: 35},
            {coinImage:"https://s2.coinmarketcap.com/static/img/coins/32x32/3408.png", composition: 40}
            ]
            setModalOpen(true);
            setCompositionData(composition);
          }}>
            <div className="flex -space-x-2">
              <img style={{border: "1px solid blue"}} className="animate-fade-in-right-20 w-6 h-6 border-2 border-white rounded-full" src="https://s2.coinmarketcap.com/static/img/coins/32x32/1.png" alt="Stacked rounded avatar" />
              <img style={{border: "1px solid blue"}} className="animate-fade-in-right-30 w-6 h-6 border-2 border-white rounded-full" src="https://s2.coinmarketcap.com/static/img/coins/32x32/1027.png" alt="Stacked rounded avatar" />
              <img style={{border: "1px solid blue"}} className="animate-fade-in-right-40 w-6 h-6 border-2 border-white rounded-full" src="https://s2.coinmarketcap.com/static/img/coins/32x32/3408.png" alt="Stacked rounded avatar" />
              <div className="text-[0.625rem] animate-fade-in-right-50 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-between">&nbsp;+10&nbsp;&nbsp;</div>
            </div>
          </div>
        ),
        className: "p-2"
      },
      {
        field: TableHeaderField.AUM,
        component: (
          <div className="flex justify-end text-end">
            $1.5m
          </div>
        ),
        className: "p-2"
      },
      {
        field: TableHeaderField.CHANGE,
        component: (
          <div className="flex gap-2">
            <div className="w-4"><Image height={20} width={20} alt="icon" src={random > 50 ? positiveArrow.src : negativeArrow.src} /></div>
            <div className={`text-${random > 50 ? "green" : "red"}-500`}>{random > 50 ? random.toFixed(2) : (-random).toFixed(2)}%</div>
          </div>
        ),
        className: "p-2"
      },
      {
        field: TableHeaderField.CARET,
        component: (
          <div className="cursor-pointer text-end flex justify-end">
            <IoCaretForward onClick={() => router.push("/leaderboard/" + key)} />
          </div>
        ),
        className: "p-2"
      }
    ];
  });
  return <main className="flex min-h-screen flex-col items-center justify-between px-24 py-8">
    <Header goBack={() => router.push("/")} />
    <div>
      <Datatable
        headers={tableHeaders}
        rows={dataRows}
        columnSizes={STRATEGY_LIST_COLUMN_SIZES}
        customStyles={{ width: "600px" }}
      />
    </div>
    <Modal openModal={modalOpen} setOpenModal={setModalOpen} modalContent={<div>
      {compositionData.map((item, key)=>{
        return <BubbleDrag data={<div></div>} />
      })}
    </div>} />
  </main>
}