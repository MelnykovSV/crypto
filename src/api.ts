import { currenciesPerPage } from "./constants";

export const getCurrenciesData = async (page: number) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?order=market_cap_desc&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d&x_cg_api_key=CG-db2xtHNdy1C4m5Vd6wRkGFjD&vs_currency=usd&per_page=${currenciesPerPage}&precision=3`
    );
    const data = await res.json();
    console.log(data);

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

    return data.length;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
