import {
  IPortfolio,
  IPortfolioCoin,
  // ITransaction,
  IPriceListData,
  ITransactionData,
} from "@/interfaces";

import { roundValue } from ".";

export function calculatePortfolioPrice(
  priceList: Record<string, { name: string; symbol: string; price: number }>,
  coins: IPortfolioCoin[]
) {
  return coins.reduce((acc, item) => {
    return acc + item.amount * priceList[item.symbol.toUpperCase()].price;
  }, 0);
}

export function createPriceList(res: IPriceListData) {
  const result = Object.values(res.data).reduce(
    (acc, item) => ({
      ...acc,
      [item.symbol.toUpperCase()]: {
        name: item.name,
        symbol: item.symbol,
        price: item.quote.USD.price,
        percent_change_24h: item.quote.USD.percent_change_24h,
      },
    }),
    {}
  );

  return result;
}

export function processTransaction(
  { coins, totalInvested, totalWithdrawn, historyData }: IPortfolio,
  {
    type,
    fromAmount,
    fromItemSymbol,

    fromItemCoinGeckoId,
    fromItemCoinMarketCapId,
    fromItemLogo,
    fromItemName,
    toItemSymbol,
    toAmount,
    toItemCoinGeckoId,
    toItemCoinMarketCapId,
    toItemLogo,
    toItemName,
  }: ITransactionData,
  priceList: Record<string, { name: string; symbol: string; price: number }>
) {
  switch (type) {
    case "sell":
      if (!coins.find((coin) => coin.coinGeckoId === fromItemCoinGeckoId)) {
        throw new Error("Not enough coins for this transaction");
      }

      const updatedCoins = coins.map((coin) => {
        if (coin.coinGeckoId === fromItemCoinGeckoId) {
          if (coin.amount < fromAmount) {
            throw new Error("Not enough coins for this transaction");
          }
          return {
            symbol: coin.symbol,
            name: coin.name,
            amount: Number(roundValue(coin.amount - fromAmount)),
            logo: coin.logo,
            coinGeckoId: coin.coinGeckoId,
            coinMarketCapId: coin.coinMarketCapId,
          };
        } else {
          return coin;
        }
      });
      const fromPricePerItem = priceList[fromItemSymbol].price;
      const filteredCoins = updatedCoins.filter((coin) => coin.amount !== 0);

      const updatedTotalWithdrawn =
        totalWithdrawn + fromPricePerItem * fromAmount;

      const updatedHistoryData = [
        ...historyData,
        {
          totalInvested,
          totalWithdrawn: updatedTotalWithdrawn,
          totalPortfolioPrice: calculatePortfolioPrice(
            priceList,
            filteredCoins
          ),
          date: new Date(),
        },
      ];

      return {
        coins: filteredCoins,
        totalWithdrawn: updatedTotalWithdrawn,
        totalInvested,
        historyData: updatedHistoryData,
      };

    case "buy":
      if (coins.find((coin) => coin.coinGeckoId === toItemCoinGeckoId)) {
        const updatedCoins = coins.map((coin) => {
          if (coin.coinGeckoId === toItemCoinGeckoId) {
            return {
              symbol: coin.symbol,
              name: coin.name,
              amount: Number(roundValue(coin.amount + toAmount)),
              logo: coin.logo,
              coinGeckoId: coin.coinGeckoId,
              coinMarketCapId: coin.coinMarketCapId,
            };
          } else {
            return coin;
          }
        });

        const toPricePerItem = priceList[toItemSymbol].price;

        return {
          coins: updatedCoins,
          totalInvested: totalInvested + toPricePerItem * toAmount,
          totalWithdrawn,
          historyData: [
            ...historyData,
            {
              totalInvested: totalInvested + toPricePerItem * toAmount,
              totalWithdrawn,
              totalPortfolioPrice: calculatePortfolioPrice(
                priceList,
                updatedCoins
              ),
              date: new Date(),
            },
          ],
        };
      } else {
        const updatedCoins = [
          ...coins,
          {
            symbol: toItemSymbol,
            amount: Number(roundValue(toAmount)),
            coinGeckoId: toItemCoinGeckoId,
            coinMarketCapId: toItemCoinMarketCapId,
            logo: toItemLogo,
            name: toItemName,
          },
        ];

        const toPricePerItem = priceList[toItemSymbol.toUpperCase()].price;

        return {
          coins: updatedCoins,
          totalInvested: totalInvested + toPricePerItem * toAmount,
          totalWithdrawn,
          historyData: [
            ...historyData,
            {
              totalInvested: totalInvested + toPricePerItem * toAmount,
              totalWithdrawn,
              totalPortfolioPrice: calculatePortfolioPrice(
                priceList,
                updatedCoins
              ),
              date: new Date(),
            },
          ],
        };
      }

    case "exchange":
      if (!coins.find((coin) => coin.coinGeckoId === fromItemCoinGeckoId)) {
        throw new Error("Not enough coins for this transaction");
      }
      const updatedCoinsFromPart = coins.map((coin) => {
        if (coin.coinGeckoId === fromItemCoinGeckoId) {
          if (coin.amount < fromAmount) {
            throw new Error("Not enough coins for this transaction");
          }
          return {
            symbol: coin.symbol,
            name: coin.name,
            amount: Number(roundValue(coin.amount - fromAmount)),
            logo: coin.logo,
            coinGeckoId: coin.coinGeckoId,
            coinMarketCapId: coin.coinMarketCapId,
          };
        } else {
          return coin;
        }
      });

      const filteredCoinsFromPart = updatedCoinsFromPart.filter(
        (coin) => coin.amount !== 0
      );

      if (
        filteredCoinsFromPart.find(
          (coin) => coin.coinGeckoId === toItemCoinGeckoId
        )
      ) {
        const updatedCoinsToPart = filteredCoinsFromPart.map((coin) => {
          if (coin.coinGeckoId === toItemCoinGeckoId) {
            return {
              symbol: coin.symbol,
              name: coin.name,
              amount: Number(roundValue(coin.amount + toAmount)),
              logo: coin.logo,
              coinGeckoId: coin.coinGeckoId,
              coinMarketCapId: coin.coinMarketCapId,
            };
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
              totalPortfolioPrice: calculatePortfolioPrice(
                priceList,
                updatedCoinsToPart
              ),
              date: new Date(),
            },
          ],
        };
      } else {
        const updatedCoinsToPart = [
          ...filteredCoinsFromPart,
          {
            symbol: toItemSymbol,
            amount: Number(roundValue(toAmount)),
            coinGeckoId: toItemCoinGeckoId,
            coinMarketCapId: toItemCoinMarketCapId,
            name: toItemName,
            logo: toItemLogo,
          },
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
              totalPortfolioPrice: calculatePortfolioPrice(
                priceList,
                updatedCoinsToPart
              ),
              date: new Date(),
            },
          ],
        };
      }
  }
}
