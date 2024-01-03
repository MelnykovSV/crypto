import CurrenciesTableItem from "./CurrenciesTableItem";
import { ICurrencyData } from "@/interfaces";

const favArray = ["bitcoin", "ethereum"];

export const getCurrenciesData = async () => {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?order=market_cap_desc&page=1&sparkline=true&price_change_percentage=1h,24h,7d&x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD&vs_currency=usd&per_page=20&precision=3"
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export default async function CurrenciesTable() {
  const currenciesData = await getCurrenciesData();

  console.log(currenciesData);

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>#</th>
          <th>Coin</th>
          <th>Price</th>
          <th>1h</th>
          <th>24h</th>
          <th>7d</th>
          <th>24h Volume</th>
          <th>market Cap</th>
          <th>Last 7 days</th>
        </tr>
      </thead>
      <tbody>
        {currenciesData.map((props: ICurrencyData) => (
          <CurrenciesTableItem
            key={props.id}
            {...props}
            favorite={favArray.includes(props.id)}
          />
        ))}
      </tbody>
    </table>
  );
}
