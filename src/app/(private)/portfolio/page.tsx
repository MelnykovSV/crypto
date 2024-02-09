import { getUserPortfolio } from "@/app/actions";
import { PortfolioPageBody } from "@/components";
import { IPortfolio } from "@/interfaces";
import { parseStrToJSON } from "@/app/lib";

export default async function PortfolioPage() {
  const portfolio = (await getUserPortfolio()) as string;

  const parsedPortfolio: IPortfolio = parseStrToJSON(portfolio);

  return (
    <div>
      {!!parsedPortfolio && (
        <PortfolioPageBody initialPortfolio={parsedPortfolio} />
      )}
    </div>
  );
}
