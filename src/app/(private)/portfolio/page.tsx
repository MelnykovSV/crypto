import TestForm from "@/components/TestForm";
import { getUserPortfolio } from "@/app/actions";

import { PortfolioPageBody } from "@/components";
import { ExchangeForm } from "@/components";
import { getCoinPrice } from "@/api";

export default async function PortfolioPage() {
  const portfolio = (await getUserPortfolio()) as string;

  const res = await getCoinPrice("btc", "eth");

  console.log("apires", res);

  return (
    <div>
      {/* <PortfolioPageBody /> */}

      <h1>Portfolio page</h1>
      {/* <TestForm /> */}
      <ExchangeForm />
      {/* <p>{portfolio}</p> */}
    </div>
  );
}
