import { getUserPortfolio } from "@/app/actions";
import { PortfolioPageBody } from "@/components";
import { parseStrToJSON } from "@/app/lib";



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

  const { portfolio, priceList } = portfolioData;

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
