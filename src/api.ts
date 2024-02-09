import { coinsPerPage } from "./constants";
import { toast } from "react-toastify";
import { getErrorMessage } from "./app/lib";

const { coinMarketCupKey } = process.env;

export const getCurrenciesData = async (page: number) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?order=market_cap_desc&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d&x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD&vs_currency=usd&per_page=${coinsPerPage}&precision=3`
    );
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

export const getCurrenciesAmmount = async () => {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/list?x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD"
    );
    const data = await res.json();

    return Math.ceil(data.length / coinsPerPage);
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
      `https://api.coingecko.com/api/v3/search?query=${query}&x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD`
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
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${vs_currency}&days=${days}&precision=${precision}&x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFj`
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
      `https://api.coingecko.com/api/v3/coins/${coin}/ohlc?vs_currency=${vs_currency}&days=${days}&precision=${precision}&x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFj`
    );

    if (!res.ok) {
      // Log the status code and throw an error
      console.error("HTTP status code:", res.status);
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

export const getSingleCoinData = async (coin: string) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}?x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD&vs_currency=usd&per_page=${coinsPerPage}&precision=3`
    );
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

// export const getCoinPrice = async (
//   symbol: string,
//   convert?: string | undefined
// ) => {
//   try {
//     const res = await fetch(
//       `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${symbol}${
//         convert ? `&convert=${convert}` : ""
//       }`,
//       {
//         headers: {
//           "X-CMC_PRO_API_KEY": coinMarketCupKey!,
//         },
//       }
//     );

//     console.log(res);

//     const data = await res.json();

//     return data;
//   } catch (error) {
//     console.log(error);
//     const message = getErrorMessage(error);
//     toast.error(message);
//   }
// };
