"use client";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface IProfitChartprops {
  data: {
    x: Date;
    y: number;
  }[];
}

const lineOptions: ApexOptions = {
  stroke: {
    curve: "straight",
  },
  tooltip: {
    enabled: true,
    enabledOnSeries: undefined,
    shared: true,
    followCursor: false,
    intersect: false,
    inverseOrder: false,
    custom: undefined,
    fillSeriesColor: false,

    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    onDatasetHover: {
      highlightDataSeries: false,
    },
    x: {
      show: true,
      format: "ddd dd MMM yyyy, HH:mm:ss",
      formatter: undefined,
    },
    y: {
      formatter: undefined,
      title: {
        formatter: (seriesName) => seriesName,
      },
    },
    marker: {
      show: true,
    },

    fixed: {
      enabled: false,
      position: "topRight",
      offsetX: 0,
      offsetY: 0,
    },
  },
  chart: {
    type: "line",
    stacked: false,
    height: 350,
    width: "100%",
    zoom: {
      type: "x",
      enabled: true,
      autoScaleYaxis: true,
    },
    toolbar: {
      autoSelected: "zoom",
    },

    //   events: {
    //     mounted: function (chartContext, options) {
    //       setIsChartLoading(false);
    //     },
    //   },
  },

  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    title: {
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: "12px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 600,
        cssClass: "apexcharts-xaxis-title",
      },
    },
    labels: {
      show: true,
      rotate: -45,
      rotateAlways: false,
      hideOverlappingLabels: true,
      showDuplicates: false,
      trim: false,
      minHeight: undefined,
      maxHeight: 120,
      style: {
        colors: "#86909C",
        fontSize: "12px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 400,
        cssClass: "apexcharts-xaxis-label",
      },

      offsetX: 0,
      offsetY: 0,
      format: undefined,
      formatter: undefined,
      datetimeUTC: true,
      datetimeFormatter: {
        year: "yyyy",
        month: "MMM 'yy",
        day: "dd MMM",
        hour: "HH:mm",
      },
    },
  },
  yaxis: {
    tooltip: {
      enabled: false,
    },
    title: {
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: "12px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 600,
        cssClass: "apexcharts-xaxis-title",
      },
    },
    labels: {
      style: {
        colors: "#86909C",
        fontSize: "12px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 400,
        cssClass: "apexcharts-xaxis-label",
      },
      formatter: (value) => {
        return `${value.toFixed(6)}$`;
      },
    },
  },
};

export default function ProfitChart({ data }: IProfitChartprops) {
  console.log(data);
  return (
    <div className="h-[420px] overflow-hidden">
      <ApexChart
        options={lineOptions}
        series={[{ data }]}
        type="line"
        height={420}
        width={"100%"}
      />
    </div>
  );
}
