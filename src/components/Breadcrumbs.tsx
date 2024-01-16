"use client";

import { useBreadcrumbs } from "@/hooks";
import Link from "next/link";
import Image from "next/image";
import chevronRightIcon from "./../assets/chevron-right.svg";
import React from "react";

export default function Breadcrumbs() {
  const breadcrumbsData = useBreadcrumbs();

  return (
    <ul className="flex flex-wrap gap-2 items-center justify-start">
      {breadcrumbsData.map((item, i, arr) => (
        <React.Fragment key={item.page}>
          {i ? (
            <li>
              <Image
                src={chevronRightIcon}
                alt="chevron"
                width={15}
                height={15}
              />
            </li>
          ) : null}

          <li
            className={`max-w-[min(100%,350px)] truncate ${
              i === arr.length - 1
                ? "text-slate-500 pointer-events-none"
                : "text-purple-700"
            }`}>
            <Link href={item.pathname} className="capitalize whitespace-nowrap">
              {item.page}
            </Link>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
}
