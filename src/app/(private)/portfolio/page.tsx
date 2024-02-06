import TestForm from "@/components/TestForm";
import { getUserPortfolio } from "@/app/actions";

import { PortfolioPageBody } from "@/components";
import { ExchangeForm } from "@/components";
import { getCoinPrice } from "@/api";
import { IPortfolio } from "@/interfaces";

export default async function PortfolioPage() {
  const portfolio = (await getUserPortfolio()) as string;

  console.log("portfolio", portfolio);
  const parsedPortfolio: IPortfolio = JSON.parse(portfolio);

  console.log("parsedPortfolio", parsedPortfolio);

  return (
    <div>
      <h1>Portfolio page</h1>

      <PortfolioPageBody initialPortfolio={parsedPortfolio} />
    </div>
  );
}
