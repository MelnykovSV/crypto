import CurrenciesTableItem from "./CoinsTableItem";
import { ICoinTableData } from "@/interfaces";


// const favArray = ["bitcoin", "ethereum"];

interface ITableProps {
  tableData: ICoinTableData[];
}

export default async function CoinsTable({ tableData }: ITableProps) {
  return (
    <table className="min-w-[950px] mb-5">
      <thead>
        <tr>
          <th className="text-left pl-2">#</th>
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
        {tableData.map((props: ICoinTableData) => (
          <CurrenciesTableItem
            key={props.id}
            {...props}
            // favorite={favArray.includes(props.id)}
          />
        ))}
      </tbody>
    </table>
  );
}
