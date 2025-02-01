"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ApexChart = () => {
  const [series, setSeries] = useState<number[]>([44, 55, 13, 33]);
  const [options] = useState<ApexOptions>({
    chart: {
      width: 380,
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: "right",
      offsetY: 0,
      height: 230,
    },
  });

  const appendData = () => {
    setSeries([...series, Math.floor(Math.random() * 100) + 1]);
  };

  const removeData = () => {
    if (series.length === 1) return;
    setSeries(series.slice(0, -1));
  };

  const randomize = () => {
    setSeries(series.map(() => Math.floor(Math.random() * 100) + 1));
  };

  const reset = () => {
    setSeries([44, 55, 13, 33]);
  };

  return (
    <div>
      <div className="chart-wrap ">
        <div id="chart">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
