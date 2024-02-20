"use client";
import { Pagination } from "@mui/material";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface IPaginationComponentProps {
  totalPages: number;
}

export default function PaginationComponent({
  totalPages,
}: IPaginationComponentProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const paginationHandler = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      count={totalPages}
      page={Number(searchParams.get("page")) || 1}
      onChange={paginationHandler}
      color="secondary"
      shape="rounded"
      className=" justify-center"
      sx={{
        paddingBottom: "15px",
        "& .MuiPagination-ul": {
          justifyContent: "center",
        },
        "& .MuiPaginationItem-root": {
          color: "white",
          border: "1px solid #b102cd",
          "&.Mui-selected": {
            pointerEvents: "none",
          },
        },
        "& .MuiPaginationItem-ellipsis": { border: "none" },
        "& .Mui-selected": {
          backgroundColor: "#b102cd",
          color: "white",
        },
      }}
    />
  );
}
