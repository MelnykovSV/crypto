import CurrenciesTable from "@/components/CoinsTable";
import ReactPaginate from "react-paginate";
import Pagination from "@mui/material/Pagination";
import { PaginationComponent, Search } from "@/components";
// import { getCurrenciesData, getCurrenciesAmmount } from "@/api";
import { getCurrenciesData, getTotalCoinsPages } from "@/app/actions";

interface ICoinsPageProps {
  searchParams: {
    page: string;
  };
}

export default async function Page({ searchParams }: ICoinsPageProps) {
  const { page = "1" } = searchParams;

  const pagesAmount = await getTotalCoinsPages();
  const tableData = await getCurrenciesData(Number(page));

  if (pagesAmount instanceof Object && "error" in pagesAmount) {
    return (
      <div>
        <h2>ERROR</h2>
        {pagesAmount.error}
      </div>
    );
  }

  if (tableData instanceof Object && "error" in tableData) {
    return (
      <div>
        <h2>ERROR</h2>
        {tableData.error}
      </div>
    );
  }

  return (
    <div>
      <CurrenciesTable tableData={tableData} />

      <PaginationComponent totalPages={pagesAmount || 1} />
    </div>
  );
}
