"use server";

import { Portfolio, User, Transaction } from "@/models";
import { getServerSession } from "next-auth";
import { authOptions } from "../../options";
import { CustomSession } from "@/interfaces";
import { getErrorMessage } from "./lib";
import { validate } from "@/validation/validation";
import { newTransactionFormValidation } from "@/validation/newTransactionValidation";
import { createPriceList, processTransaction } from "./lib";
import { IPortfolioCoin } from "@/interfaces";
import connectDB from "./lib/dbConnect";
import { IPortfolio } from "@/interfaces";
import { IPriceList } from "@/interfaces";
import { AnimationDuration } from "recharts/types/util/types";

const { coinMarketCupKey } = process.env;

async function authenticate() {
  await connectDB();
  const session = (await getServerSession(authOptions)) as CustomSession;

  if (!session || !session.user) {
    throw new Error("Not authenticated");
  }

  const user = await User.findById(session.user.id);

  if (!user) {
    throw new Error("Not authenticated");
  }

  return user;
}

export async function getUserPortfolio() {
  try {
    await connectDB();
    const user = await authenticate();

    const portfolio = await Portfolio.findOne({ owner: user._id });

    console.log("portfolio", portfolio);

    if (!portfolio) {
      const portfolio = await Portfolio.create({
        owner: user._id,
        historyData: [
          {
            totalInvested: 0,
            totalWithdrawn: 0,
            totalPortfolioPrice: 0,
            date: new Date(),
          },
        ],
      });
      console.log("null portfolio", portfolio);
      return JSON.stringify({ portfolio, priceList: {} });
    }

    if (!portfolio.coins.length) {
      return JSON.stringify({ portfolio, priceList: {} });
    }
    const priceListQuery = [
      ...portfolio.coins.map((item: IPortfolioCoin) => item.symbol),
    ].join(",");

    const pricesPromise = fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${priceListQuery}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": coinMarketCupKey!,
        },
      }
    );

    const logosPromise = fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${priceListQuery}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": coinMarketCupKey!,
        },
      }
    );
    const [res, res2] = await Promise.all([pricesPromise, logosPromise]);
    if (!res.ok) {
      const error = await res.json();
      const errorMessage = error.status.error_message;
      throw new Error(errorMessage);
    }
    if (!res2.ok) {
      const error = await res2.json();
      const errorMessage = error.status.error_message;
      throw new Error(errorMessage);
    }

    const data2 = await res2.json();



    const coinLogos = Object.values(data2.data).reduce(
      (acc: any, item: any) => ({ ...acc, [item[0].symbol]: item[0].logo }),
      {}
    ) as any;

    console.log(coinLogos);

    if (!res.ok) {
      const error = await res.json();
      const errorMessage = error.status.error_message;
      throw new Error(errorMessage);
    }

    const coinPrices = await res.json();

    console.log("coinPrices", coinPrices.data.BTC[0]);

    const priceList = createPriceList(coinPrices) as IPriceList;

    const priceListWithLogos = Object.keys(priceList).reduce(
      (acc: any, item: any) => {
        return {
          ...acc,
          [item]: { ...priceList[item], logo: coinLogos[item] },
        };
      },
      {}
    );

    // console.log("priceListWithLogos", priceListWithLogos);

    return JSON.stringify({
      portfolio,
      priceList: priceListWithLogos,
      // coinLogos,
    });
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function createTransaction(formData: FormData) {
  try {
    await connectDB();
    const user = await authenticate();

    const rawFormData = Object.fromEntries(formData.entries()) as Record<
      string,
      string | number
    >;

    const errors = await validate(newTransactionFormValidation, rawFormData);

    if (errors) {
      throw new Error(errors.join(","));
    }

    const { fromItem, toItem } = rawFormData;

    const newTransaction = await Transaction.create({
      ...rawFormData,
      owner: user._id,
    });

    const portfolio = await Portfolio.findOne({ owner: user._id });

    if (!portfolio) {
      throw new Error("No portfolio");
    }

    console.log("portfolio!", portfolio);

    // if (!portfolio.coins.length) {
    //   return JSON.stringify({ portfolio, priceList: {} });
    // }

    const priceListQuery = Array.from(
      new Set([
        ...portfolio.coins.map((item: IPortfolioCoin) => item.symbol),
        fromItem === "USD" ? "" : fromItem,
        toItem === "USD" ? "" : toItem,
      ])
    ).join(",");

    console.log("priceListQuery", priceListQuery);

    const res = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${priceListQuery}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": coinMarketCupKey!,
        },
      }
    );

    if (!res.ok) {
      const error = await res.json();
      const errorMessage = error.status.error_message;
      throw new Error(errorMessage);
    }

    const coinPrices = await res.json();

    const priceList = createPriceList(coinPrices) as IPriceList;

    console.log("priceList", priceList);
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

    return JSON.stringify({ portfolio: updatedPortfolio, priceList });
  } catch (error) {
    console.log(getErrorMessage(error));
    return getErrorMessage(error);
  }
}

export async function getUserTransactions(formData: FormData) {
  try {
    await connectDB();
    const user = await authenticate();

    const userTransactions = await Transaction.find({ owner: user._id });

    return JSON.stringify(userTransactions);
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function getCoinPrice(
  symbol: string,
  convert?: string | undefined
) {
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

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return getErrorMessage(error);
  }
}
