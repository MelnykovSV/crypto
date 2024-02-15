// "use client";
import React from "react";
// import { getUserTransactions } from "@/app/actions";
// import { parseStrToJSON } from "@/app/lib";
// import { useSearchParams, usePathname, useRouter } from "next/navigation";
// import { useDebounceCallback } from "usehooks-ts";
import { TransactionsSearch } from ".";
import { TransactionsTable } from ".";

export default function TransactionsModule({
  data: { totalPages: totalPagesNumber, userTransactions },
  params,
}: any) {
  // const [date, setDate] = useState<Date | null>(initialDate);
  // // const [substring, setSubstring] = useState<string>(initialSubstring);
  // const [type, setType] = useState<"all" | "buy" | "sell" | "exchange">(
  //   initialType
  // );
  // const [status, setStatus] = useState<"all" | "success" | "fail">(
  //   initialStatus
  // );
  // const [sorting, setSorting] = useState<1 | -1>(initialSorting);
  // const [page, setPage] = useState<number>(initialPage);
  // const [transactions, setTransactions] = useState(userTransactions);
  // const [totalPages, setTotalPages] = useState<number>(totalPagesNumber);

  // console.log(transactions);

  // const searchParams = useSearchParams();
  // const pathname = usePathname();

  // const router = useRouter();

  // useEffect(() => {
  //   (async () => {
  //     const res = await getUserTransactions({
  //       date,
  //       substring,
  //       type,
  //       status,
  //       sorting,
  //       page,
  //     });
  //     const transactionsData = parseStrToJSON(res);
  //     console.log(transactionsData.userTransactions);

  //     setTransactions(transactionsData.userTransactions);
  //   })();
  // }, [date, substring, type, status, sorting, page]);

  // const substringHandler = useDebounceCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     console.log(e.target.value);
  //     routerHandler(e, { field: "substring", value: e.target.value });
  //     // setSubstring(e.target.value);
  //   },
  //   500
  // );

  return (
    <div>
      {/* <input
        type="text"
        name=""
        id=""
        defaultValue={searchParams.get("substring")?.toString()}
        onChange={substringHandler}
      /> */}

      <TransactionsSearch />
      <TransactionsTable params={params} />
    </div>
  );
}
