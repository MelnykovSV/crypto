"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import searchIcon from "@/assets/search.svg";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";

export default function TransactionsSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const substringHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (!e.target.value) {
      params.delete("substring");
    } else {
      params.set("substring", e.target.value.toString());
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const debouncedSubstringHandler = useDebounceCallback(substringHandler, 500);
  return (
    <TextField
      type="text"
      className="mb-2  bg-[#16161E] rounded-[10px]"
      placeholder="Search by coin symbol"
      defaultValue={searchParams.get("substring")?.toString()}
      onChange={debouncedSubstringHandler}
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: "10px",
        },
        "& .MuiInputBase-input": {
          paddingLeft: "20px",
          color: "#fff",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IoSearch size={"30px"} color="#fff" />
          </InputAdornment>
        ),
      }}
    />
  );
}
