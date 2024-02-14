import { ImageComponent } from "@/UI";
import Image from "next/image";
import TriangleArrowDownIcon from "@/assets/triangle-arrow-down.svg";
import TriangleArrowUpIcon from "@/assets/triangle-arrow-up.svg";
import { roundValue } from "@/app/lib";
import Link from "next/link";

interface IPortfolioListProps {
  portfolio: any;
  priceList: any;
}

export default function PortfolioList({
  portfolio,
  priceList,
}: IPortfolioListProps) {
  return (
    <div className="w-full">
      <h2 className="font-bold text-3xl pl-[20px] mb-8">Assets</h2>
      <ul className=" w-full flex flex-col  laptop:h-[380px] laptop:overflow-auto ">
        {portfolio.coins.map((item: any) => (
          <li
            className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-gray last:h-0"
            key={item.symbol}>
            <Link
              href={`coins/${item.coinGeckoId}`}
              className="grid grid-cols-[40px_1fr_60px_1fr] large-mobile:grid-cols-[40px_1fr_90px_1fr] items-center py-3 hover:bg-accent-light transition-colors duration-200 ">
              <div className="pl-2">
                <ImageComponent
                  src={
                    priceList[item.symbol].logo.startsWith(
                      "https://s2.coinmarketcap.com/static/img"
                    )
                      ? priceList[item.symbol].logo
                      : "/--"
                  }
                  alt={`${priceList[item.symbol].name} coin image`}
                  width={35}
                  height={35}
                />
              </div>

              <p className="truncate-2 pl-2 text-xs large-mobile:text-base">
                {item.name} ({item.symbol})
              </p>

              <div className="flex items-center gap-1 pl-2 text-xs large-mobile:text-base">
                <Image
                  src={
                    priceList[item.symbol].percent_change_24h > 0
                      ? TriangleArrowUpIcon
                      : TriangleArrowDownIcon
                  }
                  alt="triangle arrow "
                  width={15}
                  height={15}
                />
                <p
                  className={` ${
                    priceList[item.symbol].percent_change_24h > 0
                      ? "text-success"
                      : "text-error"
                  }`}>
                  {priceList[item.symbol].percent_change_24h
                    ? `${Math.abs(
                        priceList[item.symbol].percent_change_24h
                      ).toFixed(2)}%`
                    : "No data"}
                </p>
              </div>
              <p className="truncate pl-2 text-xs large-mobile:text-base">
                $ {roundValue(priceList[item.symbol].price)}
              </p>
              {/* <p>{roundPrice(item.amount)}</p>
          <p>{roundPrice(item.amount * priceList[item.symbol].price)}</p> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
