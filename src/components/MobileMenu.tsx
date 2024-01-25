"use client";
import { createPortal } from "react-dom";
import { useRef, useEffect, useState, ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/UI";
import Image from "next/image";
import LogoutIcon from "../assets/logout.svg";
import CloseIcon from "../assets/close.svg";
import { NavList } from ".";

import { signOut } from "next-auth/react";

interface IMobileMenuProps {
  modalCloseHandler: () => void;
  isOpen: boolean;
}

export default function MobileMenu({
  modalCloseHandler,
  isOpen,
}: IMobileMenuProps) {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  const matches = useMediaQuery("(min-width: 1440px)");

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#mobile-menu-root");
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        modalCloseHandler();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, modalCloseHandler]);

  useEffect(() => {
    if (matches) {
      modalCloseHandler();
    }
  }, [matches, modalCloseHandler]);

  return mounted && ref.current
    ? createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed left-0 right-0 top-0 p-5 pt-0   w-full h-full bg-neutral-950  z-50 ">
              <div className="w-full h-full pt-16  pb-10 overflow-y-auto   flex  flex-col gap-10 justify-between ">
                <button
                  className="absolute top-5 right-10"
                  type="button"
                  onClick={modalCloseHandler}>
                  <Image
                    src={CloseIcon}
                    alt="Logout icon"
                    width={30}
                    height={30}
                    className="block"
                  />
                </button>
                <nav>
                  <Logo />
                  <NavList />
                </nav>
                <button
                  className=" text-lg flex gap-5 py-4 px-6 items-center rounded-2xl max-w-80 hover:bg-accent-gradient relative z-10 overflow-hidden before:content-[''] before:absolute before:left-0  before:top-0  before:transition-opacity before:duration-300 before:ease-linear before:w-full  before:h-full before:-z-10 before:bg-accent-gradient before:opacity-0 before:bg-cover before:animate-hue-rotate hover:before:opacity-100"
                  type="button"
                  onClick={() => {
                    signOut();
                  }}>
                  <Image
                    src={LogoutIcon}
                    alt="Logout icon"
                    width={30}
                    height={30}
                    className="block"
                  />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        ref.current
      )
    : null;
}
