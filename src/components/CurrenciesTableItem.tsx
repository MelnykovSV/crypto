import { ICurrencyData } from "@/interfaces";
import { StarCheckbox } from "@/UI";
import Image from "next/image";

interface ICurrencyTabItemProps extends ICurrencyData {
  favorite: boolean;
}

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
}: ICurrencyTabItemProps) {
  console.log(image);
  return (
    <tr>
      <td>
        <StarCheckbox checkStatus={favorite} />
      </td>
      <td>{market_cap_rank}.</td>
      <td>
        <div className="flex gap-2">
          <Image
            src={image}
            alt="Picture of the author"
            width={30}
            height={30}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
          <p>{name}</p>
          <p>{symbol}</p>
        </div>
      </td>
      <td>${current_price.toFixed(2)}</td>
      <td>{price_change_percentage_1h_in_currency.toFixed(1)}</td>
      <td>{price_change_percentage_24h_in_currency.toFixed(1)}</td>
      <td>{price_change_percentage_7d_in_currency.toFixed(1)}</td>
      <td>${Math.floor(market_cap_change_24h)}</td>
      <td>${Math.floor(market_cap)}</td>
      <td>sparkline_in_7d</td>
    </tr>
  );
}
