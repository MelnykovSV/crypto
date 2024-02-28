import { toast } from "react-toastify";

const coinGeckoKey = process.env.coinGeckoKey;

export const getCurrenciesMap = async () => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/list?x_cg_api_key=${coinGeckoKey}`,
      { cache: "force-cache" }
    );
    const data = await res.json();

    const map = data.reduce((acc: any, item: any) => {
      return {
        ...acc,
        [item.symbol.toUpperCase()]: {
          ...item,
          symbol: item.symbol.toUpperCase(),
        },
      };
    }, {});

    return map;
  } catch (error) {
    if (error instanceof Error && error.message === "Failed to fetch") {
      toast.error("To many requests. Try again later.");
    } else if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Unknown error");
    }
  }
};

export const searchCoins = async (query: string) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${query}&x_cg_api_key=${coinGeckoKey}`
    );
    const data = await res.json();

    return data.coins;
  } catch (error) {
    if (error instanceof Error && error.message === "Failed to fetch") {
      toast.error("To many requests. Try again later.");
    } else if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Unknown error");
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

    return data.prices;
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Failed to fetch") {
      toast.error("To many requests. Try again later.");
    } else if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Unknown error");
    }
  }
};

export const getCoinOHLCData = async (
  coin: string,
  vs_currency: string,
  days: number | "max",
  precision: number = 6
) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/ohlc?vs_currency=${vs_currency}&days=${days}&precision=${precision}&x_cg_api_key=${coinGeckoKey}`
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    if (error instanceof Error && error.message === "Failed to fetch") {
      toast.error("To many requests. Try again later.");
    } else if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Unknown error");
    }
  }
};
