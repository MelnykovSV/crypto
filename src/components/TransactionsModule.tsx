"use client";
import React, { useState, useEffect } from "react";
// import { getUserTransactions } from "@/app/actions";
// import { parseStrToJSON } from "@/app/lib";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";

export default function TransactionsModule({
  data: { totalPages: totalPagesNumber, userTransactions },
  params: {
    type: initialType,
    // substring: initialSubstring,
    date: initialDate,
    status: initialStatus,
    sorting: initialSorting,
    page: initialPage,
  },
}: any) {
  const [date, setDate] = useState<Date | null>(initialDate);
  // const [substring, setSubstring] = useState<string>(initialSubstring);
  const [type, setType] = useState<"all" | "buy" | "sell" | "exchange">(
    initialType
  );
  const [status, setStatus] = useState<"all" | "success" | "fail">(
    initialStatus
  );
  const [sorting, setSorting] = useState<1 | -1>(initialSorting);
  const [page, setPage] = useState<number>(initialPage);
  const [transactions, setTransactions] = useState(userTransactions);
  const [totalPages, setTotalPages] = useState<number>(totalPagesNumber);

  console.log(transactions);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const router = useRouter();

  const routerHandler = (
    e: React.ChangeEvent<unknown>,
    { field, value }: { field: string; value: any }
  ) => {
    const params = new URLSearchParams(searchParams);
    switch (field) {
      case "type":
      case "status":
        if (value === "all") {
          params.delete(field, value.toString());
        } else {
          params.set(field, value.toString());
        }

        break;

      case "substring":
      case "date":
        if (!value) {
          params.delete(field, value.toString());
        } else {
          params.set(field, value.toString());
        }

        break;

      case "sorting":
      case "page":
        if (value === 1) {
          params.delete(field, value.toString());
        } else {
          params.set(field, value.toString());
        }
        break;
    }

    router.push(`${pathname}?${params.toString()}`);
  };

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

  const substringHandler = useDebounceCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      console.log(e.target.value);
      routerHandler(e, { field: "substring", value: e.target.value });
      // setSubstring(e.target.value);
    },
    500
  );

  return (
    <div>
      <input
        type="text"
        name=""
        id=""
        defaultValue={searchParams.get("substring")?.toString()}
        onChange={substringHandler}
      />
    </div>
  );
}
