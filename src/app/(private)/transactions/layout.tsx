import {
  TransactionsSearch,
  TransactionTypeSelect,
  TransactionStatusSelect,
  TransactionsSortingSwitcher,
  TransactionsDatePicker,
} from "@/components";
import { ReactElement } from "react";
interface LayoutProps {
  children: ReactElement;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="pb-[30px]">
      <div className="flex flex-col flex-wrap small-desktop:flex-row gap-x-5 gap-y-2 items-start justify-between px-[10px] laptop:px-5 mb-[20px]">
        <div className="flex flex-wrap gap-x-10 gap-y-2 justify-between">
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
