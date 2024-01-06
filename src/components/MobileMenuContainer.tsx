"use client";
import React, { useState } from "react";
import MobileMenu from "./MobileMenu";

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
      <button type="button" onClick={modalOpenHandler}>
        Menu
      </button>

      <MobileMenu modalCloseHandler={modalCloseHandler} isOpen={isOpen} />
    </div>
  );
}
