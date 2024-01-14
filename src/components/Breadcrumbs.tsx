"use client";

import { usePathname, useRouter } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const { replace } = useRouter();

  console.log(pathname.split("/"));
  return <></>;
}
