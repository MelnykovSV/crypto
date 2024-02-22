import { IPortfolio, IPortfolioCoin, ITransaction } from "@/interfaces";
// import { coinsMap } from "@/coinsMap";

export function calculatePortfolioPrice(
  priceList: Record<string, { name: string; symbol: string; price: number }>,
  coins: IPortfolioCoin[]
) {
  console.log("THIS");
  // const pricesByCoin = coins.map((item) => ({
  //   name: item.name,
  //   symbol: item.symbol,
  //   portfolioCoinPrice: item.amount * priceList[item.symbol].price,
  // }));

  console.log('priceList', priceList);
  console.log('coins', coins);
  return coins.reduce((acc, item) => {
    return acc + item.amount * priceList[item.symbol.toUpperCase()].price;
  }, 0);
}

export function createPriceList(res: any) {
  const result = Object.values(res.data).reduce(
    (acc: any, item: any) => ({
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
  }: ITransaction,
  priceList: Record<string, { name: string; symbol: string; price: number }>
  // coinsMap: any
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
            amount: coin.amount - fromAmount,
            logo: coin.logo,
            coinGeckoId: coin.coinGeckoId,
            coinMarketCapId: coin.coinMarketCapId,
          };
        } else {
          return coin;
        }
      });

      console.log("updatedCoins", updatedCoins);

      const fromPricePerItem = priceList[fromItemSymbol].price;
      const filteredCoins = updatedCoins.filter((coin) => coin.amount !== 0);

      console.log("filteredCoins", filteredCoins);
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
              amount: coin.amount + toAmount,
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
        // console.log("toItem", toItem);
        // console.log(priceList[toItem]);
        // console.log(
        //   coinsMap[priceList[toItem].name as keyof typeof coinsMap].id
        // );
        const updatedCoins = [
          ...coins,
          {
            symbol: toItemSymbol,
            amount: toAmount,
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
          console.log("coinGeckoId", coin.coinGeckoId);
          if (coin.amount < fromAmount) {
            throw new Error("Not enough coins for this transaction");
          }
          return {
            symbol: coin.symbol,
            name: coin.name,
            amount: coin.amount - fromAmount,
            logo: coin.logo,
            coinGeckoId: coin.coinGeckoId,
            coinMarketCapId: coin.coinMarketCapId,
          };
        } else {
          return coin;
        }
      });

      console.log("updatedCoinsFromPart", updatedCoinsFromPart);

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
              amount: coin.amount + toAmount,
              logo: coin.logo,
              coinGeckoId: coin.coinGeckoId,
              coinMarketCapId: coin.coinMarketCapId,
            };
          } else {
            return coin;
          }
        });

        console.log("updatedCoinsToPart1", updatedCoinsToPart);

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
            symbol: toItemSymbol,
            amount: toAmount,
            coinGeckoId: toItemCoinGeckoId,
            coinMarketCapId: toItemCoinMarketCapId,
            name: toItemName,
            logo: toItemLogo,
          },
        ];

        console.log("updatedCoinsToPart2", updatedCoinsToPart);
        console.log("After processing1");
        console.log(
          "totalPortfolioPrice",
          calculatePortfolioPrice(priceList, updatedCoinsToPart)
        );
        console.log("After processing2");
        console.log("result", {
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
      }
  }
}
