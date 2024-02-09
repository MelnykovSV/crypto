"use client";
import { useState } from "react";
import { ExchangeForm, SellForm, BuyForm } from ".";
import { IPortfolio, IPriceList } from "@/interfaces";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

export default function PortfolioPageBody({
  initialPortfolio,
  priceList,
}: {
  initialPortfolio: IPortfolio;
  priceList: IPriceList;
}) {
  const [portfolio, setPortfolio] = useState(initialPortfolio);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState("buy");

  console.log(portfolio);
  console.log(priceList)

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => {
            setFormType("buy");
            setIsModalOpen(true);
          }}>
          Buy
        </button>
        <button
          type="button"
          onClick={() => {
            setFormType("sell");
            setIsModalOpen(true);
          }}>
          Sell
        </button>
        <button
          type="button"
          onClick={() => {
            setFormType("exchange");
            setIsModalOpen(true);
          }}>
          Exchange
        </button>
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
            <div>
              <button
                className={formType === "buy" ? "bg-green-500" : ""}
                type="button"
                onClick={() => {
                  setFormType("buy");
                  setIsModalOpen(true);
                }}>
                Buy
              </button>
              <button
                className={formType === "sell" ? "bg-green-500" : ""}
                type="button"
                onClick={() => {
                  setFormType("sell");
                  setIsModalOpen(true);
                }}>
                Sell
              </button>
              <button
                className={formType === "exchange" ? "bg-green-500" : ""}
                type="button"
                onClick={() => {
                  setFormType("exchange");
                  setIsModalOpen(true);
                }}>
                Exchange
              </button>
            </div>
            {formType === "buy" ? <BuyForm userPortfolio={portfolio} /> : null}
            {formType === "sell" ? (
              <SellForm userPortfolio={portfolio} />
            ) : null}
            {formType === "exchange" ? (
              <ExchangeForm userPortfolio={portfolio} />
            ) : null}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
