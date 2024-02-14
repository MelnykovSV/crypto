import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { DNA } from "react-loader-spinner";

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
  console.log(data);
  const labels = data.map((item) => `${item.name} (${item.symbol})`);
  const values = data.map((item) => item.portfolioCoinPrice);
  var options: ApexOptions = {
    chart: {
      width: 300,
      type: "pie",
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      // position: "bottom",
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
      // customLegendItems: ['<div>"azazaza"</div>'],
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
        // customHTML: function () {
        //   console.log(this);
        //   return ' <div class="flex w-7 justify-between"><span class="custom-marker block w-3 h-3"></span> <div class="block w-3 h-3"><img src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" class="block w-full h-full"/></div> </div>';
        // },
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
            // width: 300,
            height: 800,
          },
          legend: {
            position: "bottom",
            // show: false,
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
      <ApexChart
        options={options}
        series={values}
        type="pie"
        height={600}
        width={"100%"}
      />
    </div>
  );
}
