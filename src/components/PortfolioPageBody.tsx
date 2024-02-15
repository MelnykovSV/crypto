"use client";
import { useEffect, useState } from "react";
import { ExchangeForm, SellForm, BuyForm } from ".";
import { IPortfolio, IPriceList } from "@/interfaces";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { ProfitChart, PieChart } from ".";
import { calculatePortfolioPrice } from "@/app/lib";
import { getUserPortfolio } from "@/app/actions";
import { PortfolioList } from ".";
import Image from "next/image";
import depositIcon from "@/assets/deposit.svg";
import withdrawIcon from "@/assets/withdrawn.svg";
import chartSquareIcon from "@/assets/chart-square.svg";
import withdrawButtonIcon from "@/assets/withdraw-icon.svg";
import depositButtonIcon from "@/assets/deposit-icon.svg";
import exchangeButtonIcon from "@/assets/exchange-icon.svg";
import { roundValue } from "@/app/lib";

export default function PortfolioPageBody({
  initialPortfolio,
  initialPriceList,
}: // initialCoinLogos,
{
  initialPortfolio: IPortfolio;
  initialPriceList: IPriceList;
  // initialCoinLogos: Record<string, string>;
}) {
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [priceList, setPriceList] = useState(initialPriceList);
  // const [coinLogos, setCoinLogos] = useState(initialCoinLogos);

  // console.log(coinLogos);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState("buy");

  const updatePortfolioHandler = async () => {
    const res = await getUserPortfolio();
    setPortfolio(JSON.parse(res).portfolio);
    setPriceList(JSON.parse(res).priceList);
    // setCoinLogos(JSON.parse(res).coinLogos);
  };

  // useEffect(() => {
  //   (async () => {
  //     const result = await getCurrenciesMap();
  //     console.log(result);
  //   })();
  // }, []);

  // const newCoinsMap = coinsArray.reduce((acc: any, item: any) => {
  //   return {
  //     ...acc,
  //     [item.name]: {
  //       ...item,
  //       name: item.name,
  //     },
  //   };
  // }, {});

  // console.log(newCoinsMap);

  const modalCloseHandler = () => {
    setIsModalOpen(false);
  };
  function processPortfolioData(portfolio: IPortfolio) {
    const currentPortfolioPrice = calculatePortfolioPrice(
      priceList,
      portfolio.coins
    );

    const pricesByCoin = portfolio.coins.map((item) => ({
      name: item.name,
      symbol: item.symbol,
      portfolioCoinPrice: item.amount * priceList[item.symbol].price,
      logo: priceList[item.symbol].logo,
    }));
    return {
      lineChartData: [
        ...portfolio.historyData.map(({ totalPortfolioPrice, date }) => ({
          x: new Date(date),
          y: totalPortfolioPrice,
        })),
        {
          x: new Date(),
          y: currentPortfolioPrice,
        },
      ],
      pieChartData: pricesByCoin,
    };
  }

  const { lineChartData, pieChartData } = processPortfolioData(portfolio);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="pb-20">
      <div className="flex flex-col justify-between items-center  mb-8 laptop:px-4 laptop:flex-row ">
        <div className="flex flex-col gap-4  px-5 mb-4 tablet:gap-2 large-mobile:flex-row large-mobile:justify-between large-mobile:w-full tablet:px-1 laptop:w-fit laptop:gap-2 large-desktop:gap-4  ">
          <div className="flex gap-10 large-mobile:gap-2 large-mobile:flex-col tablet:flex-row   items-center">
            <div className="h-[60px] w-[60px] flex justify-center items-center rounded-xl bg-transparent-gray ">
              <div className="w-8 h-8 ">
                <Image
                  src={chartSquareIcon}
                  alt="total assets icon"
                  width={32}
                  height={32}
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="large-mobile:text-center tablet:text-left">
              <p>Total price</p>
              <p className=" laptop:text-lg font-bold truncate max-w-[130px] laptop:max-w-[140px] desktop:text-xl desktop:max-w-[170px] large-desktop:text-2xl large-desktop:max-w-[200px]">
                ${" "}
                {roundValue(
                  calculatePortfolioPrice(priceList, portfolio.coins)
                )}
              </p>
            </div>
          </div>
          <div className="flex gap-10 large-mobile:gap-2 large-mobile:flex-col tablet:flex-row  items-center">
            <div className="h-[60px] w-[60px] flex justify-center items-center rounded-xl bg-transparent-gray">
              <div className="w-8 h-8">
                <Image
                  src={depositIcon}
                  alt="total assets icon"
                  width={32}
                  height={32}
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="large-mobile:text-center tablet:text-left">
              <p>Deposited</p>
              <p className=" laptop:text-lg font-bold truncate max-w-[130px] laptop:max-w-[140px] desktop:text-xl desktop:max-w-[170px] large-desktop:text-2xl large-desktop:max-w-[200px]">
                $ {roundValue(portfolio.totalInvested)}
              </p>
            </div>
          </div>
          <div className="flex gap-10 large-mobile:gap-2  large-mobile:flex-col tablet:flex-row  items-center">
            <div className="h-[60px] w-[60px] flex justify-center items-center rounded-xl bg-transparent-gray">
              <div className="w-8 h-8">
                <Image
                  src={withdrawIcon}
                  alt="total assets icon"
                  width={32}
                  height={32}
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="large-mobile:text-center tablet:text-left">
              <p>Withdrawn</p>
              <p className=" laptop:text-lg font-bold truncate max-w-[130px] laptop:max-w-[140px] desktop:text-xl desktop:max-w-[170px]  large-desktop:text-2xl large-desktop:max-w-[200px] ">
                $ {roundValue(portfolio.totalWithdrawn)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 px-5  justify-between tablet:gap-10 w-full tablet:w-fit py-3 tablet:px-2 laptop:gap-4">
          <div className="flex flex-col items-center gap-2 w-[75px]">
            <button
              className="h-[60px] w-[60px] flex justify-center items-center rounded-3xl bg-transparent-gray hover:bg-accent-light transition-colors duration-300"
              type="button"
              onClick={() => {
                setFormType("buy");
                setIsModalOpen(true);
              }}>
              <div className="w-8 h-8">
                <Image
                  src={depositButtonIcon}
                  alt="deposit button icon"
                  width={32}
                  height={32}
                  className="w-full h-full"
                />
              </div>
            </button>
            <p>Deposit</p>
          </div>

          <div className="flex flex-col items-center gap-2 w-[75px]">
            <button
              className="h-[60px] w-[60px] flex justify-center items-center rounded-3xl bg-transparent-gray hover:bg-accent-light transition-colors duration-300"
              type="button"
              onClick={() => {
                setFormType("sell");
                setIsModalOpen(true);
              }}>
              <div className="w-8 h-8">
                <Image
                  src={withdrawButtonIcon}
                  alt="withdraw button icon"
                  width={32}
                  height={32}
                  className="w-full h-full"
                />
              </div>
            </button>
            <p>Withdraw</p>
          </div>

          <div className="flex flex-col items-center gap-2 w-[75px]">
            <button
              className="h-[60px] w-[60px] flex justify-center items-center rounded-3xl bg-transparent-gray hover:bg-accent-light transition-colors duration-300"
              type="button"
              onClick={() => {
                setFormType("exchange");
                setIsModalOpen(true);
              }}>
              <div className="w-8 h-8">
                <Image
                  src={exchangeButtonIcon}
                  alt="exchange button icon"
                  width={32}
                  height={32}
                  className="w-full h-full"
                />
              </div>
            </button>
            <p>Exchange</p>
          </div>
        </div>
      </div>

      <h2 className="font-bold text-3xl pl-[20px]">Total price chart</h2>

      <ProfitChart data={lineChartData} />

      <div className="flex flex-col-reverse laptop:flex-row mt-8 gap-5">
        <PortfolioList portfolio={portfolio} priceList={priceList} />
        <PieChart data={pieChartData} />
      </div>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={isModalOpen}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              bgcolor: "#1A1B23",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}>
            <div className="flex gap-8 justify-center">
              <div className="flex flex-col items-center gap-2 w-[75px]">
                <button
                  className={`h-[60px] w-[60px] flex justify-center items-center rounded-3xl  hover:bg-accent-light transition-colors duration-300 ${
                    formType === "buy"
                      ? "bg-accent-light pointer-events-none"
                      : "bg-transparent-gray"
                  }`}
                  type="button"
                  onClick={() => {
                    setFormType("buy");
                    setIsModalOpen(true);
                  }}>
                  <div className="w-8 h-8">
                    <Image
                      src={depositButtonIcon}
                      alt="deposit button icon"
                      width={32}
                      height={32}
                      className="w-full h-full"
                    />
                  </div>
                </button>
                <p>Deposit</p>
              </div>

              <div className="flex flex-col items-center gap-2 w-[75px]">
                <button
                  className={`h-[60px] w-[60px] flex justify-center items-center rounded-3xl  hover:bg-accent-light transition-colors duration-300 ${
                    formType === "sell"
                      ? "bg-accent-light pointer-events-none"
                      : "bg-transparent-gray"
                  }`}
                  type="button"
                  onClick={() => {
                    setFormType("sell");
                    setIsModalOpen(true);
                  }}>
                  <div className="w-8 h-8">
                    <Image
                      src={withdrawButtonIcon}
                      alt="withdraw button icon"
                      width={32}
                      height={32}
                      className="w-full h-full"
                    />
                  </div>
                </button>
                <p>Withdraw</p>
              </div>

              <div className="flex flex-col items-center gap-2 w-[75px]">
                <button
                  className={`h-[60px] w-[60px] flex justify-center items-center rounded-3xl  hover:bg-accent-light transition-colors duration-300 ${
                    formType === "exchange"
                      ? "bg-accent-light pointer-events-none"
                      : "bg-transparent-gray"
                  }`}
                  type="button"
                  onClick={() => {
                    setFormType("exchange");
                    setIsModalOpen(true);
                  }}>
                  <div className="w-8 h-8">
                    <Image
                      src={exchangeButtonIcon}
                      alt="exchange button icon"
                      width={32}
                      height={32}
                      className="w-full h-full"
                    />
                  </div>
                </button>
                <p>Exchange</p>
              </div>
            </div>
            {formType === "buy" ? (
              <BuyForm
                userPortfolio={portfolio}
                updatePortfolioHandler={updatePortfolioHandler}
                modalCloseHandler={modalCloseHandler}
              />
            ) : null}
            {formType === "sell" ? (
              <SellForm
                userPortfolio={portfolio}
                updatePortfolioHandler={updatePortfolioHandler}
                modalCloseHandler={modalCloseHandler}
              />
            ) : null}
            {formType === "exchange" ? (
              <ExchangeForm
                userPortfolio={portfolio}
                updatePortfolioHandler={updatePortfolioHandler}
                modalCloseHandler={modalCloseHandler}
              />
            ) : null}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
