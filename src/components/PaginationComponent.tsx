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
  const { replace } = useRouter();

  const paginationHandler = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      count={totalPages}
      page={Number(searchParams.get("page"))}
      onChange={paginationHandler}
      color="secondary"
      shape="rounded"
      className=" justify-center"
      sx={{
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
          backgroundColor: "red",
          color: "white",
        },
      }}
    />
  );
}
