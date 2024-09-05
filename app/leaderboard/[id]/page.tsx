"use client"

import { IoThumbsUpOutline, IoThumbsUpSharp, IoThumbsDownOutline, IoThumbsDownSharp } from "react-icons/io5";
import { useRouter, useParams } from "next/navigation";
import { Datatable } from "@/shared/DataTable";
import React from "react";
import { TableHeaderField, TableHeaders, TableRows } from "@/shared/DataTable/typings";
import Image from "next/image";
import { ResponsiveLine, Line, Serie } from "@nivo/line";
import { linearGradientDef } from "@nivo/core";
import usdcIcon from "@/public/usdc.png";
import { colorsList } from "@/constants/colors";
import Header from "@/components/Header";

const data = [
    {
        id: 'japan',
        color: 'hsl(154, 70%, 80%)',
        data: [
            { x: '1 Feb', y: 200 },
            { x: '2 Feb', y: 100 },
            { x: '3 Feb', y: 300 },
            { x: '4 Feb', y: 400 },
            { x: '5 Feb', y: 500 },
            { x: '6 Feb', y: 300 },
            { x: '7 Feb', y: 700 },
            { x: '8 Feb', y: 600 },
            { x: '9 Feb', y: 900 },
            { x: '10 Feb', y: 500 },
            { x: '11 Feb', y: 1100 },
            { x: '12 Feb', y: 1200 },
        ],
    },
];


const StrategyDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    const DATA_COUNT = 12;
    const labels = [];
    for (let i = 0; i < DATA_COUNT; ++i) {
        labels.push(i.toString());
    }

    const portfolioHeaders: TableHeaders[] = [
        {
            field: TableHeaderField.CRYPTO_INFO,
            component: "Coin",
            align: "text-start",
            isSearch: true,
        },
        {
            field: TableHeaderField.COMPOSITION,
            component: "Composition",
            align: "text-start",
            isSearch: false
        }
    ]

    const portfolioRows: TableRows[][] = [25, 15, 15, 10, 10, 10, 5, 5, 5, 3, 2].map((val, key) => {
        return [
            {
                field: TableHeaderField.CRYPTO_INFO,
                component: (
                    <div className="flex gap-8 items-center">
                        <div>
                            Bitcoin
                        </div>
                    </div>
                ),
                searchText: ""
            },
            {
                field: TableHeaderField.COMPOSITION,
                component: (
                    <div>
                        <div className="h-2" style={{ backgroundColor: colorsList[key % 20], width: `${val / 25 * 100}%` }}>{val}%</div>
                    </div>
                )
            }
        ]
    })

    return <main className="flex min-h-screen flex-col items-center gap-8 px-24 py-8">
        <Header goBack={() => router.push("/leaderboard")} />
        <div className="flex gap-8 m-1">

            <div style={{ height: "50vh", width: "65vw", backgroundColor: "white" }} className="bg-white-500">
                <div style={{ height: "50vh", width: "65vw", backgroundColor: "white" }} className="bg-white-500">
                    <ResponsiveLine
                        data={data}
                        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                        xScale={{ type: 'point' }}
                        curve="natural"
                        enableArea={true}
                        colors={{datum:"color"}}
                        enableGridX={false}
                        enableGridY={false}
                        yScale={{
                            type: 'linear',
                            min: 'auto',
                            max: 'auto',
                            stacked: true,
                            reverse: false,
                        }}
                        defs={[
                            linearGradientDef('gradientA', [
                                { offset: 0, color: 'hsl(154, 70%, 80%)' },
                                { offset: 100, color: 'hsl(154, 70%, 80%)', opacity: 0 },
                            ]),
                        ]}
                        fill={[{ match: '*', id: 'gradientA' }]}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Date',
                            legendOffset: 36,
                            legendPosition: 'middle',
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Performance',
                            legendOffset: -40,
                            legendPosition: 'middle',
                        }}
                        pointSize={10}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabelYOffset={-12}
                        useMesh={true}
                    />
                </div>
                <div className="flex justify-between  mt-4">
                    <div className="flex gap-4 items-center">
                        <div className="relative">
                            <input type="text" className="block bg-white-300 w-full max-w-xs pr-20 pl-9 py-2 text-sm font-normal shadow-xs text-gray-900 border border-gray-300 rounded-full placeholder-gray-300 focus:outline-none leading-relaxed" placeholder="Enter Amount" />
                            <div className="flex gap-2 items-center absolute right-4 bottom-2">USDC<Image width={20} height={20} src={usdcIcon.src} alt="" /></div>
                        </div>
                        <button
                            className="relative group inline-flex items-center px-8 py-1.5 overflow-hidden text-lg font-medium text-customBlue border-2 border-customBlue rounded-full hover:text-white group hover:bg-gray-50">
                            <span
                                className="absolute left-0 block w-full h-0 transition-all bg-customBlue opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                            <span
                                className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </span>
                            <span className="relative text-base font-semibold transition-all duration-300 group-hover:-translate-x-3">Invest</span>
                        </button>
                    </div>
                    <div className="flex gap-2 bg-white rounded-full border border-gray-300 cursor-pointer">
                        <div className="flex gap-2 items-center rounded-full hover:bg-gray-200 pl-2 pr-2">
                            <IoThumbsUpSharp />
                            230
                        </div>
                        <div className="flex gap-2 items-center rounded-full hover:bg-gray-200 pl-2 pr-2">
                            <IoThumbsDownOutline />
                            12
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ width: "25vw" }}>
                <Datatable headers={portfolioHeaders} rows={portfolioRows} customStyles={{ width: "25vw !important" }} hidePagination />
            </div>
        </div>

    </main>
}

export default StrategyDetails;