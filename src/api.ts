import { coinsPerPage } from "./constants";
import { toast } from "react-toastify";
import { getErrorMessage } from "./app/lib";

const { coinMarketCupKey } = process.env;

// export const getCurrenciesData = async (page: number) => {
//   try {
//     const res = await fetch(
//       `https://api.coingecko.com/api/v3/coins/markets?order=market_cap_desc&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d&x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD&vs_currency=usd&per_page=${coinsPerPage}&precision=3`,
//       { cache: "force-cache" }
//     );
//     const data = await res.json();

//     return data;
//   } catch (error) {
//     if (error instanceof Error && error.message === "Failed to fetch") {
//       toast.error("To many requests. Try again later.");
//     } else if (error instanceof Error) {
//       toast.error(error.message);
//     } else {
//       toast.error("Unknown error");
//     }
//   }
// };

// export const getSpecificCurrenciesData = async (ids: string) => {
//   try {
//     const res = await fetch(
//       `https://api.coingecko.com/api/v3/coins/markets?order=market_cap_desc&sparkline=true&price_change_percentage=1h,24h,7d&x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD&vs_currency=usd&ids=${}&per_page=250&precision=3`
//     );
//     const data = await res.json();

//     return data;
//   } catch (error) {
//     if (error instanceof Error && error.message === "Failed to fetch") {
//       toast.error("To many requests. Try again later.");
//     } else if (error instanceof Error) {
//       toast.error(error.message);
//     } else {
//       toast.error("Unknown error");
//     }
//   }
// };

// export const getCurrenciesAmmount = async () => {
//   try {
//     const res = await fetch(
//       "https://api.coingecko.com/api/v3/coins/list?x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD",
//       { cache: "force-cache" }
//     );
//     const data = await res.json();

//     return Math.ceil(data.length / coinsPerPage);
//   } catch (error) {
//     if (error instanceof Error && error.message === "Failed to fetch") {
//       toast.error("To many requests. Try again later.");
//     } else if (error instanceof Error) {
//       toast.error(error.message);
//     } else {
//       toast.error("Unknown error");
//     }
//   }
// };

export const getCurrenciesMap = async () => {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/list?x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD",
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

