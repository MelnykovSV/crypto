"use client";
import { useState } from "react";
import { ExchangeForm } from ".";
import { IPortfolio } from "@/interfaces";

export default function PortfolioPageBody({ initialPortfolio }: {initialPortfolio:IPortfolio}) {
  const [portfolio, setPortfolio] = useState(initialPortfolio);

  return (
    <>

    <div className=" bg-black-12 w-[800px]">
    <ExchangeForm userPortfolio={portfolio} />
    </div>
      
    </>
  );
}
