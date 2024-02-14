import { IPortfolio, IPortfolioCoin, ITransaction } from "@/interfaces";
import { newCoinsMap } from "@/newCoinsMap";

export function calculatePortfolioPrice(
  priceList: Record<string, { name: string; symbol: string; price: number }>,
  coins: IPortfolioCoin[]
) {
  const pricesByCoin = coins.map((item) => ({
    name: item.name,
    symbol: item.symbol,
    portfolioCoinPrice: item.amount * priceList[item.symbol].price,
  }));
  return coins.reduce((acc, item) => {
    return acc + item.amount * priceList[item.symbol].price;
  }, 0);
}

export function createPriceList(res: any) {
  const result = Object.values(res.data).reduce(
    (acc: any, item: any) => ({
      ...acc,
      [item[0].symbol]: {
        name: item[0].name,
        symbol: item[0].symbol,
        price: item[0].quote.USD.price,
        percent_change_24h: item[0].quote.USD.percent_change_24h,
      },
    }),
    {}
  );

  return result;
}

export function processTransaction(
  { coins, totalInvested, totalWithdrawn, historyData }: IPortfolio,
  { type, fromItem, fromAmount, toItem, toAmount }: ITransaction,
  priceList: Record<string, { name: string; symbol: string; price: number }>
) {
  switch (type) {
    case "sell":
      if (!coins.find((coin) => coin.symbol === fromItem)) {
        throw new Error("Not enough coins for this transaction");
      }

      const updatedCoins = coins.map((coin) => {
        if (coin.symbol === fromItem) {
          if (coin.amount < fromAmount) {
            throw new Error("Not enough coins for this transaction");
          }
          return {
            symbol: coin.symbol,
            name: coin.name,
            amount: coin.amount - fromAmount,
          };
        } else {
          return coin;
        }
      });

      const fromPricePerItem = priceList[fromItem].price;
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
      if (coins.find((coin) => coin.symbol === toItem)) {
        const updatedCoins = coins.map((coin) => {
          if (coin.symbol === toItem) {
            return {
              symbol: coin.symbol,
              name: coin.name,
              amount: coin.amount + toAmount,
            };
          } else {
            return coin;
          }
        });

        const toPricePerItem = priceList[toItem].price;

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
            symbol: toItem,
            amount: toAmount,
            coinGeckoId: newCoinsMap[priceList[toItem].name as keyof typeof newCoinsMap].id,
            name: priceList[toItem].name,
          },
        ];

        const toPricePerItem = priceList[toItem].price;

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
      if (!coins.find((coin) => coin.symbol === fromItem)) {
        throw new Error("Not enough coins for this transaction");
      }
      const updatedCoinsFromPart = coins.map((coin) => {
        if (coin.symbol === fromItem) {
          if (coin.amount < fromAmount) {
            throw new Error("Not enough coins for this transaction");
          }

          return {
            symbol: coin.symbol,
            name: coin.name,
            amount: coin.amount - fromAmount,
          };
        } else {
          return coin;
        }
      });

      const filteredCoinsFromPart = updatedCoinsFromPart.filter(
        (coin) => coin.amount !== 0
      );

      if (filteredCoinsFromPart.find((coin) => coin.symbol === toItem)) {
        const updatedCoinsToPart = filteredCoinsFromPart.map((coin) => {
          if (coin.symbol === toItem) {
            return {
              symbol: coin.symbol,
              name: coin.name,
              amount: coin.amount + toAmount,
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
              // date: new Date(),
            },
          ],
        };
      } else {
        const updatedCoinsToPart = [
          ...filteredCoinsFromPart,
          {
            symbol: toItem,
            amount: toAmount,
            coinGeckoId: newCoinsMap[priceList[toItem].name as keyof typeof newCoinsMap].id,
            name: priceList[toItem].name,
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
              // date: new Date(),
            },
          ],
        };
      }
  }
}
