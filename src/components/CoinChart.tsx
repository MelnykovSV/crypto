"use client";
// import Chart from "react-apexcharts";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import { formatCandleChartData, formatLineChartData } from "@/app/lib";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const options: ApexOptions = {
  chart: {
    type: "line",
    height: 420,
    width: 700,
  },
  title: {
    text: "CandleStick Chart",
    align: "left",
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    tooltip: {
      enabled: false,
    },
  },
};

const lineOptions: ApexOptions = {
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  title: {
    text: "Product Trends by Month",
    align: "left",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  },
};

interface ICoinChartProps {
  series: { data: { x: Date; y: number[] | number }[] }[];
  type: "candlestick" | "line";
}

export default function CoinChart({ series, type }: ICoinChartProps) {


  switch (type) {
    case "candlestick":
      return (
        <div>
          <div className="app h-[600px]">
            <ApexChart
              options={options}
              series={series}
              type="candlestick"
              height={420}
              width={700}
            />
          </div>
        </div>
      );

    case "line":
      return (
        //Container with fixed height needed
        <div>
          <button></button>

          <div className="app h-[600px]">
            {
              <ApexChart
                options={options}
                series={series}
                type="line"
                height={420}
                width={700}
              />
            }
          </div>
        </div>
      );

    default:
      return (
        <div>
          <h2>Some error</h2>
        </div>
      );
  }
}
