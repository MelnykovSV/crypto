"use client";
import { useState, useEffect, useRef } from "react";
import { getCoinPrice } from "@/app/actions";
import { CoinsAutocomplete } from ".";
import { IPortfolio } from "@/interfaces";
import { ImageComponent } from "@/UI";
import { InputAdornment, TextField } from "@mui/material";
import { createTransaction } from "@/app/actions";
import { ICoin, ITransactionData } from "@/interfaces";
import { toast } from "react-toastify";

export default function BuyForm({
  userPortfolio,
  updatePortfolioHandler,
  modalCloseHandler,
  modalLoadingHandler,
}: {
  userPortfolio: IPortfolio;
  updatePortfolioHandler: () => void;
  modalCloseHandler: () => void;
  modalLoadingHandler: (value: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [toCurrency, setToCurrency] = useState<ICoin | null>(null);
  const [fromAmount, setFromAmount] = useState<number | null>(null);
  const [toAmount, setToAmount] = useState<number | null>(null);
  const [toItemCoinMarketCapId, setToItemCoinMarketCapId] = useState<
    string | null
  >("none");
  const [coefficient, setCoefficient] = useState<number | null>(null);
  const firstUpdate = useRef(true);

  const isDataValid = () => {
    if (!toCurrency || !fromAmount || !toAmount) {
      return false;
    }

    return true;
  };

  const toCoinHandler = (value: ICoin|null) => {
    setToCurrency(value);
  };

  useEffect(() => {
    (async () => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      if (toCurrency) {
        const res = await getCoinPrice(toCurrency);

        if (res instanceof Object && "error" in res) {
          toast.error(res.error);
          return;
        }

        const { coefficient, toCurrencyCoinMarketCapId } = res;


        setCoefficient(coefficient);
        setToItemCoinMarketCapId(toCurrencyCoinMarketCapId.toString());

        if (fromAmount && toAmount) {
          setFromAmount(
            Number((coefficient * (toAmount as number)).toFixed(4))
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
  }, [toCurrency]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toCurrency) {
      return;
    }
    setIsLoading(true);
    modalLoadingHandler(true);

    const transactionData = {
      type: "buy",
      fromItemName: "dollar",
      fromItemSymbol: "USD",
      fromItemLogo: "none",
      fromItemCoinGeckoId: "none",
      fromItemCoinMarketCapId: "none",
      fromAmount,
      toItemName: toCurrency.name,
      toItemSymbol: toCurrency.symbol,
      toItemLogo: toCurrency.logo,
      toItemCoinGeckoId: toCurrency.coinGeckoId,
      toItemCoinMarketCapId,
      toAmount,
    } as ITransactionData;

    await createTransaction(transactionData);
    setIsLoading(false);
    modalLoadingHandler(false);
    updatePortfolioHandler();
    modalCloseHandler();
  };

  return (
    <form className=" p-10 " onSubmit={submitHandler}>
      <div className="flex gap-20 py-2 justify-between w-full">
        <div className="flex items-center gap-2 w-full">
          <div className="  h-[50px] w-[50px]"></div>
          <div className="w-full"></div>
        </div>
        <div className="w-full">
          <label className="flex flex-col ">
            <span className="mb-2 "> Give</span>

            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              disabled={!toCurrency}
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
                if (e.target.value !== "" && coefficient) {
                  setFromAmount(Number(Number(e.target.value).toFixed(4)));
                  setToAmount(
                    Number((Number(e.target.value) / coefficient).toFixed(4))
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

      <div className="flex gap-20 py-2 justify-between w-full">
        <div className="flex items-center gap-2 w-full">
          <div className="  h-[50px] w-[50px]">
            {!!toCurrency && (
              <ImageComponent
                src={toCurrency.logo}
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
              disabled={!toCurrency}
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
                    Number((Number(e.target.value) * coefficient).toFixed(4))
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
        Exchange
      </button>
    </form>
  );
}
