"use client";
import { useState, useEffect } from "react";
import { createTransaction, getCoinPrice } from "@/app/actions";
import { CoinsAutocomplete } from ".";
import { IPortfolio } from "@/interfaces";
import { ImageComponent } from "@/UI";
import { TextField } from "@mui/material";
import Slider from "@mui/material/Slider";

interface ICoin {
  name: string;
  symbol: string;
  large: string;
  market_cap_rank: number;
}

export default function ExchangeForm({
  userPortfolio,
  updatePortfolioHandler,
  modalCloseHandler,
}: {
  userPortfolio: IPortfolio;
  updatePortfolioHandler: () => void;
  modalCloseHandler: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [fromCurrency, setFromCurrency] = useState<ICoin | null>(null);
  const [toCurrency, setToCurrency] = useState<ICoin | null>(null);
  const [fromAmount, setFromAmount] = useState<number | null>(null);
  const [toAmount, setToAmount] = useState<number | null>(null);
  const [coefficient, setCoefficient] = useState<number | null>(null);

  console.log("rerender");

  const getPortfolioCoinAmount = (coin: ICoin | null): number => {
    if (coin) {
      return (
        userPortfolio.coins.find((item) => item.symbol === coin.symbol)
          ?.amount || 0
      );
    }
    return 0;
  };

  const isDataValid = () => {
    if (!fromCurrency || !toCurrency || !fromAmount || !toAmount) {
      return false;
    }
    const areCurrenciesDifferent = fromCurrency.symbol !== toCurrency.symbol;

    const isFromCurrencyinPortfolio = userPortfolio?.coins?.find(
      (item) => item.symbol === fromCurrency.symbol
    )?.amount;

    return areCurrenciesDifferent && isFromCurrencyinPortfolio;
  };

  const fromCoinHandler = (value: ICoin | null) => {
    setFromCurrency(value);
  };
  const toCoinHandler = (value: ICoin | null) => {
    setToCurrency(value);
  };

  const sliderHandler = (_: Event, newValue: number | number[]) => {
    setFromAmount(
      Math.min(
        Number(getPortfolioCoinAmount(fromCurrency).toFixed(4)),
        Number((newValue as number).toFixed(4))
      )
    );
    if (coefficient && newValue) {
      setToAmount(
        Math.min(
          Number(
            (getPortfolioCoinAmount(fromCurrency) * coefficient).toFixed(4)
          ),
          Number((coefficient * (newValue as number)).toFixed(4))
        )
      );
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

        if (fromAmount && toAmount) {
          setToAmount(
            Number((coefficient * (fromAmount as number)).toFixed(4))
          );
        }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency, toCurrency]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ fromCurrency, toCurrency, fromAmount, toAmount });
    const formData = new FormData();
    console.log({ fromCurrency, toCurrency, fromAmount, toAmount });

    if (fromCurrency && toCurrency && fromAmount && toAmount) {
      formData.append("type", "exchange");
      formData.append("fromItem", fromCurrency?.symbol);
      formData.append("toItem", toCurrency?.symbol);
      formData.append("fromAmount", fromAmount.toString());
      formData.append("toAmount", toAmount.toString());
    }

    ////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    await createTransaction(formData);
    updatePortfolioHandler();
    modalCloseHandler();
  };

  return (
    <form className=" p-10 " onSubmit={submitHandler}>
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
                ? userPortfolio?.coins
                    ?.find((item) => item.symbol === fromCurrency.symbol)
                    ?.amount.toFixed(4) || 0
                : "--"}
            </p>
          </div>
        </div>
        <div className="w-full">
          <label className="flex flex-col ">
            <span className="mb-2 "> Give</span>

            <TextField
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
                  setFromAmount(
                    Math.min(
                      Number(Number(e.target.value).toFixed(4)),
                      Number(getPortfolioCoinAmount(fromCurrency).toFixed(4))
                    )
                  );
                  setToAmount(
                    Number(
                      Math.min(
                        Number(
                          (Number(e.target.value) * coefficient).toFixed(4)
                        ),
                        Number(
                          (
                            getPortfolioCoinAmount(fromCurrency) * coefficient
                          ).toFixed(4)
                        )
                      )
                    )
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
                ? userPortfolio?.coins
                    ?.find((item) => item.symbol === toCurrency.symbol)
                    ?.amount.toFixed(4) || 0
                : "--"}
            </p>
          </div>
        </div>
        <div className="w-full">
          <label className="flex flex-col w-full">
            <span className="mb-2"> Recieve</span>
            <TextField
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
                  setToAmount(
                    Math.min(
                      Number(
                        (
                          getPortfolioCoinAmount(fromCurrency) * coefficient
                        ).toFixed(4)
                      ),
                      Number(Number(e.target.value).toFixed(4))
                    )
                  );
                  setFromAmount(
                    Math.min(
                      Number(getPortfolioCoinAmount(fromCurrency)?.toFixed(4)),
                      Number((Number(e.target.value) / coefficient).toFixed(4))
                    )
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
        className={` ${isLoading ? "loading  blocked" : ""} ${
          isDataValid() ? "" : "disabled"
        } relative z-10 block text-base w-fit min-w-32 bg-auth-accent-gradient  rounded-[10px] before:rounded-[10px] py-[17px] px-[18px] leading-none  mx-auto before:content-[''] before:absolute before:left-0  before:top-0  before:transition-opacity before:duration-300 before:ease-linear before:w-full  before:h-full before:-z-10 before:bg-accent-gradient before:opacity-0 before:bg-cover before:animate-hue-rotate hover:before:opacity-100`}>
        {" "}
        Exchange
      </button>
    </form>
  );
}