export interface ICoinData {
  id: string; //
  symbol: string; //
  name: string; //
  image: string; //
  current_price: number; //
  market_cap: number; //
  market_cap_rank: number; //
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: 0.0398177;
  atl_change_percentage: number;
  atl_date: string;
  //   roi: null;
  last_updated: string;
  sparkline_in_7d: { price: number[] }; ///
  price_change_percentage_1h_in_currency: number; //
  price_change_percentage_24h_in_currency: number; //
  price_change_percentage_7d_in_currency: number; //
}

export interface ICoinTableData
  extends Pick<
    ICoinData,
    | "id"
    | "name"
    | "symbol"
    | "current_price"
    | "image"
    | "market_cap_rank"
    | "price_change_percentage_1h_in_currency"
    | "price_change_percentage_24h_in_currency"
    | "price_change_percentage_7d_in_currency"
    | "market_cap"
    | "market_cap_change_24h"
    | "sparkline_in_7d"
  > {
  favorite: boolean;
}
