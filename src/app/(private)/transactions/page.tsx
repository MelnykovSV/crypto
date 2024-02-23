import { getUserTransactions } from "@/app/actions";
import {
  TransactionsTable,
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

  const data = await getUserTransactions({
    type,
    substring,
    date,
    status,
    sorting,
    page,
  });

  if (data instanceof Object && "error" in data) {
    return (
      <div>
        <h2>ERROR</h2>
        {data.error}
      </div>
    );
  }
  return (
    <>
      <TransactionsTable data={data} />
      {data.totalPages &&
      Number(data.totalPages) &&
      Number(data.totalPages) > 1 ? (
        <PaginationComponent totalPages={data.totalPages} />
      ) : null}
    </>
  );
}
