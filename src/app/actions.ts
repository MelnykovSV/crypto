"use server";

import { Portfolio, User, Transaction } from "@/models";
import { getServerSession } from "next-auth";
import { authOptions } from "../../options";
import { CustomSession } from "@/interfaces";
import { getErrorMessage } from "./lib";
import { validate } from "@/validation/validation";
import { newTransactionFormValidation } from "@/validation/newTransactionValidation";
import { createPriceList, processTransaction } from "./lib";
import { IPortfolioCoin, ICoin } from "@/interfaces";
import connectDB from "./lib/dbConnect";
import { IPriceList, ICoinMarketCapCoin } from "@/interfaces";
import { transactionsPerPage } from "@/constants";
import dayjs from "dayjs";
import { coinsPerPage } from "@/constants";
import cloudinary from "cloudinary";
import { userFormValidation } from "@/validation/userFormValidation";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const { coinMarketCupKey, coinGeckoKey } = process.env;

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

    if (!portfolio.coins.length) {
      return JSON.stringify({ portfolio, priceList: {} });
    }
    const priceListQuery = [
      ...portfolio.coins.map((item: IPortfolioCoin) => item.coinMarketCapId),
    ].join(",");

    const res = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${priceListQuery}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": coinMarketCupKey!,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const error = await res.json();
      const errorMessage = error.status.error_message;
      throw new Error(errorMessage);
    }

    const coinPrices = await res.json();

    const priceList = createPriceList(coinPrices) as IPriceList;

    return JSON.stringify({
      portfolio,
      priceList,
    });
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function getPortfolioCoins() {
  try {
    await connectDB();
    const user = await authenticate();

    const portfolio = await Portfolio.findOne({ owner: user._id });

    if (!portfolio) {
      throw new Error("No portfolio");
    }

    return JSON.stringify(portfolio.coins);
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function createTransaction(transactionData: ITransactionData) {
  try {
    await connectDB();
    const user = await authenticate();

    const errors = await validate(
      newTransactionFormValidation,
      transactionData
    );

    if (errors) {
      throw new Error(errors.join(","));
    }

    const { fromItemCoinMarketCapId, toItemCoinMarketCapId } = transactionData;

    const newTransaction = await Transaction.create({
      ...transactionData,
      owner: user._id,
    });

    const portfolio = await Portfolio.findOne({ owner: user._id });

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

    const res = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${priceListQuery}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": coinMarketCupKey!,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const error = await res.json();
      const errorMessage = error.status.error_message;
      throw new Error(errorMessage);
    }

    const coinPrices = await res.json();

    const priceList = createPriceList(coinPrices) as IPriceList;

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
              { fromItemSymbol: { $regex: substring, $options: "i" } },
              { toItemSymbol: { $regex: substring, $options: "i" } },
            ],
          }
        : {}),
    };

    const totalDocuments = await Transaction.countDocuments(query);

    if (!totalDocuments) {
      return {
        totalPages: 0,
        userTransactions: [],
      };
    }

    const totalPages = Math.ceil(totalDocuments / transactionsPerPage);

    const userTransactions = await Transaction.find(query, null, {
      sort: { createdAt: Number(sorting) },
    })
      .limit(transactionsPerPage)
      .skip((Number(page) - 1) * transactionsPerPage);

    return {
      totalPages,
      userTransactions,
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
  toCurrency: ICoin,
  convert?: string | undefined
) {
  try {
    const res = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${
        toCurrency.symbol
      }${convert ? `&convert=${convert}` : ""}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": coinMarketCupKey!,
        },
        cache: "no-store",
      }
    );

    const data = await res.json();

    const foundCurrency =
      data.data[toCurrency.symbol].find(
        (item: ICoinMarketCapCoin) =>
          item.name.toLowerCase() === toCurrency.name.toLowerCase()
      ) ||
      data.data[toCurrency.symbol].find(
        (item: ICoinMarketCapCoin) => item.slug === toCurrency.coinGeckoId
      ) ||
      data.data[toCurrency.symbol][0];

    const coefficient = foundCurrency.quote.USD.price;

    return { coefficient, toCurrencyCoinMarketCapId: foundCurrency.id };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function getCoinPriceForExchange(
  fromCurrency: IPortfolioCoin,
  toCurrency: ICoin
) {
  try {
    const toCurrencyResponse = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${toCurrency.symbol}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": coinMarketCupKey!,
        },
        cache: "no-store",
      }
    );

    const toCurrencyData = await toCurrencyResponse.json();

    const foundToCurrency =
      toCurrencyData.data[toCurrency.symbol].find(
        (item: ICoinMarketCapCoin) =>
          item.name.toLowerCase() === toCurrency.name.toLowerCase()
      ) ||
      toCurrencyData.data[toCurrency.symbol].find(
        (item: ICoinMarketCapCoin) => item.slug === toCurrency.coinGeckoId
      ) ||
      toCurrencyData.data[toCurrency.symbol][0];

    const fromCurrencyResponse = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${fromCurrency.coinMarketCapId}&convert_id=${foundToCurrency.id}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": coinMarketCupKey!,
        },
        cache: "no-store",
      }
    );

    const fromCurrencyData = await fromCurrencyResponse.json();

    const coefficient =
      fromCurrencyData.data[fromCurrency.coinMarketCapId].quote[
        foundToCurrency.id
      ].price;

    return { coefficient, toCurrencyCoinMarketCapId: foundToCurrency.id };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}
export async function getCoinPriceById(
  fromCurrency: IPortfolioCoin,
  convert?: string | undefined
) {
  try {
    const res = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${
        fromCurrency.coinMarketCapId
      }${convert ? `&convert=${convert}` : ""}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": coinMarketCupKey!,
        },
        cache: "no-store",
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
        }
      >;
    };

    const coefficient = data.data[fromCurrency.coinMarketCapId].quote.USD.price;

    return { coefficient };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export const getTotalCoinsPages = async () => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/list?x_cg_api_key=${coinGeckoKey}`,
      { cache: "force-cache", next: { revalidate: 3600 } }
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
      `https://api.coingecko.com/api/v3/coins/markets?order=market_cap_desc&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d&x_cg_api_key=${coinGeckoKey}&vs_currency=usd&per_page=${coinsPerPage}&precision=3`,
      { cache: "force-cache", next: { revalidate: 3600 } }
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
      `https://api.coingecko.com/api/v3/coins/${coin}?x_cg_api_key=${coinGeckoKey}&vs_currency=usd&precision=10`
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
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${vs_currency}&days=${days}&precision=${precision}&x_cg_api_key=${coinGeckoKey}`
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

export const uploadAvatar = async (formData: FormData) => {
  try {
    await connectDB();
    const session = (await getServerSession(authOptions)) as CustomSession;

    if (!session || !session.user) {
      return {
        error: "Not authenticated",
      };
    }

    const user = await User.findById(session.user.id);

    if (!user) {
      return {
        error: "Not authenticated",
      };
    }

    const avatar = formData.get("avatar") as File;
    if (
      avatar &&
      avatar.type &&
      avatar.type !== "image/jpeg" &&
      avatar.type !== "image/png"
    ) {
      return {
        error: "You can use png and jpeg formats for an avatar",
      };
    }

    const arrayBuffer = await avatar.arrayBuffer();

    var mime = avatar.type;
    var encoding = "base64";
    var base64Data = Buffer.from(arrayBuffer).toString("base64");
    var fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

    const buffer = new Uint8Array(arrayBuffer);

    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        var result = cloudinary.v2.uploader
          .upload(fileUri, {
            invalidate: true,
            transformation: [{ width: 220, height: 220, crop: "fill" }],
          })
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    const response = (await uploadToCloudinary()) as { url: string };

    if (!response) {
      return {
        error: "Upload failed",
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { avatar: response.url },
      { new: true }
    );

    return { message: "Avatar updated", avatar: response.url };
  } catch (error) {
    return {
      error: getErrorMessage(error) || "Internal server error",
    };
  }
};

export const updateUserData = async (req: {
  birthday: string | null;
  name: string;
  email: string;
  phone?: string | undefined;
}) => {
  const { email, name, phone, birthday } = req;

  try {
    const errors = await validate(userFormValidation, {
      email,
      name,
      phone,
      birthday,
    });

    if (errors) {
      return { error: errors.join(",") || "unknown validation error" };
    }

    const session = (await getServerSession(authOptions)) as CustomSession;

    if (!session || !session.user) {
      return { error: "Not authenticated" };
    }

    const user = await User.findById(session.user.id);

    if (!user) {
      return { error: "Not authenticated" };
    }

    const userFoundByEmail = await User.findOne({ email });
    if (
      userFoundByEmail &&
      userFoundByEmail._id.toString() !== session.user.id
    ) {
      return { error: "This email already in use" };
    }

    const userFoundByName = await User.findOne({ name });

    if (userFoundByName && userFoundByName._id.toString() !== session.user.id) {
      return { error: "This name already in use" };
    }

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        email,
        name,
        phone,
        birthday,
      },
      { new: true }
    );

    return { message: "User info updated" };
  } catch (error) {
    return {
      error: getErrorMessage(error) || "Internal server error",
    };
  }
};
