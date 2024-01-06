"use client";
import Link from "next/link";
import { pages } from "@/constants";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function NavList() {
  const pathname = usePathname();

  return (
    <ul className=" mt-10 flex flex-col gap-4">
      {pages.map((page) => (
        <li key={page[0]}>
          <Link
            className={`text-lg flex gap-5 py-4 px-6 max-w-80 items-center rounded-2xl  ${
              pathname === page[1] ? "bg-accent-gradient" : ""
            } bg-lime-400 hover:bg-accent-gradient `}
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
