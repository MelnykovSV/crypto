"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

export default function TransactionsSortingSwitcher() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams);

  const sortingHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: number
  ) => {
    const params = new URLSearchParams(searchParams);
    if (value === 1) {
      params.delete("sorting");
    } else {
      params.set("sorting", (-1).toString());
    }

    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex  flex-col gap-1">
      <button
        className=""
        type="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          sortingHandler(e, 1);
        }}>
        <FaArrowUp
          size={"10px"}
          color={params.get("sorting") !== "-1" ? "#b102cd" : "white"}
        />
      </button>
      <button
        type="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          sortingHandler(e, -1);
        }}>
        <FaArrowDown
          size={"10px"}
          color={params.get("sorting") === "-1" ? "#b102cd" : "white"}
        />
      </button>
    </div>
  );
}
