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
    <>
      <input type="text" onChange={inputChangehandler} />
      <ul>
        {coinsFound.map((item: {id:string, name:string}) => (
          <li key={item.id}>
            <Link href={`/currencies/${item.id}`}> {item.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
