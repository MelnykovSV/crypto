import { getTransactionsPages } from "@/app/actions";
import {
  TransactionsSearch,
  TransactionsTable,
  TransactionTypeSelect,
  TransactionStatusSelect,
  TransactionsSortingSwitcher,
  TransactionsDatePicker,
  PaginationComponent,
} from "@/components";

interface ITransactionsPage {
  searchParams: {
    type: "all" | "buy" | "sell" | "exchange" | undefined;
    substring: string | undefined;
    date: string | null | undefined;
    status: "all" | "success" | "fail" | undefined;
    sorting: "1" | "-1";
    page: string;
  };
}

export default async function TransactionsPage({
  searchParams,
}: ITransactionsPage) {
  const {
    type = "all",
    substring = "",
    date = null,
    status = "all",
    sorting = "1",
    page = "1",
  } = searchParams;

  const totalPages = await getTransactionsPages({
    type,
    substring,
    date,
    status,
    sorting,
    page,
  });

  if (totalPages instanceof Object && totalPages.error) {
    return (
      <div>
        <h2>ERROR</h2>
        {totalPages.error}
      </div>
    );
  }

  return (
    <div className="pb-[30px]">
      <div className="flex flex-col flex-wrap laptop:flex-row gap-x-5 gap-y-1 items-start justify-between px-3 laptop:px-5 mb-[20px]">
        <div className="flex flex-wrap gap-x-10 justify-between">
          <TransactionsSearch />

          <div className="small-desktop:hidden flex gap-2 items-center">
            Sort by date <TransactionsSortingSwitcher />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap laptop:gap-4 laptop:flex-row">
          <TransactionTypeSelect />
          <TransactionStatusSelect />
          <TransactionsDatePicker />
        </div>
      </div>

      <TransactionsTable
        params={{ type, substring, date, status, sorting, page }}
      />
      {totalPages && Number(totalPages) && Number(totalPages) > 1 ? (
        <PaginationComponent totalPages={Number(totalPages)} />
      ) : null}
    </div>
  );
}
