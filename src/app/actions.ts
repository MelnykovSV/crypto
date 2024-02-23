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
import { transactionsPerPage } from "@/constants";
import dayjs from "dayjs";
import { coinsPerPage } from "@/constants";

const { coinMarketCupKey } = process.env;

interface IUserTransactionsQuerry {
  type: "all" | "buy" | "sell" | "exchange";
  substring: string | null;
  date: string | null;
  status: "all" | "success" | "fail";
  sorting: "1" | "-1";
  page: string;
}
interface ITransactionData {
  type: "buy" | "sell" | "exchange";
  fromItemName: string;
  fromItemSymbol: string;
  fromItemLogo: string;
  fromItemCoinGeckoId: string;
  fromItemCoinMarketCapId: string;
  fromAmount: number;
  toItemName: string;
  toItemSymbol: string;
  toItemLogo: string;
  toItemCoinGeckoId: string;
  toItemCoinMarketCapId: string;
  toAmount: number;
}
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

    console.log("user", user);

    const portfolio = await Portfolio.findOne({ owner: user._id });

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
      return JSON.stringify({ portfolio, priceList: {} });
    }

    console.log("portfolio", portfolio);

    if (!portfolio.coins.length) {
      return JSON.stringify({ portfolio, priceList: {} });
    }
    const priceListQuery = [
      ...portfolio.coins.map((item: IPortfolioCoin) => item.coinMarketCapId),
    ].join(",");

    console.log("PRICE_QUERY", priceListQuery);

    const pricesPromise = fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${priceListQuery}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": coinMarketCupKey!,
        },
      }
    );

    // const logosPromise = fetch(
    //   `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${priceListQuery}`,
    //   {
    //     headers: {
    //       "X-CMC_PRO_API_KEY": coinMarketCupKey!,
    //     },
    //   }
    // );
    const [res] = await Promise.all([pricesPromise]);
    if (!res.ok) {
      const error = await res.json();
      const errorMessage = error.status.error_message;
      throw new Error(errorMessage);
    }
    // if (!res2.ok) {
    //   const error = await res2.json();
    //   const errorMessage = error.status.error_message;
    //   throw new Error(errorMessage);
    // }

    // const data2 = await res2.json();

    // const coinLogos = Object.values(data2.data).reduce(
    //   (acc: any, item: any) => ({ ...acc, [item[0].symbol]: item[0].logo }),
    //   {}
    // ) as any;

    if (!res.ok) {
      const error = await res.json();
      const errorMessage = error.status.error_message;
      throw new Error(errorMessage);
    }

    const coinPrices = await res.json();

    const priceList = createPriceList(coinPrices) as IPriceList;

    // const priceListWithLogos = Object.keys(priceList).reduce(
    //   (acc: any, item: any) => {
    //     return {
    //       ...acc,
    //       [item]: { ...priceList[item], logo: coinLogos[item] },
    //     };
    //   },
    //   {}
    // );

    console.log("final data", {
      portfolio,
      priceList,
    });

    return JSON.stringify({
      portfolio,
      priceList,
    });
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function createTransaction(transactionData: ITransactionData) {
  console.log("formData", transactionData);

  try {
    await connectDB();
    const user = await authenticate();

    // const rawFormData = Object.fromEntries(formData.entries()) as Record<
    //   string,
    //   string | number
    // >;

    const errors = await validate(
      newTransactionFormValidation,
      transactionData
    );

    if (errors) {
      throw new Error(errors.join(","));
    }

    const {
      type,
      fromItemName,
      fromItemSymbol,
      fromItemLogo,
      fromItemCoinGeckoId,
      fromItemCoinMarketCapId,
      fromAmount,
      toItemName,
      toItemSymbol,
      toItemCoinGeckoId,
      toItemCoinMarketCapId,
      toItemLogo,
      toAmount,
    } = transactionData;

    console.log("validation ok");
    console.log({
      type,
      fromItemName,
      fromItemSymbol,
      fromItemLogo,
      fromItemCoinGeckoId,
      fromItemCoinMarketCapId,
      fromAmount,
      toItemName,
      toItemSymbol,
      toItemLogo,
      toItemCoinGeckoId,
      toItemCoinMarketCapId,
      toAmount,
    });

    const newTransaction = await Transaction.create({
      ...transactionData,
      owner: user._id,
    });

    console.log("created transaction", newTransaction);

    const portfolio = await Portfolio.findOne({ owner: user._id });

    console.log("portfolio", portfolio);

    if (!portfolio) {
      throw new Error("No portfolio");
    }

    const priceListQuery = Array.from(
      new Set([
        ...portfolio.coins.map((item: IPortfolioCoin) => item.coinMarketCapId),
        ...(fromItemCoinMarketCapId === "none"
          ? []
          : [fromItemCoinMarketCapId]),
        ...(toItemCoinMarketCapId === "none" ? [] : [toItemCoinMarketCapId]),
      ])
    ).join(",");

    console.log("priceListQuery", priceListQuery);

    const res = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${priceListQuery}`,
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

    console.log("coinPrices", coinPrices);

    const priceList = createPriceList(coinPrices) as IPriceList;

    console.log("priceList", priceList);

    // const coinsListRes = await fetch(
    //   "https://api.coingecko.com/api/v3/coins/list?x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD",
    //   { cache: "force-cache" }
    // );
    // const data = await coinsListRes.json();

    // console.log("coinsListRes  done");
    // console.log(data.length);

    // const coinsMap = {} as any;
    // data.forEach((item: any) => {
    //   coinsMap[item.symbol.toLowerCase()] = {
    //     ...item,
    //     symbol: item.symbol.toUpperCase(),
    //   };
    // });

    // console.log("coinsMap  done");
    // console.log(Object.keys(coinsMap).length);

    console.log("newTransaction", newTransaction);

    const processedPortfolio = processTransaction(
      portfolio,
      newTransaction,
      priceList
      // coinsMap
    );

    console.log("processedPortfolio", processedPortfolio);

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
    // console.log(getErrorMessage(error));
    return { error: getErrorMessage(error) };
  }
}

export async function getUserTransactions({
  type,
  substring,
  date,
  status,
  sorting,
  page,
}: IUserTransactionsQuerry) {
  try {
    await connectDB();
    const user = await authenticate();

    const statusMap = { success: true, fail: false };

    const query = {
      owner: user._id,
      ...(date
        ? {
            createdAt: {
              $gte: dayjs(date).startOf("day").toDate(),
              $lte: dayjs(date).endOf("day").toDate(),
            },
          }
        : {}),
      ...(type === "all" ? {} : { type }),
      ...(status === "all" ? {} : { isSuccessful: statusMap[status] }),
      ...(substring
        ? {
            $or: [
              { fromItem: { $regex: substring, $options: "i" } },
              { toItem: { $regex: substring, $options: "i" } },
            ],
          }
        : {}),
    };

    const totalDocuments = await Transaction.countDocuments(query);

    if (!totalDocuments) {
      return { error: "No transactions found" };
    }

    const totalPages = Math.ceil(totalDocuments / transactionsPerPage);

    const userTransactions = await Transaction.find(query, null, {
      sort: { createdAt: Number(sorting) },
    })
      .limit(transactionsPerPage)
      .skip((Number(page) - 1) * transactionsPerPage);

    if (!userTransactions.length) {
      return { error: "No transactions found" };
    }

    const priceListQuery = Array.from(
      new Set(
        userTransactions.reduce((acc, item) => {
          if (item.fromItemSymbol.toLowerCase() === "usd") {
            return [
              ...acc,
              item.toItemSymbol.toLowerCase() === "usd" ? null : item.toItem,
            ];
          } else if (item.toItemSymbol.toLowerCase() === "usd") {
            return [
              ...acc,
              item.fromItemSymbol.toLowerCase() === "usd"
                ? null
                : item.fromItem,
            ];
          } else {
            return [
              ...acc,
              item.fromItemSymbol.toLowerCase() === "usd"
                ? null
                : item.fromItem,
              item.toItemSymbol.toLowerCase() === "usd" ? null : item.toItem,
            ];
          }
        }, [])
      )
    ).join(",");

    const logosRes = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${priceListQuery}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": coinMarketCupKey!,
        },
      }
    );
    const logosData = (await logosRes.json()) as {
      data: Record<string, { symbol: string; logo: string }[]>;
    };

    const coinLogos =
      logosData && logosData.data && logosData.data instanceof Object
        ? Object.values(logosData.data).reduce(
            (acc, item) => ({
              ...acc,
              [item[0].symbol]: item[0].logo,
            }),
            {}
          )
        : {};

    return {
      totalPages,
      userTransactions,
      logos: coinLogos as Record<string, string>,
    };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function getTransactionsPages({
  type,
  substring,
  date,
  status,
}: IUserTransactionsQuerry) {
  const user = await authenticate();

  const statusMap = { success: true, fail: false };

  const query = {
    owner: user._id,
    ...(date
      ? {
          createdAt: {
            $gte: dayjs(date).startOf("day").toDate(),
            $lte: dayjs(date).endOf("day").toDate(),
          },
        }
      : {}),
    ...(type === "all" ? {} : { type }),
    ...(status === "all" ? {} : { isSuccessful: statusMap[status] }),
    ...(substring
      ? {
          $or: [
            { fromItem: { $regex: substring, $options: "i" } },
            { toItem: { $regex: substring, $options: "i" } },
          ],
        }
      : {}),
  };

  try {
    const totalDocuments = await Transaction.countDocuments(query);
    const totalPages = Math.ceil(totalDocuments / transactionsPerPage);
    return totalPages;
  } catch (error) {
    return { error: getErrorMessage(error) };
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

    const data = (await res.json()) as {
      data: Record<
        string,
        {
          id: number;
          name: string;
          slug: string;
          quote: Record<string, { price: number }>;
        }[]
      >;
    };

    return data;
  } catch (error) {
    console.log(error);
    return { error: getErrorMessage(error) };
  }
}

export const getTotalCoinsPages = async () => {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/list?x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD",
      { cache: "force-cache" }
    );
    const data = await res.json();

    return Math.ceil(data.length / coinsPerPage);
  } catch (error) {
    if (error instanceof Error && error.message === "Failed to fetch") {
      return { error: getErrorMessage("To many requests. Try again later.") };
    } else {
      return { error: getErrorMessage(error) };
    }
  }
};

export const getCurrenciesData = async (page: number) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?order=market_cap_desc&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d&x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD&vs_currency=usd&per_page=${coinsPerPage}&precision=3`,
      { cache: "force-cache" }
    );
    const data = await res.json();

    if (data.status && data.status.error_code === 429) {
      return { error: getErrorMessage("To many requests. Try again later.") };
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.message === "Failed to fetch") {
      return { error: getErrorMessage("To many requests. Try again later.") };
    } else {
      return { error: getErrorMessage(error) };
    }
  }
};

export const getSingleCoinData = async (coin: string) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}?x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD&vs_currency=usd&per_page=${coinsPerPage}&precision=3`
    );
    const data = await res.json();
    if (data.status && data.status.error_code === 429) {
      return { error: getErrorMessage("To many requests. Try again later.") };
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.message === "Failed to fetch") {
      return { error: getErrorMessage("To many requests. Try again later.") };
    } else {
      return { error: getErrorMessage(error) };
    }
  }
};

export const getCoinMarketChartData = async (
  coin: string,
  vs_currency: string,
  days: number | "max",
  precision: number = 6
) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${vs_currency}&days=${days}&precision=${precision}&x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFj`
    );

    const data = await res.json();

    if (data.status && data.status.error_code === 429) {
      return { error: getErrorMessage("To many requests. Try again later.") };
    }

    return data.prices;
  } catch (error) {
    if (error instanceof Error && error.message === "Failed to fetch") {
      return { error: getErrorMessage("To many requests. Try again later.") };
    } else {
      return { error: getErrorMessage(error) };
    }
  }
};
