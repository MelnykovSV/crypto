"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { DNA } from "react-loader-spinner";
import { useState } from "react";
import { roundValue } from "@/app/lib";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
interface IPieChartProps {
  data: {
    name: string;
    symbol: string;
    portfolioCoinPrice: number;
    logo: string;
  }[];
}

export default function PieChart({ data }: IPieChartProps) {
  const [isChartLoading, setIsChartLoading] = useState(true);

  const labels = data.map((item) => `${item.name} (${item.symbol})`);
  const values = data.map((item) => item.portfolioCoinPrice);
  var options: ApexOptions = {
    chart: {
      width: 300,
      type: "pie",
      events: {
        mounted: function (chartContext, options) {
          setIsChartLoading(false);
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return `${roundValue(value)}$`;
        },
      },
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      horizontalAlign: "center",
      floating: false,
      fontSize: "16px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,

      formatter: function (seriesName, opts) {
        if (data[opts.seriesIndex].logo) {
          return `<div class="flex items-center gap-2 ">
          <div class="w-7 h-7"><img class="block w-full h-full" src = "${
            data[opts.seriesIndex].logo
          }"/></div>
          
          <p class="text-white">${seriesName}
          </p></div>`;
        } else {
          return seriesName;
        }
      },
      inverseOrder: false,
      width: 280,
      height: undefined,
      tooltipHoverFormatter: undefined,
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: undefined,
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: [],
        radius: 12,

        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 0,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 800,
          },
          legend: {
            position: "bottom",
            width: 280,
            height: 300,
          },
        },
      },
    ],
  };
  return (
    <div className="w-full laptop:min-w-[580px] desktop:min-w-[700px] overflow-hidden">
      <h2 className="font-bold text-3xl pl-[20px] mb-8">
        Portfolio allocation
      </h2>

      <div className=" relative h-full">
        <ApexChart
          options={options}
          series={values}
          type="pie"
          height={600}
          width={"100%"}
        />
        {isChartLoading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]">
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        )}
      </div>
    </div>
  );
}
