"use client";
import { useState, useEffect } from "react";
import { getCoinPrice } from "@/app/actions";
import { CoinsAutocomplete } from ".";

export default function ExchangeForm() {
  const [fromCurrency, setFromCurrency] = useState<string | null>(null);
  const [toCurrency, setToCurrency] = useState<string | null>(null);
  const [fromAmount, setFromAmount] = useState<number | null>(null);
  const [toAmount, setToAmount] = useState<number | null>(null);

  const [coefficient, setCoefficient] = useState<number | null>(null);

  const fromCoinHandler = (value: string | null) => {
    setFromCurrency(value);
  };
  const toCoinHandler = (value: string | null) => {
    setToCurrency(value);
  };

  useEffect(() => {
    (async () => {
      if (fromCurrency && toCurrency) {
        const res = await getCoinPrice(fromCurrency, toCurrency);

        const coefficient = res.data[fromCurrency][0].quote[toCurrency]
          .price as number;

        setCoefficient(coefficient);

        if (!fromAmount && !toAmount) {
          setFromAmount(1);
          setToAmount(coefficient);
        }
      } else {
        setCoefficient(null);
        setFromAmount(null);
        setToAmount(null);
      }
    })();
  }, [fromCurrency, toCurrency]);

  return (
    <form>
      <label>
        Sell
        <input
          value={fromAmount || ""}
          type="number"
          min="0"
          onKeyDown={(e) =>
            ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value !== "" && coefficient) {
              setFromAmount(Number(Number(e.target.value).toFixed(4)));
              setToAmount(
                Number((Number(e.target.value) * coefficient).toFixed(4))
              );
            } else {
              setFromAmount(null);
              setToAmount(null);
            }
          }}
        />
      </label>

      <label>
        Buy
        <input
          value={toAmount || ""}
          type="number"
          min="0"
          onKeyDown={(e) =>
            ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value !== "" && coefficient) {
              setToAmount(Number(Number(e.target.value).toFixed(4)));
              setFromAmount(
                Number((Number(e.target.value) / coefficient).toFixed(4))
              );
            } else {
              setToAmount(null);
              setFromAmount(null);
            }
          }}
        />
      </label>

      <CoinsAutocomplete selectCoinHandler={fromCoinHandler} label="Sell" />

      <CoinsAutocomplete selectCoinHandler={toCoinHandler} label="Buy" />

      <p>Sell: {fromCurrency}</p>
      <p>Buy: {toCurrency}</p>
      <p>Sell amount: {fromAmount}</p>
      <p>Buy amount: {toAmount}</p>
      <p>Coeffivient: {coefficient}</p>
    </form>
  );
}
