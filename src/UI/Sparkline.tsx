"use client";

import { LineChart, Line, YAxis, ResponsiveContainer } from "recharts";

interface ISparkline {
  data: { price: number[] };
  dif: number;
}

export default function Sparkline({ data, dif }: ISparkline) {
  if (!data.price.length) {
    return <p>No data</p>;
  }
  const formattedData = data.price.map((item) => ({ price: item }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      {}
      <LineChart width={300} height={100} data={formattedData}>
        <defs>
          <linearGradient id="colorGradient1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="5%" stopColor={"#0DBB7C"} stopOpacity={1} />
            <stop offset="95%" stopColor={"#18C8FF"} stopOpacity={1} />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="colorGradient2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="45%" stopColor={"#FF8282"} stopOpacity={1} />
            <stop offset="95%" stopColor={"#c82da4"} stopOpacity={1} />
          </linearGradient>
        </defs>
        <YAxis
          hide
          type="number"
          domain={([dataMin, dataMax]) => {
            const dif = dataMax - dataMin;

            return [dataMin - dif * 0.2, dataMax + dif * 0.2];
          }}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke={dif > 0 ? "url(#colorGradient1)" : "url(#colorGradient2)"}
          strokeWidth={2}
          dot={<></>}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
