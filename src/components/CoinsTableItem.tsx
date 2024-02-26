// "use client";

import { Sparkline } from "@/UI";
import { ICoinTableData } from "@/interfaces";
import { ImageComponent } from "@/UI";
import Link from "next/link";
import { roundValue } from "@/app/lib";

export default function CoinsTableItem({
  id,
  name,
  symbol,
  current_price,
  image,
  market_cap_rank,
  price_change_percentage_1h_in_currency,
  price_change_percentage_24h_in_currency,
  price_change_percentage_7d_in_currency,
  market_cap,
  market_cap_change_24h,
  sparkline_in_7d,
}: ICoinTableData) {
  return (
    <tr className=" transition-colors hover:bg-accent/30 ">
      <td className="w-16 pl-2">{market_cap_rank || "--"}.</td>
      <td className=" w-80">
        <Link href={`coins/${id}`} className="flex gap-3 items-center">
          <ImageComponent
            src={
              image.startsWith("https://assets.coingecko.com/coins/images")
                ? image
                : "/--"
            }
            alt={`${name} coin image`}
            width={30}
            height={30}
          />

          <p className=" max-w-52 truncate ">{name || "--"}</p>
          <p className=" text-zinc-400">{symbol.toUpperCase() || "--"}</p>
        </Link>
      </td>
      <td className=" w-32">
        <p className="max-w-32 truncate">
          $
          {current_price
            ? Number(roundValue(current_price)).toLocaleString("en-US")
            : sparkline_in_7d.price.length
            ? roundValue(
                sparkline_in_7d.price[sparkline_in_7d.price.length - 1]
              )
            : "-- "}
        </p>
      </td>
      <td
        className={`w-[63px] ${
          price_change_percentage_1h_in_currency > 0
            ? "text-success"
            : "text-error"
        }`}>
        {price_change_percentage_1h_in_currency
          ? price_change_percentage_1h_in_currency.toFixed(1)
          : "--"}{" "}
        %
      </td>
      <td
        className={`w-[63px] ${
          price_change_percentage_24h_in_currency > 0
            ? "text-success"
            : "text-error"
        }`}>
        {price_change_percentage_24h_in_currency
          ? price_change_percentage_24h_in_currency.toFixed(1)
          : "--"}{" "}
        %
      </td>
      <td
        className={`w-[63px] ${
          price_change_percentage_7d_in_currency > 0
            ? "text-success"
            : "text-error"
        }`}>
        {price_change_percentage_7d_in_currency
          ? price_change_percentage_7d_in_currency.toFixed(1)
          : "--"}{" "}
        %
      </td>
      <td
        className={`w-[150px] ${
          market_cap_change_24h > 0 ? "text-success" : "text-error"
        }`}>
        $
        {market_cap_change_24h
          ? Number(Math.floor(market_cap_change_24h)).toLocaleString("en-US")
          : "--"}
      </td>
      <td className=" w-[160px]">
        $
        {market_cap
          ? Number(Math.floor(market_cap)).toLocaleString("en-US")
          : "--"}
      </td>
      <td
        className="w-[200px] h-[56px] min-w-[120px] pr-3"
        width={200}
        height={56}>
        <Sparkline
          data={sparkline_in_7d}
          dif={price_change_percentage_7d_in_currency}
        />
      </td>
    </tr>
  );
}
