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

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const chartcreate = new Chart(ctx, {
          type: "line",
          data: {
            labels: Array.from({ length: data.length }, (_, i) => i + 1), // Labels for x-axis (index-based)
            datasets: [
              {
                label: "Data Points",
                data: data,
                borderColor: isGreen ? "rgb(34 ,197, 94)" : "rgb(239, 68, 68)",
                backgroundColor: isGreen
                  ? "rgba(75, 192, 192, 0.2)"
                  : "rgba(239, 68, 68 0.2)",
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
  }, [data, isGreen]);

  return <canvas key={uniqueId} ref={chartRef} width={158} height={60} />;
};

// Your data array

export default LineChart;
