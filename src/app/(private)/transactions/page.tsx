import { getUserTransactions } from "@/app/actions";
import { TransactionsModule } from "@/components";
import { parseStrToJSON } from "@/app/lib";

interface ITransactionsPage {
  searchParams: {
    type: "all" | "buy" | "sell" | "exchange" | undefined;
    substring: string | undefined;
    date: Date | null | undefined;
    status: "all" | "success" | "fail" | undefined;
    sorting: 1 | -1 | undefined;
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
    sorting = 1,
    page = 1,
  } = searchParams;

  console.log(substring);
  const res = await getUserTransactions({
    type,
    substring,
    date,
    status,
    sorting,
    page,
  });

  const transactionsData = parseStrToJSON(res);

  return (
    <div>
      <h1>Transactions page</h1>
      {transactionsData ? (
        <TransactionsModule
          data={transactionsData}
          params={{ type, substring, date, status, sorting, page }}
        />
      ) : null}
    </div>
  );
}
