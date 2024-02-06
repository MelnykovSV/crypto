"use client";

import {
  getUserPortfolio,
  createTransaction,
  getUserTransactions,
} from "@/app/actions";
import { useState, useEffect } from "react";
import { getErrorMessage } from "@/app/lib";

const mockPriceList = [
  { id: "bitcoin", current_price: 40000 },
  { id: "litecoin", current_price: 100 },
  { id: "ethereum", current_price: 2300 },
  { id: "dogecoin", current_price: 0.08 },
  { id: "binancecoin", current_price: 300 },
  { id: "ripple", current_price: 0.5 },
  { id: "cardano", current_price: 0.6 },
];

const mockPortfolio = {
  coins: [
    { coinId: "bitcoin" },
    { coinId: "litecoin" },
    { coinId: "ethereum" },
    { coinId: "cardano" },
  ],
};

function createPriceList(coinsData: any, portfolio: any, ...args: string[]) {
  const coinsList = Array.from(
    new Set([...portfolio.coins.map((item: any) => item.coinId), ...args])
  );

  console.log("coinsList", coinsList);

  return coinsData.reduce(
    (acc: any, item: any) =>
      coinsList.includes(item.id)
        ? { ...acc, [item.id]: item.current_price }
        : acc,
    {}
  );
}

export default function TestForm() {
  // const updateUserWithId = createTransaction.bind(null, totalPortfolioPrice)
  const [state, setState] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const res = (await getUserPortfolio()) as string;
        setState(res);
      } catch (error) {
        const message = getErrorMessage(error);
        console.error("Error fetching data:", message);
      }
    })();
  });

  return (
    <form action={getUserPortfolio}>
      <button type="submit">SUBMIT</button>

      <p>{state}</p>
      <button
        type="button"
        onClick={async () => {
          const formData = new FormData();

          const body = {
            referenceCurrency: "usd",
            type: "buy",
            fromItem: "usd",
            fromAmount: 60000,
            // fromPricePerItem: 1,
            toItem: "bitcoin",
            toAmount: 2,
            // toPricePerItem: 30000,
          };

          for (var key in body) {
            formData.append(key, body[key]);
          }

          const priceList = createPriceList(
            mockPriceList,
            mockPortfolio,
            "bitcoin"
          );

          const res = await createTransaction(formData, priceList);
          console.log(res);
        }}>
        BUY
      </button>
      <button
        type="button"
        onClick={async () => {
          const formData = new FormData();
          const body = {
            referenceCurrency: "usd",
            type: "sell",
            fromItem: "bitcoin",
            fromAmount: 1,
            // fromPricePerItem: 30000,
            toItem: "usd",
            toAmount: 60000,
            // toPricePerItem: 1,
          };

          for (var key in body) {
            formData.append(key, body[key]);
          }

          const priceList = createPriceList(
            mockPriceList,
            mockPortfolio,
            "bitcoin"
          );

          const res = await createTransaction(formData, priceList);
          console.log(res);
        }}>
        SELL
      </button>
      <button
        type="button"
        onClick={async () => {
          const formData = new FormData();
          const body = {
            referenceCurrency: "usd",
            type: "exchange",
            fromItem: "bitcoin",
            fromAmount: 1,
            // fromPricePerItem: 30000,
            toItem: "ethereum",
            toAmount: 15,
            // toPricePerItem: 2000,
          };

          for (var key in body) {
            formData.append(key, body[key]);
          }

          const priceList = createPriceList(
            mockPriceList,
            mockPortfolio,
            "bitcoin",
            "ethereum"
          );

          const res = await createTransaction(formData, priceList);
          console.log(res);
        }}>
        EXCHANGE
      </button>
      <button type="button">GET TRANSACTIONS</button>
    </form>
  );
}
