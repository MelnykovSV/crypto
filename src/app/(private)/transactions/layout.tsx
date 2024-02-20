// import { Search, Breadcrumbs } from "@/components";
import {
  TransactionsSearch,
  TransactionsTable,
  TransactionTypeSelect,
  TransactionStatusSelect,
  TransactionsSortingSwitcher,
  TransactionsDatePicker,
  PaginationComponent,
} from "@/components";

export default function Layout({ children, params }: any) {
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

      {children}
    </div>
  );
}
