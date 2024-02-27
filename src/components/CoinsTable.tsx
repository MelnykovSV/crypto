import CurrenciesTableItem from "./CoinsTableItem";
import { ICoinTableData } from "@/interfaces";

interface ITableProps {
  tableData: ICoinTableData[];
}

export default async function CoinsTable({ tableData }: ITableProps) {
  return (
    <table className=" mb-5 w-full text-sm small-desktop:text-base ">
      <thead>
        <tr>
          <th className="text-left hidden large-mobile:table-cell pl-2">#</th>
          <th className="text-left">Coin</th>
          <th className="text-left">Price</th>
          <th className="text-left hidden laptop:table-cell">1h</th>
          <th className="text-left hidden large-mobile:table-cell">24h</th>
          <th className="text-left hidden laptop:table-cell">7d</th>
          <th className="text-left hidden laptop:table-cell">24h Volume</th>
          <th className="text-left hidden tablet:table-cell">market Cap</th>
          <th className="text-left hidden small-desktop:table-cell">
            Last 7 days
          </th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((props: ICoinTableData) => (
          <CurrenciesTableItem key={props.id} {...props} />
        ))}
      </tbody>
    </table>
  );
}
