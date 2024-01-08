"use client";
import Link from "next/link";
import { pages } from "@/constants";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function NavList() {
  const pathname = usePathname();

  return (
    <ul className={twMerge("mt-10 flex flex-col gap-4")}>
      {pages.map((page) => (
        <li key={page[0]}>
          <Link
            className={`text-lg flex gap-5 py-4 px-6 max-w-80 items-center rounded-2xl  ${
              pathname === page[1]
                ? " before:opacity-100 pointer-events-none"
                : ""
            } relative z-10 overflow-hidden before:content-[''] before:absolute before:left-0  before:top-0  before:transition-opacity before:duration-300 before:ease-linear before:w-full  before:h-full before:-z-10 before:bg-accent-gradient before:opacity-0 before:bg-cover before:animate-hue-rotate hover:before:opacity-100  `}
            href={page[1]}>
            <Image
              src={page[2]}
              alt={`${page[0]} icon`}
              width={30}
              height={30}
              className="block"
            />
            <p> {page[0]}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
