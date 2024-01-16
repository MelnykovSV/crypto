import { coinsPerPage } from "./constants";

export const getCurrenciesData = async (page: number) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?order=market_cap_desc&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d&x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD&vs_currency=usd&per_page=${coinsPerPage}&precision=3`
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const getCurrenciesAmmount = async () => {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/list?x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD&vs"
    );
    const data = await res.json();
    console.log(data.length);

    return Math.ceil(data.length / coinsPerPage);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const searchCoins = async (query: string) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${query}&x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD&vs`
    );
    const data = await res.json();

    console.log(data);

    return data.coins;
  } catch (error) {
    console.log(`Error: ${error}`);
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
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${vs_currency}&days=${days}&precision=${precision}&x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD&vs`
    );
    const data = await res.json();

    return data.prices;
  } catch (error) {
    console.log(error);
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
      `https://api.coingecko.com/api/v3/coins/${coin}/ohlc?vs_currency=${vs_currency}&days=${days}&precision=${precision}&x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD&vs`
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
