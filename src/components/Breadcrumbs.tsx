"use client";

import { useBreadcrumbs } from "@/hooks";
import Link from "next/link";
import Image from "next/image";
import chevronRightIcon from "./../assets/chevron-right.svg";

export default function Breadcrumbs() {
  const breadcrumbsData = useBreadcrumbs();

  return (
    <ul className="flex gap-2">
      {breadcrumbsData.map((item, i, arr) => (
        <li className="flex gap-2" key={item.page}>
          {i ? (
            <Image src={chevronRightIcon} alt="chevron" width={15} height={15}/>
    
 
          ) : null}
          <Link
            href={item.pathname}
            className={` capitalize ${
              i === arr.length - 1
                ? "text-slate-500 pointer-events-none"
                : "text-purple-700"
            }`}>
            {item.page}
          </Link>
        </li>
      ))}
    </ul>
  );
}
