"use client";
import { useState } from "react";
import { searchCoins } from "@/api";
import Link from "next/link";

export default function Search() {
  const [coinsFound, setCoinsFound] = useState([]);

  const inputChangehandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = await searchCoins(e.target.value);
    setCoinsFound(data);
  };

  return (
    <div className="w-[350px] relative">
      <input type="text" className=" w-full text-slate-950 px-3 py-2 rounded-lg bg-slate-200" onChange={inputChangehandler} />
      <ul className="absolute w-full h-full top-[40px] left-0">
        {coinsFound.map((item: { id: string; name: string }) => (
          <li key={item.id}>
            <Link href={`/currencies/${item.id}`}> {item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
