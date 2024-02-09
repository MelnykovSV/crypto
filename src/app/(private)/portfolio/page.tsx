import { getUserPortfolio } from "@/app/actions";
import { PortfolioPageBody } from "@/components";
import { IPortfolio } from "@/interfaces";
import { parseStrToJSON } from "@/app/lib";
import { IPortfolioData } from "@/interfaces";

export default async function PortfolioPage() {
  const data = (await getUserPortfolio()) as string;

  const { portfolio, priceList }: IPortfolioData = parseStrToJSON(data);

  return (
    <div>
      {!!portfolio && !!priceList && (
        <PortfolioPageBody initialPortfolio={portfolio} priceList={priceList} />
      )}
    </div>
  );
}
