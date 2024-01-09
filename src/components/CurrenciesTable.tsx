import CurrenciesTableItem from "./CurrenciesTableItem";
import { ICurrencyData } from "@/interfaces";
import { getCurrenciesData, getCurrenciesAmmount } from "@/api";

const favArray = ["bitcoin", "ethereum"];

export default async function CurrenciesTable() {
  const currenciesData = await getCurrenciesData(1);

  const currenciesAmmount = await getCurrenciesAmmount();

  console.log(currenciesAmmount);

  return (
    <table className="min-w-[950px]">
      <thead>
        <tr>
          <th></th>
          <th className="text-left">#</th>
          <th className="text-left">Coin</th>
          <th className="text-left">Price</th>
          <th className="text-left">1h</th>
          <th className="text-left">24h</th>
          <th className="text-left">7d</th>
          <th className="text-left">24h Volume</th>
          <th className="text-left">market Cap</th>
          <th className="text-left">Last 7 days</th>
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
