import CurrenciesTable from "@/components/CurrenciesTable";
import ReactPaginate from "react-paginate";
import Pagination from "@mui/material/Pagination";
import { getCurrenciesData, getCurrenciesAmmount } from "@/api";

export default function Page() {
  const pagesAmount = getCurrenciesAmmount();

  const handlePagination = (e: React.ChangeEvent, value: number) => {
    
  };
  return (
    <div>
      <h2>CurrenciesPage</h2>
      <CurrenciesTable />
      {/* <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={() => {
          console.log("1");
        }}
        pageRangeDisplayed={5}
        pageCount={10}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      /> */}
      <Pagination count={10} color="primary" />
    </div>
  );
}
