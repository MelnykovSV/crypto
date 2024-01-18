import CoinChartModule from "@/components/CoinChartModule";
import { ToastContainer } from "react-toastify";
import { getCoinMarketChartData, getSingleCoinData } from "@/api";

import "react-toastify/dist/ReactToastify.css";

import { ImageComponent } from "@/UI";

interface ICoinPageProps {
  params: {
    coin: string;
  };
}

export default async function CoinPage({ params: { coin } }: ICoinPageProps) {
  const initialChartData = await getCoinMarketChartData(coin, "usd", 1);

  const coinData = await getSingleCoinData(coin);

  return (
    <div className=" pr-5">
      <div className="flex gap-5 items-end mb-5">
        <div className="w-[70%]">
          <p className=" px-2 py-1 bg-accent w-fit rounded-lg mb-6">
            Rank #{coinData.market_data.market_cap_rank}
          </p>
          <div className="flex gap-3 items-center justify-center w-fit text-xl mb-6">
            <ImageComponent
              src={coinData.image.thumb}
              alt={coinData.id}
              width={30}
              height={30}
            />

            <p className=" font-bold">{coinData.name || "Coin name"}</p>
            <p>{coinData.symbol || "Coin symbol"}</p>
          </div>

          <div className="flex gap-3 items-center justify-center w-fit mb-6">
            <p className=" text-3xl font-bold">
              ${coinData.market_data.current_price.usd}
            </p>
            <p className="text-xl">
              {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>

          <div className=" mb-5">
            <div className={`h-2 flex justify-end bg-lime-600`}>
              <div
                className={"bg-slate-400"}
                style={{
                  width: `${
                    ((coinData.market_data.high_24h.usd -
                      coinData.market_data.current_price.usd) /
                      (coinData.market_data.high_24h.usd -
                        coinData.market_data.low_24h.usd)) *
                    100
                  }%`,
                }}></div>
            </div>
            <div className="flex justify-between">
              <p>${coinData.market_data.low_24h.usd}</p>
              <p>24h Range</p>
              <p>${coinData.market_data.high_24h.usd}</p>
            </div>
          </div>

          <dl className="columns-2 w-[100%] mb-5">
            <div className="flex gap-3 justify-between">
              <dt>Market Cap</dt>
              <dd>{coinData.market_data.market_cap.usd}$</dd>
            </div>
            <div className="flex gap-3 justify-between">
              <dt>24 Market Cap Change</dt>
              <dd>{coinData.market_data.market_cap_change_24h}$</dd>
            </div>
            <div className="flex gap-3 justify-between">
              <dt>Fully Diluted Valuation</dt>
              <dd>{coinData.market_data.fully_diluted_valuation.usd}$</dd>
            </div>
            <div className="flex gap-3 justify-between">
              <dt>Circulating Supply</dt>
              <dd>{coinData.market_data.circulating_supply}</dd>
            </div>
            <div className="flex gap-3 justify-between">
              <dt>Total Supply</dt>
              <dd>{coinData.market_data.total_supply}</dd>
            </div>
            <div className="flex gap-3 justify-between">
              <dt>Max Supply</dt>
              <dd>{coinData.market_data.max_supply}</dd>
            </div>
          </dl>

          <table className="w-full">
            <tbody>
              <tr>
                <th className="text-center">24h</th>
                <th className="text-center">7d</th>
                <th className="text-center">14d</th>
                <th className="text-center">30d</th>
                <th className="text-center">60d</th>
                <th className="text-center">1y</th>
              </tr>
              <tr>
                <td className="text-center">
                  {coinData.market_data.price_change_percentage_24h}%
                </td>
                <td className="text-center">
                  {coinData.market_data.price_change_percentage_7d}%
                </td>
                <td className="text-center">
                  {coinData.market_data.price_change_percentage_14d}%
                </td>
                <td className="text-center">
                  {coinData.market_data.price_change_percentage_30d}%
                </td>
                <td className="text-center">
                  {coinData.market_data.price_change_percentage_60d}%
                </td>
                <td className="text-center">
                  {coinData.market_data.price_change_percentage_1y}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-[30%] ">
          <div className="w-full ">
            <h3>Info</h3>
            <dl>
              <div className="flex mb-3">
                <dt className="w-[35%]">Website</dt>
                <dd className="w-[65%]">
                  <ul className="flex flex-wrap gap-3">
                    {coinData.links.homepage.map(
                      (item: string) =>
                        !!item && (
                          <li key={item}>
                            <a href={item}>
                              {item.replace(/^https?:\/\/(?:www\.)?/, "")}
                            </a>
                          </li>
                        )
                    )}
                    {!!coinData.links.whitepaper && (
                      <li key={coinData.links.whitepaper}>
                        <a href={coinData.links.whitepaper}>Whitepaper</a>
                      </li>
                    )}
                  </ul>
                </dd>
              </div>
              <div className="flex mb-3">
                <dt className="w-[35%]">Explorers</dt>
                <dd className="w-[65%]">
                  <ul className="flex flex-wrap gap-3">
                    {coinData.links.blockchain_site.map(
                      (item: string) =>
                        !!item && (
                          <li key={item}>
                            <a href={item}>
                              {item.replace(
                                /^https?:\/\/(?:www\.)?([^\/]+)\/.*$/,
                                "$1"
                              )}
                            </a>
                          </li>
                        )
                    )}
                  </ul>
                </dd>
              </div>
              <div className="flex mb-3">
                <dt className="w-[35%]">Community</dt>
                <dd className="w-[65%]">
                  <ul className="flex flex-wrap gap-3">
                    {coinData.links.official_forum_url.map(
                      (item: string) =>
                        !!item && (
                          <li key={item}>
                            <a href={item}>
                              {item.replace(
                                /^https?:\/\/(?:www\.)?([^\/]+)\/.*$/,
                                "$1"
                              )}
                            </a>
                          </li>
                        )
                    )}
                    {!!coinData.links.twitter_screen_name && (
                      <li key={coinData.links.twitter_screen_name}>
                        <a
                          href={`https://twitter.com/${coinData.links.twitter_screen_name}`}>
                          {coinData.links.twitter_screen_name.replace(
                            /https?:\/\//,
                            ""
                          )}
                        </a>
                      </li>
                    )}
                    {!!coinData.links.facebook_username && (
                      <li key={coinData.links.facebook_username}>
                        <a
                          href={`https://www.facebook.com/${coinData.links.facebook_username}`}>
                          {coinData.links.facebook_username.replace(
                            /https?:\/\//,
                            ""
                          )}
                        </a>
                      </li>
                    )}
                  </ul>
                </dd>
              </div>
              <div className="flex  ">
                <dt className="w-[35%]">Repositories</dt>
                <dd className="w-[65%]">
                  <ul className="flex flex-wrap gap-3">
                    {coinData.links.repos_url.github.map(
                      (item: string) =>
                        !!item && (
                          <li key={item}>
                            <a href={item}>
                              {item.split("/")[item.split("/").length - 1]}
                            </a>
                          </li>
                        )
                    )}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <CoinChartModule initialData={initialChartData} name={coin} />

      <p dangerouslySetInnerHTML={{ __html: coinData.description.en }} className="mt-5"></p>

      <ToastContainer />
    </div>
  );
}
