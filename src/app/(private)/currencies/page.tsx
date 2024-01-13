import CurrenciesTable from "@/components/CurrenciesTable";
import ReactPaginate from "react-paginate";
import Pagination from "@mui/material/Pagination";
import { PaginationComponent } from "@/components";
import { getCurrenciesData, getCurrenciesAmmount } from "@/api";

interface ICoinsPageProps {
  searchParams: {
    page: number;
  };
}

export default async function Page({ searchParams }: ICoinsPageProps) {
  const pagesAmount = await getCurrenciesAmmount();
  const currenciesData = await getCurrenciesData(Number(searchParams.page));



  return (
    <div>
      <h2>CurrenciesPage</h2>
      <CurrenciesTable tableData={currenciesData} />

      <PaginationComponent
        totalPages={pagesAmount||1}
      />
    </div>
  );
}
