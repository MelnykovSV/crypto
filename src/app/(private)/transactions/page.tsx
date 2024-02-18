import {
  TransactionsSearch,
  TransactionsTable,
  TransactionTypeSelect,
  TransactionStatusSelect,
  TransactionsSortingSwitcher,
  TransactionsDatePicker,
  PaginationComponent,
} from "@/components";

import { getTransactionsPages } from "@/app/actions";

interface ITransactionsPage {
  searchParams: {
    type: "all" | "buy" | "sell" | "exchange" | undefined;
    substring: string | undefined;
    date: string | null | undefined;
    status: "all" | "success" | "fail" | undefined;
    sorting: "1" | "-1";
    page: number;
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
    page = 1,
  } = searchParams;

  const totalPages = await getTransactionsPages({
    type,
    substring,
    date,
    status,
    sorting,
    page,
  });

  return (
    <div className="pb-[30px]">
      <div className="flex gap-5 items-start justify-between px-5 mb-[20px]">
        <TransactionsSearch />

        <div className="flex gap-4">
          {" "}
          <TransactionTypeSelect />
          <TransactionStatusSelect />
          <TransactionsDatePicker />
        </div>
      </div>

      <TransactionsTable
        params={{ type, substring, date, status, sorting, page }}
      />
      {Number(totalPages) > 1 ? (
        <PaginationComponent totalPages={Number(totalPages)} />
      ) : null}
    </div>
  );
}
