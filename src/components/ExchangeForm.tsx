"use client";
import { useState, useEffect } from "react";
import { getCoinPrice } from "@/app/actions";
import { CoinsAutocomplete } from ".";
import { IPortfolio } from "@/interfaces";
import { ImageComponent } from "@/UI";
import { InputAdornment, TextField } from "@mui/material";
import Slider from "@mui/material/Slider";

const MAX = 100;
const MIN = 0;
const marks = [
  {
    value: MIN,
    label: "",
  },
  {
    value: MAX,
    label: "",
  },
];

interface ICoin {
  name: string;
  symbol: string;
  large: string;
  market_cap_rank: number;
}

export default function ExchangeForm({
  userPortfolio,
}: {
  userPortfolio: IPortfolio;
}) {
  console.log(userPortfolio);
  const [isLoading, setIsLoading] = useState(false);
  const [fromCurrency, setFromCurrency] = useState<ICoin | null>(null);
  const [toCurrency, setToCurrency] = useState<ICoin | null>(null);
  const [fromAmount, setFromAmount] = useState<number | null>(null);
  const [toAmount, setToAmount] = useState<number | null>(null);
  const [coefficient, setCoefficient] = useState<number | null>(null);

  const fromCoinHandler = (value: ICoin | null) => {
    setFromCurrency(value);
  };
  const toCoinHandler = (value: ICoin | null) => {
    setToCurrency(value);
  };

  const sliderHandler = (_: Event, newValue: number | number[]) => {
    setFromAmount(newValue as number);
    if (coefficient && newValue) {
      setToAmount(Number((coefficient * (newValue as number)).toFixed(4)));
    } else if (newValue === 0) {
      setToAmount(0);
    } else if (newValue === null) {
      setToAmount(null);
    }
  };

  useEffect(() => {
    (async () => {
      if (fromCurrency && toCurrency) {
        const res = await getCoinPrice(fromCurrency.symbol, toCurrency.symbol);

        const coefficient = res.data[fromCurrency.symbol][0].quote[
          toCurrency.symbol
        ].price as number;

        setCoefficient(coefficient);

        if (!fromAmount && !toAmount) {
          setFromAmount(0);
          setToAmount(0);
        }
      } else {
        setCoefficient(null);
        setFromAmount(null);
        setToAmount(null);
      }
    })();
  }, [fromCurrency, toCurrency]);

  // useEffect(() => {
  //   if (coefficient && fromAmount) {
  //     setToAmount(Number((coefficient * fromAmount).toFixed(4)));
  //   } else if (fromAmount === 0) {
  //     setToAmount(0);
  //   } else if (fromAmount === null) {
  //     setToAmount(null);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [fromAmount]);

  return (
    <form className=" p-10 ">
      <div className="flex gap-20 py-2 justify-between w-full">
        <div className="flex items-center gap-2 w-full">
          <div className="  h-[50px] w-[50px]">
            {!!fromCurrency && (
              <ImageComponent
                src={fromCurrency.large}
                alt={`${fromCurrency.name} icon`}
                width={50}
                height={50}
              />
            )}
          </div>
          <div className="w-full">
            <p className=" mb-2 h-[24px] ">
              {!!fromCurrency && fromCurrency.symbol}
            </p>
            <CoinsAutocomplete selectCoinHandler={fromCoinHandler} label="" />
            <p className=" mt-2">
              Balance:{" "}
              {!!fromCurrency && !!userPortfolio
                ? userPortfolio?.coins?.find(
                    (item) => item.symbol === fromCurrency.symbol
                  )?.amount || 0
                : "--"}
            </p>
          </div>
        </div>
        <div className="w-full">
          <label className="flex flex-col ">
            <span className="mb-2 "> Give</span>

            <TextField
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">$</InputAdornment>
              //   ),
              // }}
              disabled={
                !fromCurrency ||
                !toCurrency ||
                !userPortfolio?.coins?.find(
                  (item) => item.symbol === fromCurrency.symbol
                )?.amount
              }
              sx={{
                overflow: "hidden",
                borderRadius: "10px",
                backgroundColor: "#2B2C3B",

                color: "#fff",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "10px",
                },
                "& .MuiTypography-root": {
                  color: "#fff",
                },
                "& .MuiInputBase-input": {
                  color: "#fff",
                  paddingLeft: "30px",
                },
              }}
              className="number-input h-[56px]  text-red-500"
              value={
                fromAmount === null || fromAmount === undefined
                  ? ""
                  : fromAmount
              }
              type="number"
              onKeyDown={(e) =>
                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log(e.target.value);
                if (e.target.value !== "" && coefficient) {
                  setFromAmount(Number(Number(e.target.value).toFixed(4)));
                  setToAmount(
                    Number((Number(e.target.value) * coefficient).toFixed(4))
                  );
                } else if (e.target.value === "0") {
                  setFromAmount(0);
                  setToAmount(0);
                } else {
                  setFromAmount(null);
                  setToAmount(null);
                }
              }}
            />
          </label>
        </div>
      </div>
      <Slider
        step={0.0001}
        value={fromAmount || 0}
        valueLabelDisplay="auto"
        min={0}
        disabled={
          !fromCurrency ||
          !toCurrency ||
          !userPortfolio?.coins?.find(
            (item) => item.symbol === fromCurrency.symbol
          )?.amount
        }
        max={
          !!fromCurrency && !!userPortfolio
            ? userPortfolio?.coins?.find(
                (item) => item.symbol === fromCurrency.symbol
              )?.amount || 0
            : 0
        }
        onChange={sliderHandler}
      />
      <div className="flex gap-20 py-2 justify-between w-full">
        <div className="flex items-center gap-2 w-full">
          <div className="  h-[50px] w-[50px]">
            {" "}
            {!!toCurrency && (
              <ImageComponent
                src={toCurrency.large}
                alt={`${toCurrency.name} icon`}
                width={50}
                height={50}
              />
            )}
          </div>
          <div className="w-full">
            <p className=" mb-2 h-[24px] w-full">
              {!!toCurrency && toCurrency.symbol}
            </p>
            <CoinsAutocomplete selectCoinHandler={toCoinHandler} label="" />
            <p className=" mt-2">
              Balance:{" "}
              {!!toCurrency && !!userPortfolio
                ? userPortfolio?.coins?.find(
                    (item) => item.symbol === toCurrency.symbol
                  )?.amount || 0
                : "--"}
            </p>
          </div>
        </div>
        <div className="w-full">
          <label className="flex flex-col w-full">
            <span className="mb-2"> Recieve</span>
            <TextField
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">$</InputAdornment>
              //   ),
              // }}
              disabled={
                !fromCurrency ||
                !toCurrency ||
                !userPortfolio?.coins?.find(
                  (item) => item.symbol === fromCurrency.symbol
                )?.amount
              }
              sx={{
                overflow: "hidden",
                borderRadius: "10px",
                backgroundColor: "#2B2C3B",

                color: "#fff",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "10px",
                },
                "& .MuiTypography-root": {
                  color: "#fff",
                },
                "& .MuiInputBase-input": {
                  paddingLeft: "30px",
                  color: "#fff",
                },
              }}
              className="number-input h-[56px]  text-red-500"
              value={
                toAmount === null || toAmount === undefined ? "" : toAmount
              }
              type="number"
              onKeyDown={(e) =>
                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.value !== "" && coefficient) {
                  setToAmount(Number(Number(e.target.value).toFixed(4)));
                  setFromAmount(
                    Number((Number(e.target.value) / coefficient).toFixed(4))
                  );
                } else if (e.target.value === "0") {
                  setFromAmount(0);
                  setToAmount(0);
                } else {
                  setToAmount(null);
                  setFromAmount(null);
                }
              }}
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className={`${
          isLoading && "loading  blocked"
        }  relative z-10 block text-base w-fit min-w-32 bg-auth-accent-gradient  rounded-[10px] before:rounded-[10px] py-[17px] px-[18px] leading-none  mx-auto before:content-[''] before:absolute before:left-0  before:top-0  before:transition-opacity before:duration-300 before:ease-linear before:w-full  before:h-full before:-z-10 before:bg-accent-gradient before:opacity-0 before:bg-cover before:animate-hue-rotate hover:before:opacity-100`}>
        {" "}
        Exchange
      </button>

      {/* <p>
        Sell:{" "}
        {fromCurrency
          ? `${fromCurrency.name}--${fromCurrency.symbol}--${fromCurrency.large}`
          : ""}
      </p>
      <p>
        Buy:{" "}
        {toCurrency
          ? `${toCurrency.name}--${toCurrency.symbol}--${toCurrency.large}`
          : ""}
      </p>
      <p>Sell amount: {fromAmount}</p>
      <p>Buy amount: {toAmount}</p>
      <p>Coeffivient: {coefficient}</p> */}
    </form>
  );
}
