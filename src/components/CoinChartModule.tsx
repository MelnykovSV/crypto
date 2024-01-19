"use client";

import { CoinChart } from ".";
import { useEffect, useState, useReducer, useRef } from "react";
import { getCoinOHLCData, getCoinMarketChartData } from "@/api";
import { formatCandleChartData, formatLineChartData } from "@/app/lib";
import { usePathname } from "next/navigation";
import Image from "next/image";
import lineChartIcon from "@/assets/line-chart.svg";
import candleChartIcon from "@/assets/candle-chart.svg";

const chartDataHandlers = {
  candlestick: {
    dataProcessor: formatCandleChartData,
    fetchFunction: getCoinOHLCData,
  },
  line: {
    dataProcessor: formatLineChartData,
    fetchFunction: getCoinMarketChartData,
  },
};

const daysAmount: { value: number | "max"; label: string }[] = [
  { value: 1, label: "24h" },
  { value: 7, label: "7d" },
  { value: 30, label: "30d" },
  { value: 90, label: "90d" },
  { value: 180, label: "180d" },
  { value: 365, label: "1y" },
  { value: "max", label: "Max" },
];

interface ICoinChartModuleProps {
  initialData: { x: Date; y: number[] | number }[];
  name: string;
}

export default function CoinChartModule({
  initialData,
  name,
}: ICoinChartModuleProps) {
  const [series, setSeries] = useState<
    { data: { x: Date; y: number[] | number }[]; name: string }[]
  >([{ data: initialData, name }]);

  const [chartType, setChartType] = useState<"line" | "candlestick">("line");
  const [days, setDays] = useState<number | "max">(1);
  const [showBTCChart, setShowBTCChart] = useState(false);
  const [vsCurrency, setVsCurrency] = useState("usd");

  const isInitialMount = useRef(true);

  const pathname = usePathname();

  const daysChangeHandler = (value: number | "max") => {
    setDays(value);
  };

  const fetchChartData = async ({
    coin,
    days,
    showBTCChart,
    vsCurrency,
    chartType,
  }: {
    coin: string;
    days: number | "max";
    showBTCChart: boolean;
    vsCurrency: string;
    chartType: "candlestick" | "line";
  }) => {
    if (showBTCChart) {
      const mainData: [number, number][] = await chartDataHandlers[
        chartType
      ].fetchFunction(coin, vsCurrency, days);

      const btcData: [number, number][] = await chartDataHandlers[
        chartType
      ].fetchFunction("bitcoin", vsCurrency, days);

      setSeries([
        {
          data: chartDataHandlers[chartType].dataProcessor(mainData),
          name: coin[0].toUpperCase() + coin.slice(1),
        },
        {
          data: chartDataHandlers[chartType].dataProcessor(btcData),
          name: "Bitcoin",
        },
      ]);
    } else {
      const mainData: [number, number][] = await chartDataHandlers[
        chartType
      ].fetchFunction(coin, vsCurrency, days);

      if (mainData) {
        setSeries([
          {
            data: chartDataHandlers[chartType].dataProcessor(mainData),
            name: coin[0].toUpperCase() + coin.slice(1),
          },
        ]);
      }
    }
  };

  const lineClickHandler = async () => {
    await fetchChartData({
      coin: pathname.split("/")[pathname.split("/").length - 1],
      days,
      showBTCChart,
      vsCurrency,
      chartType: "line",
    });
    setChartType("line");
  };

  const candleClickHandler = async () => {
    await fetchChartData({
      coin: pathname.split("/")[pathname.split("/").length - 1],
      days,
      showBTCChart,
      vsCurrency,
      chartType: "candlestick",
    });

    setChartType("candlestick");
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchChartData({
        coin: pathname.split("/")[pathname.split("/").length - 1],
        days,
        showBTCChart,
        vsCurrency,
        chartType,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    <div>
      <div className="flex flex-col gap-5 justify-between items-start tablet:flex-row tablet:items-center">
        <div className="flex gap-3">
          <button
            type="button"
            className={`p-3 border-[1px] rounded-lg ${
              chartType === "line" ? "bg-accent/40" : ""
            }`}
            onClick={lineClickHandler}>
            <Image
              src={lineChartIcon}
              alt="line chart icon"
              width={32}
              height={32}
            />
          </button>
          <button
            type="button"
            className={`p-3 border-[1px] rounded-lg  ${
              chartType === "candlestick" ? "bg-accent/40" : ""
            }`}
            onClick={candleClickHandler}>
            <Image
              src={candleChartIcon}
              alt="candlestick chart icon"
              width={32}
              height={32}
            />
          </button>
        </div>
        <div className="flex text-xs tablet:text-base">
          {daysAmount.map(({ value, label }) => (
            <button
              key={label}
              type="button"
              className={`border-[1px] p-2 first-of-type:rounded-tl-lg  first-of-type:rounded-bl-lg last-of-type:rounded-tr-lg last-of-type:rounded-br-lg ${
                days === value ? " bg-accent/40" : ""
              }`}
              onClick={() => {
                daysChangeHandler(value);
              }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {!!series && <CoinChart series={series} type={chartType} />}
    </div>
  );
}
