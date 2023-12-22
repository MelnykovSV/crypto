import { ICurrencyData } from "@/interfaces";
import StarCheckbox from "./StarCheckbox";
import Image from "next/image";

interface ICurrencyTabItemProps extends ICurrencyData {
  favorite: boolean;
}

export default function CurrenciesTableItem({
  id,
  symbol,
  current_price,
  image,
  favorite,
}: ICurrencyTabItemProps) {
  console.log(image);
  return (
    <li>
      <h2>{id}</h2>
      <Image
        src={image}
        alt="Picture of the author"
        width={50}
        height={50}
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      />

      <p>{symbol}</p>
      <p>{current_price}</p>
      <StarCheckbox checkStatus={favorite} />
    </li>
  );
}
