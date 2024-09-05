"use client"

import profileIcon from "@/public/pfp.png";
import positiveArrow from "@/public/Up_green_arrow.png";
import negativeArrow from "@/public/Down_red_arrow.png";
import { IoCaretForward } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Datatable } from "@/shared/DataTable";
import React from "react";
import { TableHeaderField, TableHeaders, TableRows } from "@/shared/DataTable/typings";
import { STRATEGY_LIST_COLUMN_SIZES } from "@/constants/tableSizes";
import Image from "next/image";
import Header from "@/components/Header";

export default function Strategy() {
  const router = useRouter();
  const tableHeaders: TableHeaders[] = [
    {
      field: TableHeaderField.CREATOR,
      component: "Creator",
      align: "text-start",
      isSearch: true,
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
        field: TableHeaderField.CREATOR,
        component: (
          <div className="flex gap-8 items-center">
            <Image
              src={profileIcon.src}
              alt={"profile icon"}
              className="w-10 h-10 mt-1"
              width={64}
              height={64}
            />
            <div>
              John Doe-{key}
            </div>
          </div>
        ),
        searchText: ""
      },
      {
        field: TableHeaderField.AUM,
        component: (
          <div className="flex justify-end text-end">
            $1.5m
          </div>
        ),
      },
      {
        field: TableHeaderField.CHANGE,
        component: (
          <div className="flex gap-2">
            <div><Image height={20} width={20} alt="icon" src={random > 50 ? positiveArrow.src : negativeArrow.src} /></div>
            <div className={`text-${random > 50 ? "green" : "red"}-500`}>{random > 50 ? random.toFixed(2) : (-random).toFixed(2)}%</div>
          </div>
        ),
      },
      {
        field: TableHeaderField.CARET,
        component: (
          <div className="cursor-pointer text-end flex justify-end">
            <IoCaretForward onClick={() => router.push("/leaderboard/" + key)} />
          </div>
        )
      }
    ];
  });
  return <main className="flex min-h-screen flex-col items-center justify-between px-24 py-8">
    <Header goBack={()=>router.push("/")} />
    <div>
      <Datatable
        headers={tableHeaders}
        rows={dataRows}
        columnSizes={STRATEGY_LIST_COLUMN_SIZES}
        customStyles={{ width: "600px" }}
      />
    </div>
  </main>
}