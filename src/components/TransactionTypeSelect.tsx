"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function TransactionTypeSelect() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const typeHandler = (e: SelectChangeEvent) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value === "all") {
      params.delete("type");
      params.delete("page");
    } else {
      params.set("type", e.target.value.toString());
      params.delete("page");
    }

    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <Select
      defaultValue={searchParams.get("type")?.toString() || "all"}
      onChange={typeHandler}
      sx={{
        color: "#fff",
        borderRadius: "10px",
        width: "150px",
        backgroundColor: "#16161E",
        ".MuiSvgIcon-root": { fill: "white" },
        "& .MuiMenuItem-root.Mui-selected": {
          backgroundColor: "#fff",
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            color: "#fff",
            backgroundColor: "#16161E",
            "& .MuiMenuItem-root": {
              color: "#fff",

              "&.Mui-selected:hover": {
                backgroundColor: "#b102cd",
              },
            },
            "& .MuiMenuItem-root:hover": {
              backgroundColor: "#b102cd",
            },
          },
        },
      }}>
      <MenuItem value="all">All Types</MenuItem>
      <MenuItem value="buy">Buy</MenuItem>
      <MenuItem value="sell">Sell</MenuItem>
      <MenuItem value="exchange">Exchange</MenuItem>
    </Select>
  );
}
