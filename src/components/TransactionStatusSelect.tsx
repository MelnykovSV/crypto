"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function TransactionStatusSelect() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const statusHandler = (e: SelectChangeEvent) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value === "all") {
      params.delete("status");
    } else {
      params.set("status", e.target.value.toString());
    }

    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <Select
      defaultValue={searchParams.get("status")?.toString() || "all"}
      onChange={statusHandler}
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
      <MenuItem value="all">Any Status</MenuItem>
      <MenuItem value="success">Success</MenuItem>
      <MenuItem value="fail">Fail</MenuItem>
    </Select>
  );
}
