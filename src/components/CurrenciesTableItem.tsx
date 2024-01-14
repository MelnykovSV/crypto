"use client";
import { ICurrencyData } from "@/interfaces";
import { StarCheckbox } from "@/UI";
import { Sparkline } from "@/UI";
import { ICoinTableData } from "@/interfaces";
import { ImageComponent } from "@/UI";

export default function CurrenciesTableItem({
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
  favorite,
  sparkline_in_7d,
}: ICoinTableData) {
  return (
    <tr>
      <td className=" w-7">
        <StarCheckbox checkStatus={favorite} />
      </td>
      <td className="w-16">{market_cap_rank || "--"}.</td>
      <td className=" w-80">
        <div className="flex gap-3 items-center">
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
          <p className=" text-zinc-400">{symbol || "--"}</p>
        </div>
      </td>
      <td className=" w-32">
        ${current_price ? current_price.toFixed(2) : "--"}
      </td>
      <td className=" w-[56px]">
        {price_change_percentage_1h_in_currency
          ? price_change_percentage_1h_in_currency.toFixed(1)
          : "--"}
      </td>
      <td className=" w-[56px]">
        {price_change_percentage_24h_in_currency
          ? price_change_percentage_24h_in_currency.toFixed(1)
          : "--"}
      </td>
      <td className=" w-[56px]">
        {price_change_percentage_7d_in_currency
          ? price_change_percentage_7d_in_currency.toFixed(1)
          : "--"}
      </td>
      <td className=" w-[150px]">
        ${market_cap_change_24h ? Math.floor(market_cap_change_24h) : "--"}
      </td>
      <td className=" w-[150px]">
        ${market_cap ? Math.floor(market_cap) : "--"}
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
