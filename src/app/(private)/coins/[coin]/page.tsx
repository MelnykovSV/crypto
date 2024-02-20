import CoinChartModule from "@/components/CoinChartModule";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import TriangleArrowDownIcon from "@/assets/triangle-arrow-down.svg";
import TriangleArrowUpIcon from "@/assets/triangle-arrow-up.svg";
import twitterIcon from "@/assets/twitter.svg";
import facebookIcon from "@/assets/facebook.svg";
import githubIcon from "@/assets/github.svg";
import { getSingleCoinData, getCoinMarketChartData } from "@/app/actions";

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

  if (initialChartData instanceof Object && "error" in initialChartData) {
    return (
      <div>
        <h2>ERROR</h2>
        {initialChartData.error}
      </div>
    );
  }

  if (coinData instanceof Object && "error" in coinData) {
    return (
      <div>
        <h2>ERROR</h2>
        {coinData.error}
      </div>
    );
  }

  return (
    <div className=" pr-5">
      <div className="flex flex-col gap-5 items-end mb-5 laptop:flex-row">
        <div className="w-full laptop:w-[70%]">
          <p className=" px-2 py-1 bg-accent w-fit rounded-lg mb-6">
            Rank #{coinData.market_data.market_cap_rank || "--"}
          </p>
          <div className="flex gap-3 items-center justify-center w-fit text-xl mb-6">
            <ImageComponent
              src={coinData.image.thumb}
              alt={coinData.id}
              width={30}
              height={30}
            />

            <p className=" font-bold">{coinData.name || "Coin name"}</p>
            <p className=" text-slate-400">
              {coinData.symbol || "Coin symbol"}
            </p>
          </div>

          <div className="flex gap-3 items-center justify-center w-fit mb-6">
            <p className=" text-3xl font-bold">
              {coinData.market_data.current_price.usd
                ? `$${coinData.market_data.current_price.usd.toLocaleString(
                    "en-US"
                  )}`
                : "No data"}
            </p>

            <div className="flex items-center gap-1">
              <Image
                src={
                  coinData.market_data.price_change_percentage_24h > 0
                    ? TriangleArrowUpIcon
                    : TriangleArrowDownIcon
                }
                alt="triangle arrow "
                width={15}
                height={15}
              />
              <p
                className={`text-xl ${
                  coinData.market_data.price_change_percentage_24h > 0
                    ? "text-success"
                    : "text-error"
                }`}>
                {coinData.market_data.price_change_percentage_24h
                  ? `${Math.abs(
                      coinData.market_data.price_change_percentage_24h
                    ).toFixed(2)}%`
                  : "No data"}
              </p>
            </div>
          </div>

          <div className=" mb-5">
            <div className={`h-2 flex justify-end bg-progress-gradient`}>
              <div
                className={"bg-slate-400"}
                style={{
                  width: `${
                    coinData.market_data.high_24h.usd &&
                    coinData.market_data.current_price.usd &&
                    coinData.market_data.low_24h.usd
                      ? ((coinData.market_data.high_24h.usd -
                          coinData.market_data.current_price.usd) /
                          (coinData.market_data.high_24h.usd -
                            coinData.market_data.low_24h.usd)) *
                        100
                      : 100
                  }%`,
                }}></div>
            </div>
            <div className="flex justify-between">
              <p>
                {coinData.market_data.low_24h.usd
                  ? `$${coinData.market_data.low_24h.usd.toLocaleString(
                      "en-US"
                    )}`
                  : "No data"}
              </p>
              <p>24h Range</p>
              <p>
                {coinData.market_data.high_24h.usd
                  ? `$${coinData.market_data.high_24h.usd.toLocaleString(
                      "en-US"
                    )}`
                  : "No data"}
              </p>
            </div>
          </div>

          <dl className="grid grid-cols-1 tablet:grid-cols-2 gap-y-5 gap-x-5 w-[100%] mb-5">
            <div className="flex gap-3 justify-between ">
              <dt>Market Cap</dt>
              <dd>
                {coinData.market_data.market_cap.usd
                  ? `${coinData.market_data.market_cap.usd.toLocaleString(
                      "en-US"
                    )}$`
                  : "No data"}
              </dd>
            </div>
            <div className="flex gap-3 justify-between">
              <dt>24 Market Cap Change</dt>
              <dd>
                {coinData.market_data.market_cap_change_24h
                  ? `${coinData.market_data.market_cap_change_24h.toLocaleString(
                      "en-US"
                    )}$`
                  : "No data"}
              </dd>
            </div>
            <div className="flex gap-3 justify-between">
              <dt>Fully Diluted Valuation</dt>
              <dd>
                {coinData.market_data.fully_diluted_valuation.usd
                  ? `${coinData.market_data.fully_diluted_valuation.usd.toLocaleString(
                      "en-US"
                    )}$`
                  : "No data"}
              </dd>
            </div>
            <div className="flex gap-3 justify-between">
              <dt>Circulating Supply</dt>
              <dd>
                {coinData.market_data.circulating_supply
                  ? coinData.market_data.circulating_supply.toLocaleString(
                      "en-US"
                    )
                  : "No data"}
              </dd>
            </div>
            <div className="flex gap-3 justify-between">
              <dt>Total Supply</dt>
              <dd>
                {coinData.market_data.total_supply
                  ? coinData.market_data.total_supply.toLocaleString("en-US")
                  : "No data"}
              </dd>
            </div>
            <div className="flex gap-3 justify-between">
              <dt>Max Supply</dt>
              <dd>
                {coinData.market_data.max_supply
                  ? coinData.market_data.max_supply.toLocaleString("en-US")
                  : "No data"}
              </dd>
            </div>
          </dl>

          <table className="w-full text-xs tablet:text-base border-separate border-[1px] rounded-xl overflow-hidden border-spacing-0 border-slate-300">
            <tbody className="  ">
              <tr className=" bg-slate-800/50  ">
                <th className="text-center   p-2">24h</th>
                <th className="text-center  p-2">7d</th>
                <th className=" hidden tablet:table-cell text-center  p-2 ">
                  14d
                </th>
                <th className="text-center  p-2">30d</th>
                <th className="hidden tablet:table-cell text-center p-2">
                  60d
                </th>
                <th className="text-center p-2">1y</th>
              </tr>
              <tr>
                <td
                  className={`text-center  p-2 ${
                    coinData.market_data.price_change_percentage_24h > 0
                      ? "text-success"
                      : "text-error"
                  } border-r border-t border-slate-300`}>
                  <div className="flex justify-center items-center gap-1">
                    <Image
                      src={
                        coinData.market_data.price_change_percentage_24h > 0
                          ? TriangleArrowUpIcon
                          : TriangleArrowDownIcon
                      }
                      alt="triangle arrow"
                      width={15}
                      height={15}
                      className="block"
                    />
                    <p>
                      {coinData.market_data.price_change_percentage_24h
                        ? `${Math.abs(
                            coinData.market_data.price_change_percentage_24h
                          ).toFixed(2)}%`
                        : "No data"}
                    </p>
                  </div>
                </td>
                <td
                  className={`text-center  p-2 ${
                    coinData.market_data.price_change_percentage_7d > 0
                      ? "text-success"
                      : "text-error"
                  } border-r border-t border-slate-300`}>
                  <div className="flex justify-center gap-1">
                    <Image
                      src={
                        coinData.market_data.price_change_percentage_7d > 0
                          ? TriangleArrowUpIcon
                          : TriangleArrowDownIcon
                      }
                      alt="triangle arrow "
                      width={15}
                      height={15}
                    />
                    <p>
                      {coinData.market_data.price_change_percentage_7d
                        ? `${Math.abs(
                            coinData.market_data.price_change_percentage_7d
                          ).toFixed(2)}%`
                        : "No data"}
                    </p>
                  </div>
                </td>
                <td
                  className={`text-center hidden tablet:table-cell  p-2 ${
                    coinData.market_data.price_change_percentage_14d > 0
                      ? "text-success"
                      : "text-error"
                  } border-r border-t border-slate-300`}>
                  <div className="flex justify-center gap-1">
                    <Image
                      src={
                        coinData.market_data.price_change_percentage_14d > 0
                          ? TriangleArrowUpIcon
                          : TriangleArrowDownIcon
                      }
                      alt="triangle arrow "
                      width={15}
                      height={15}
                    />
                    <p>
                      {coinData.market_data.price_change_percentage_14d
                        ? `${Math.abs(
                            coinData.market_data.price_change_percentage_14d
                          ).toFixed(2)}%`
                        : "No data"}
                    </p>
                  </div>
                </td>
                <td
                  className={`text-center  p-2 ${
                    coinData.market_data.price_change_percentage_30d > 0
                      ? "text-success"
                      : "text-error"
                  } border-r border-t border-slate-300`}>
                  <div className="flex justify-center gap-1">
                    <Image
                      src={
                        coinData.market_data.price_change_percentage_30d > 0
                          ? TriangleArrowUpIcon
                          : TriangleArrowDownIcon
                      }
                      alt="triangle arrow "
                      width={15}
                      height={15}
                    />
                    <p>
                      {coinData.market_data.price_change_percentage_30d
                        ? `${Math.abs(
                            coinData.market_data.price_change_percentage_30d
                          ).toFixed(2)}%`
                        : "No data"}
                    </p>
                  </div>
                </td>
                <td
                  className={`text-center hidden tablet:table-cell  p-2 ${
                    coinData.market_data.price_change_percentage_60d > 0
                      ? "text-success"
                      : "text-error"
                  } border-r border-t border-slate-300`}>
                  <div className="flex justify-center gap-1">
                    <Image
                      src={
                        coinData.market_data.price_change_percentage_60d > 0
                          ? TriangleArrowUpIcon
                          : TriangleArrowDownIcon
                      }
                      alt="triangle arrow "
                      width={15}
                      height={15}
                    />
                    <p>
                      {coinData.market_data.price_change_percentage_60d
                        ? `${Math.abs(
                            coinData.market_data.price_change_percentage_60d
                          ).toFixed(2)}%`
                        : "No data"}
                    </p>
                  </div>
                </td>

                <td
                  className={`text-center  p-2 ${
                    coinData.market_data.price_change_percentage_1y > 0
                      ? "text-success"
                      : "text-error"
                  } border-r border-t border-slate-300`}>
                  <div className="flex justify-center gap-1">
                    <Image
                      src={
                        coinData.market_data.price_change_percentage_1y > 0
                          ? TriangleArrowUpIcon
                          : TriangleArrowDownIcon
                      }
                      alt="triangle arrow "
                      width={15}
                      height={15}
                    />
                    <p>
                      {coinData.market_data.price_change_percentage_1y
                        ? `${Math.abs(
                            coinData.market_data.price_change_percentage_1y
                          ).toFixed(2)}%`
                        : "No data"}
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full laptop:w-[30%] ">
          <div className="w-full  pb-[10px]">
            <h3 className="text-3xl mb-8">Info</h3>
            <dl>
              <div className="flex  mb-5 relative after:content-[''] after:w-full after:h-[1px] after:absolute after:bottom-[-10px] after:left-0 after:bg-slate-300 before:content-[''] before:w-full before:h-[1px] before:absolute before:top-[-10px] before:left-0 before:bg-slate-300">
                <dt className="w-[35%]">Website</dt>
                <dd className="w-[65%]">
                  <ul className="flex flex-wrap gap-3 justify-end">
                    {coinData.links.homepage.map(
                      (item: string) =>
                        !!item && (
                          <li key={item}>
                            <a
                              href={item}
                              className=" py-1 px-2 bg-slate-500 rounded-md">
                              {item.replace(
                                /^(?:https?:\/\/)?(?:www\.)?(.+?)(?:\/|$)/,
                                "$1"
                              )}
                            </a>
                          </li>
                        )
                    )}
                    {!!coinData.links.whitepaper && (
                      <li key={coinData.links.whitepaper}>
                        <a
                          href={coinData.links.whitepaper}
                          className=" py-1 px-2 bg-slate-500 rounded-md">
                          Whitepaper
                        </a>
                      </li>
                    )}

                    {coinData.links.homepage.filter((item: string) => !!item)
                      .length || coinData.links.whitepaper
                      ? ""
                      : "No data"}
                  </ul>
                </dd>
              </div>
              <div className="flex mb-5 relative after:content-[''] after:w-full after:h-[1px] after:absolute after:bottom-[-10px] after:left-0 after:bg-slate-300">
                <dt className="w-[35%]">Explorers</dt>
                <dd className="w-[65%]">
                  <ul className="flex flex-wrap gap-3 justify-end">
                    {coinData.links.blockchain_site.map(
                      (item: string) =>
                        !!item && (
                          <li key={item}>
                            <a
                              href={item}
                              className=" py-1 px-2 bg-slate-500 rounded-md">
                              {item.replace(
                                /^https?:\/\/(?:www\.)?([^\/]+)\/.*$/,
                                "$1"
                              )}
                            </a>
                          </li>
                        )
                    )}
                    {coinData.links.blockchain_site.filter(
                      (item: string) => !!item
                    ).length
                      ? ""
                      : "No data"}
                  </ul>
                </dd>
              </div>
              <div className="flex mb-5 relative after:content-[''] after:w-full after:h-[1px] after:absolute after:bottom-[-10px] after:left-0 after:bg-slate-300">
                <dt className="w-[35%]">Community</dt>
                <dd className="w-[65%]">
                  <ul className="flex flex-wrap gap-3 justify-end">
                    {coinData.links.official_forum_url.map(
                      (item: string) =>
                        !!item && (
                          <li key={item}>
                            <a
                              href={item}
                              className="flex py-1 px-2 bg-slate-500 rounded-md">
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
                          className="flex gap-2 py-1 px-2 bg-slate-500 rounded-md"
                          href={`https://twitter.com/${coinData.links.twitter_screen_name}`}>
                          <Image
                            src={twitterIcon}
                            alt="twitter icon"
                            height={16}
                            className="block"
                          />
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
                          className="flex gap-2 py-1 px-2 bg-slate-500 rounded-md"
                          href={`https://www.facebook.com/${coinData.links.facebook_username}`}>
                          <Image
                            src={facebookIcon}
                            alt="twitter icon"
                            height={16}
                            className="block"
                          />
                          {coinData.links.facebook_username.replace(
                            /https?:\/\//,
                            ""
                          )}
                        </a>
                      </li>
                    )}

                    {coinData.links.official_forum_url.filter(
                      (item: string) => !!item
                    ).length ||
                    coinData.links.twitter_screen_name ||
                    coinData.links.facebook_username
                      ? ""
                      : "No data"}
                  </ul>
                </dd>
              </div>
              <div className="flex  relative after:content-[''] after:w-full after:h-[1px] after:absolute after:bottom-[-10px] after:left-0 after:bg-slate-300 ">
                <dt className="w-[35%]">Repositories</dt>
                <dd className="w-[65%]">
                  <ul className="flex flex-wrap gap-3 justify-end">
                    {coinData.links.repos_url.github.map(
                      (item: string) =>
                        !!item && (
                          <li key={item}>
                            <a
                              href={item}
                              className="flex gap-2 py-1 px-2 bg-slate-500 rounded-md">
                              <Image
                                src={githubIcon}
                                alt="twitter icon"
                                height={16}
                                className="block"
                              />
                              {item.split("/")[item.split("/").length - 1]}
                            </a>
                          </li>
                        )
                    )}

                    {coinData.links.repos_url.github.filter(
                      (item: string) => !!item
                    ).length
                      ? ""
                      : "No data"}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <CoinChartModule initialData={initialChartData} name={coin} />

      {coinData.description.en ? (
        <>
          <p className=" text-3xl font-bold mt-5">
            What is {coin[0].toUpperCase() + coin.slice(1)}?
          </p>

          <p
            dangerouslySetInnerHTML={{ __html: coinData.description.en }}
            className="coin-description mt-5"></p>
        </>
      ) : null}

      <ToastContainer />
    </div>
  );
}
