import { getUserPortfolio } from "@/app/actions";
import { PortfolioPageBody } from "@/components";
import { IPortfolio } from "@/interfaces";
import { Search } from "@/components";
import { parseStrToJSON } from "@/app/lib";
import { IPortfolioData } from "@/interfaces";
// import { getCurrenciesMap } from "@/api";

export default async function PortfolioPage() {
  const data = await getUserPortfolio();


  if (data instanceof Object && "error" in data) {
    return (
      <div>
        <h2>ERROR</h2>
        {data.error}
      </div>
    );
  }

  const portfolioData = parseStrToJSON(data);

  // const coinsMap = await getCurrenciesMap();

  // console.log(coinsMap);

  // const portfolioData: IPortfolioData = data;

  const { portfolio, priceList } = portfolioData;

  console.log("portfolio", portfolio);
  console.log("priceList", priceList);

  return (
    <div>
      {!!data && (
        <PortfolioPageBody
          initialPortfolio={portfolio}
          initialPriceList={priceList}
        />
      )}
    </div>
  );
}
