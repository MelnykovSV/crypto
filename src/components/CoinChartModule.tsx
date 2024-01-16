"use client";

import { CoinChart } from ".";
import { useEffect, useState, useReducer } from "react";
import { getCoinOHLCData, getCoinMarketChartData } from "@/api";
import { formatCandleChartData, formatLineChartData } from "@/app/lib";

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

export default function CoinChartModule() {
  const [series, setSeries] = useState<
    { data: { x: Date; y: number[] | number }[] }[]
  >([]);

  const [chartType, setChartType] = useState<"line" | "candlestick">("line");
  const [days, setDays] = useState<number | "max">(1);
  const [showBTCChart, setShowBTCChart] = useState(false);
  const [vsCurrency, setVsCurrency] = useState("usd");

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
        { data: chartDataHandlers[chartType].dataProcessor(mainData) },
        { data: chartDataHandlers[chartType].dataProcessor(btcData) },
      ]);
    } else {
      const mainData: [number, number][] = await chartDataHandlers[
        chartType
      ].fetchFunction(coin, vsCurrency, days);
      console.log(mainData);

      if (mainData) {
        setSeries([
          { data: chartDataHandlers[chartType].dataProcessor(mainData) },
        ]);
      }
    }
  };

  const lineClickHandler = async () => {
    await fetchChartData({
      coin: "dogecoin",
      days,
      showBTCChart,
      vsCurrency,
      chartType: "line",
    });
    setChartType("line");
  };

  const candleClickHandler = async () => {
    await fetchChartData({
      coin: "dogecoin",
      days,
      showBTCChart,
      vsCurrency,
      chartType: "candlestick",
    });

    setChartType("candlestick");
  };

  useEffect(() => {
    fetchChartData({
      coin: "dogecoin",
      days,
      showBTCChart,
      vsCurrency,
      chartType,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    <div>
      <button type="button" onClick={lineClickHandler}>
        Line
      </button>
      <button type="button" onClick={candleClickHandler}>
        Candle
      </button>

      {daysAmount.map(({ value, label }) => (
        <button
          key={label}
          type="button"
          onClick={() => {
            daysChangeHandler(value);
          }}>
          {label}
        </button>
      ))}

      {!!series && <CoinChart series={series} type={chartType} />}
    </div>
  );
}
