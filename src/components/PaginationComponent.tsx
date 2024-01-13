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
    <>
      <Pagination
        count={totalPages}
        page={Number(searchParams.get("page"))}
        onChange={paginationHandler}
        color="primary"
      />
    </>
  );
}
