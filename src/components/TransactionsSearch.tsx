"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";

export default function TransactionsSearch() {
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

  
  const substringHandler = useDebounceCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
      routerHandler(e, { field: "substring", value: e.target.value });
      // setSubstring(e.target.value);
    },
    500
  );
  return (
    <input
      type="text"
      name=""
      id=""
      defaultValue={searchParams.get("substring")?.toString()}
      onChange={substringHandler}
    />
  );
}
