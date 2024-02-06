"use server";

import { Portfolio, User, Transaction } from "@/models";
import { getServerSession } from "next-auth";
import { authOptions } from "../../options";
import { CustomSession } from "@/interfaces";
import { NextResponse } from "next/server";
import { getErrorMessage } from "./lib";
import { validate } from "@/validation/validation";
import { newTransactionFormValidation } from "@/validation/newTransactionValidation";

const { coinMarketCupKey } = process.env;

export async function testAction() {
  const response = await Portfolio.create({
    owner: "65b3a4c3eb82feb0ff0c33a7",
  });
}

interface IPortfolio {
  coins: IPortfolioCoin[];
  totalInvested: number;
  totalWithdrawn: number;
  historyData: IHistoryPoint[];
}

interface IPortfolioCoin {
  coinId: string;

  amount: number;
}
interface IHistoryPoint {
  totalPortfolioPrice: number;
  totalInvested: number;
  totalWithdrawn: number;
}

interface ITransaction {
  type: "sell" | "buy" | "exchange";
  fromItem: string;
  fromAmount: number;
  fromPricePerItem: number;
  toItem: string;
  toAmount: number;
  toPricePerItem: number;
}

function calculateTotalPortfolioPrice(
  priceList: Record<string, number>,
  coins: IPortfolioCoin[]
) {
  console.log("priceList", priceList);
  return coins.reduce((acc, item) => {
    console.log("calculations");
    console.log(acc);
    console.log(item);
    console.log(priceList[item.coinId]);
    return acc + item.amount * priceList[item.coinId];
  }, 0);
}

function processTransaction(
  { coins, totalInvested, totalWithdrawn, historyData }: IPortfolio,
  {
    type,
    fromItem,
    fromAmount,
    fromPricePerItem,
    toItem,
    toAmount,
    toPricePerItem,
  }: ITransaction,
  priceList: Record<string, number>
) {
  switch (type) {
    case "sell":
      if (!coins.find((coin) => coin.coinId === fromItem)) {
        throw new Error("Not enough coins for this transaction");
      }
      const updatedCoins = coins.map((coin) => {
        if (coin.coinId === fromItem) {
          if (coin.amount < fromAmount) {
            throw new Error("Not enough coins for this transaction");
          }
          return { coinId: coin.coinId, amount: coin.amount - fromAmount };
        } else {
          return coin;
        }
      });

      /// Костыль, потом убрать
      const filteredCoins = updatedCoins.filter((coin) => coin.amount !== 0);
      const updatedTotalWithdrawn =
        totalWithdrawn + fromPricePerItem * fromAmount;

      const updatedHistoryData = [
        ...historyData,
        {
          totalInvested,
          totalWithdrawn: updatedTotalWithdrawn,
          totalPortfolioPrice: calculateTotalPortfolioPrice(
            priceList,
            filteredCoins
          ),
        },
      ];

      return {
        coins: filteredCoins,
        totalWithdrawn: updatedTotalWithdrawn,
        totalInvested,
        historyData: updatedHistoryData,
      };

    case "buy":
      if (coins.find((coin) => coin.coinId === toItem)) {
        const updatedCoins = coins.map((coin) => {
          if (coin.coinId === toItem) {
            ///разобраться, почему не работает деструктуризация
            return {
              coinId: coin.coinId,
              amount: coin.amount + toAmount,
            };
          } else {
            return coin;
          }
        });

        console.log("updatedCoins", updatedCoins);

        return {
          coins: updatedCoins,
          totalInvested: totalInvested + toPricePerItem * toAmount,
          totalWithdrawn,
          historyData: [
            ...historyData,
            {
              totalInvested: totalInvested + toPricePerItem * toAmount,
              totalWithdrawn,
              totalPortfolioPrice: calculateTotalPortfolioPrice(
                priceList,
                updatedCoins
              ),
            },
          ],
        };
      } else {
        const updatedCoins = [...coins, { coinId: toItem, amount: toAmount }];
        return {
          coins: updatedCoins,
          totalInvested: totalInvested + toPricePerItem * toAmount,
          totalWithdrawn,
          historyData: [
            ...historyData,
            {
              totalInvested: totalInvested + toPricePerItem * toAmount,
              totalWithdrawn,
              totalPortfolioPrice: calculateTotalPortfolioPrice(
                priceList,
                updatedCoins
              ),
            },
          ],
        };
      }

    case "exchange":
      if (!coins.find((coin) => coin.coinId === fromItem)) {
        throw new Error("Not enough coins for this transaction");
      }
      // console.log("coins", coins);
      const updatedCoinsFromPart = coins.map((coin) => {
        if (coin.coinId === fromItem) {
          if (coin.amount < fromAmount) {
            throw new Error("Not enough coins for this transaction");
          }
          // console.log("Amount");
          // console.log(coin.amount);
          // console.log(fromAmount);
          return { coinId: coin.coinId, amount: coin.amount - fromAmount };
        } else {
          return coin;
        }
      });

      // console.log("updatedCoinsFromPart", updatedCoinsFromPart);

      /// Костыль, потом убрать
      const filteredCoinsFromPart = updatedCoinsFromPart.filter(
        (coin) => coin.amount !== 0
      );

      if (filteredCoinsFromPart.find((coin) => coin.coinId === toItem)) {
        const updatedCoinsToPart = filteredCoinsFromPart.map((coin) => {
          if (coin.coinId === toItem) {
            return { coinId: coin.coinId, amount: coin.amount + toAmount };
          } else {
            return coin;
          }
        });

        return {
          coins: updatedCoinsToPart,
          totalInvested,
          totalWithdrawn,
          historyData: [
            ...historyData,
            {
              totalInvested,
              totalWithdrawn,
              totalPortfolioPrice: calculateTotalPortfolioPrice(
                priceList,
                updatedCoinsToPart
              ),
            },
          ],
        };
      } else {
        const updatedCoinsToPart = [
          ...filteredCoinsFromPart,
          { coinId: toItem, amount: toAmount },
        ];
        return {
          coins: updatedCoinsToPart,
          totalInvested,
          totalWithdrawn,
          historyData: [
            ...historyData,
            {
              totalInvested,
              totalWithdrawn,
              totalPortfolioPrice: calculateTotalPortfolioPrice(
                priceList,
                updatedCoinsToPart
              ),
            },
          ],
        };
      }
  }
}

async function authenticate() {
  const session = (await getServerSession(authOptions)) as CustomSession;

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "Not authenticated",
      },
      {
        status: 401,
      }
    );
  }

  const user = await User.findById(session.user.id);

  console.log("user", user);
  if (!user) {
    return NextResponse.json(
      {
        message: "Not authenticated",
      },
      {
        status: 401,
      }
    );
  }

  return user;
}

export async function getUserPortfolio() {
  try {
    const user = await authenticate();

    const portfolio = await Portfolio.findOne({ owner: user._id });

    if (!portfolio) {
      const portfolio = await Portfolio.create({ owner: user._id });
      console.log("New portfolio", portfolio);
      return JSON.stringify(portfolio);
    }
    console.log("Portfolio", JSON.stringify(portfolio));
    return JSON.stringify(portfolio);
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function createTransaction(
  formData: FormData,
  priceList: Record<string, number>
) {
  try {
    const user = await authenticate();

    const rawFormData = Object.fromEntries(formData.entries()) as Record<
      string,
      string | number
    >;

    // console.log(rawFormData.fromItem)

    const updatedRawFormData = {
      ...rawFormData,
      fromPricePerItem:
        rawFormData.fromItem === "usd" ? 1 : priceList[rawFormData.fromItem],
      toPricePerItem:
        rawFormData.toItem === "usd" ? 1 : priceList[rawFormData.toItem],
    };

    const errors = await validate(
      newTransactionFormValidation,
      updatedRawFormData
    );

    if (errors) {
      return JSON.stringify({ errors: errors || "unknown validation error" });
    }

    const newTransaction = await Transaction.create({
      ...updatedRawFormData,
      owner: user._id,
    });
    const portfolio = await Portfolio.findOne({ owner: user._id });

    if (!portfolio) {
      throw new Error("No portfolio");
    }

    const processedPortfolio = processTransaction(
      portfolio,
      newTransaction,
      priceList
    );

    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { owner: user._id },
      processedPortfolio,
      {
        new: true,
      }
    );
    await Transaction.findByIdAndUpdate(newTransaction._id, {
      isSuccessful: true,
    });

    // console.log("Portfolio", JSON.stringify(portfolio));
    return JSON.stringify(updatedPortfolio);
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function getUserTransactions(formData: FormData) {
  try {
    const user = await authenticate();

    const userTransactions = await Transaction.find({ owner: user._id });

    return JSON.stringify(userTransactions);
  } catch (error) {
    return getErrorMessage(error);
  }
}




export async function getCoinPrice(symbol: string,
  convert: string | undefined) {
  try {
    const res = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${symbol}${
        convert ? `&convert=${convert}` : ""
      }`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": coinMarketCupKey!,
        },
      }
    );

    console.log(res);

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    const message = getErrorMessage(error);

  }
}