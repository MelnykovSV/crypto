import { getUserPortfolio } from "@/app/actions";
import { PortfolioPageBody } from "@/components";
import { IPortfolio } from "@/interfaces";
import { parseStrToJSON } from "@/app/lib";
import { IPortfolioData } from "@/interfaces";
// import { getCurrenciesMap } from "@/api";

export default async function PortfolioPage() {
  const data = (await getUserPortfolio()) as string;

  // const coinsMap = await getCurrenciesMap();

  // console.log(coinsMap);

  const portfolioData: IPortfolioData = parseStrToJSON(data);

  const { portfolio, priceList } = portfolioData;

  console.log("portfolio", portfolio);
  console.log("priceList", priceList);

  return (
    <div>
      {!!portfolioData && (
        <PortfolioPageBody
          initialPortfolio={portfolio}
          initialPriceList={priceList}
        />
      )}
    </div>
  );
}
