import {
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from "chart.js";
import React, { useEffect, useRef } from "react";

// Register Chart.js components
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

export interface LineChartProps {
  uniqueId: number | string;
  data: number[];
  isGreen: boolean;
}

const LineChart: React.FC<LineChartProps> = ({ uniqueId, data, isGreen }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  const reduceArraySize = (data: number[]): number[] => {
    const reducedArray: number[] = [];

    for (let i = 0; i < data.length; i += 2) {
      const avg = (data[i] + (data[i + 1] || 0)) / 2;
      reducedArray.push(avg);
    }
    const reducedArray2: number[] = [];

    for (let i = 0; i < reducedArray.length; i += 2) {
      const avg = (reducedArray[i] + (reducedArray[i + 1] || 0)) / 2;
      reducedArray2.push(avg);
    }
    const reducedArray3: number[] = [];

    for (let i = 0; i < reducedArray2.length; i += 2) {
      const avg = (reducedArray2[i] + (reducedArray2[i + 1] || 0)) / 2;
      reducedArray3.push(avg);
    }

    // const ans = reduceArraySize(reducedArray, freq - 1);

    return reducedArray3;
  };

  const modifiedData = data;
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const chartcreate = new Chart(ctx, {
          type: "line",
          data: {
            labels: Array.from(
              { length: modifiedData.length },
              (_, i) => i + 1
            ), // Labels for x-axis (index-based)
            datasets: [
              {
                label: "Data Points",
                data: modifiedData,
                borderColor: isGreen ? "rgb(34 197 94)" : "rgb(239 68 68)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
                fill: true,
                tension: 0.3, // Smooth curve for the line
              },
            ],
          },
          options: {
            responsive: true,
            elements: {
              point: {
                radius: 0,
              },
            },
            scales: {
              x: {
                display: false, // Hide x-axis
                grid: {
                  display: false, // Hide x-axis grid lines
                },
              },
              y: {
                display: false, // Hide y-axis
                grid: {
                  display: false, // Hide y-axis grid lines
                },
              },
            },
            plugins: {
              legend: {
                display: false, // Hide legend
              },
            },
          },
        });
        return () => {
          chartcreate.destroy();
        };
      }
    }
  }, []);

  return <canvas key={uniqueId} ref={chartRef} width={170} height={60} />;
};

// Your data array

export default LineChart;
