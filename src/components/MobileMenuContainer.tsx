"use client";
import React, { useState, useCallback } from "react";
import MobileMenu from "./MobileMenu";
import BurgerIcon from "./../assets/burger.svg";
import Image from "next/image";

export default function MobileMenuContainer() {
  const [isOpen, setisOpen] = useState(false);

  const modalCloseHandler = () => {
    setisOpen(false);
  };

  const modalOpenHandler = useCallback(() => {
    setisOpen(true);
  }, []);

  return (
    <div>
      <button
        type="button"
        onClick={modalOpenHandler}
        className="desktop:hidden">
        <Image
          src={BurgerIcon}
          alt="Burger icon"
          width={30}
          height={30}
          className=" block w-[30px] h-[30px]"
        />
      </button>

      <MobileMenu modalCloseHandler={modalCloseHandler} isOpen={isOpen} />
    </div>
  );
}
