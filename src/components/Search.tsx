"use client";
import { useState } from "react";
import { searchCoins } from "@/api";
import Link from "next/link";
import { useRef, useEffect } from "react";
import Image from "next/image";
import searchIcon from "@/assets/search.svg";
import { useDebounce } from "usehooks-ts";

export default function Search() {
  const [coinsFound, setCoinsFound] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce<string>(query, 500);

  const inputChangehandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (!e.target.value) {
      setIsOpen(false);
    }
  };

  const ref = useRef<Element | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#mobile-menu-root");
  }, []);

  useEffect(() => {
    (async () => {
      if (debouncedQuery) {
        const data = await searchCoins(debouncedQuery);
        setCoinsFound(data);
        setIsOpen(true);
      }
    })();
  }, [debouncedQuery]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("click", onClick);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <div className="w-[350px] relative" ref={containerRef}>
      <Image
        src={searchIcon}
        alt="Search icon"
        width={20}
        height={20}
        className="absolute left-[10px] top-1/2 -translate-y-1/2 pointer-events-none"
      />

      <input
        type="text"
        className=" w-full text-slate-950 pl-[35px] pr-3 py-2 rounded-lg bg-slate-200"
        onChange={inputChangehandler}
      />
      {isOpen && (
        <ul className="absolute w-full  top-[40px] left-0 bg-slate-800 z-50 py-2 max-h-[400px] overflow-y-auto">
          {coinsFound.map(
            (item: {
              id: string;
              name: string;
              symbol: string;
              market_cap_rank: number;
            }) => (
              <li key={item.id}>
                <Link
                  href={`/coins/${item.id}`}
                  className="flex justify-between p-2 transition-colors duration-150 ease-linear  hover:bg-accent">
                  <div className="flex justify-between w-full">
                    <p className="max-w-[80%] truncate">
                      {item.name} {item.symbol}
                    </p>
                    <p>#{item.market_cap_rank}</p>
                  </div>
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
