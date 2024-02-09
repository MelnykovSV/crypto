import { IPortfolio, IPortfolioCoin, ITransaction } from "@/interfaces";

export function calculateTotalPortfolioPrice(
  priceList: Record<string, { name: string; symbol: string; price: number }>,
  coins: IPortfolioCoin[]
) {
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
          totalPortfolioPrice: calculateTotalPortfolioPrice(
            priceList,
            filteredCoins
          ),
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
              totalPortfolioPrice: calculateTotalPortfolioPrice(
                priceList,
                updatedCoins
              ),
            },
          ],
        };
      } else {
        const updatedCoins = [
          ...coins,
          { symbol: toItem, amount: toAmount, name: priceList[toItem].name },
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
              totalPortfolioPrice: calculateTotalPortfolioPrice(
                priceList,
                updatedCoins
              ),
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
              totalPortfolioPrice: calculateTotalPortfolioPrice(
                priceList,
                updatedCoinsToPart
              ),
            },
          ],
        };
      } else {
        const updatedCoinsToPart = [
          ...filteredCoinsFromPart,
          { symbol: toItem, amount: toAmount, name: priceList[toItem].name },
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
              totalPortfolioPrice: calculateTotalPortfolioPrice(
                priceList,
                updatedCoinsToPart
              ),
            },
          ],
        };
      }
  }
}
