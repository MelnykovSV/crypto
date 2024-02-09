"use client";
import { useState } from "react";
import { ExchangeForm, SellForm, BuyForm } from ".";
import { IPortfolio } from "@/interfaces";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

export default function PortfolioPageBody({
  initialPortfolio,
}: {
  initialPortfolio: IPortfolio;
}) {
  const [portfolio, setPortfolio] = useState(initialPortfolio);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState("buy");

  console.log("body rerender");
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
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
      <button type="button" onClick={handleModalOpen}>
        Create a transaction
      </button>
      {/* <div className=" bg-black-12 w-[800px]">
        <ExchangeForm userPortfolio={portfolio} />
        <SellForm userPortfolio={portfolio} />
        <BuyForm userPortfolio={portfolio} />
      </div> */}

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
