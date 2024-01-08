"use client";
import React, { useState } from "react";
import MobileMenu from "./MobileMenu";
import BurgerIcon from "./../assets/burger.svg";
import Image from "next/image";

export default function MobileMenuContainer() {
  const [isOpen, setisOpen] = useState(false);

  const modalCloseHandler = () => {
    setisOpen(false);
  };

  const modalOpenHandler = () => {
    setisOpen(true);
  };

  return (
    <div>
      <button type="button" onClick={modalOpenHandler} className="lg:hidden">
        <Image
          src={BurgerIcon}
          alt="Burger icon"
          width={30}
          height={30}
          className=" block"
        />
      </button>

      <MobileMenu modalCloseHandler={modalCloseHandler} isOpen={isOpen} />
    </div>
  );
}
