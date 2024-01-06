"use client";
import { createPortal } from "react-dom";
import { useRef, useEffect, useState, ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";
import { pages } from "@/constants";
import { Logo } from "@/UI";
import Link from "next/link";
import Image from "next/image";
import LogoutIcon from "../assets/logout.svg";
import CloseIcon from "../assets/close.svg";

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

  const matches = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#mobile-menu-root");
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      console.log("handler");
      if (e.key === "Escape") {
        modalCloseHandler();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (matches) {
      modalCloseHandler();
    }
  }, [matches]);

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
                  <ul className=" mt-10 flex flex-col gap-4">
                    {pages.map((page) => (
                      <li key={page[0]}>
                        <Link
                          className=" text-lg flex gap-5 py-4 px-6 max-w-80 items-center rounded-2xl hover:bg-accent-gradient"
                          href={page[1]}>
                          <Image
                            src={page[2]}
                            alt={`${page[0]} icon`}
                            width={30}
                            height={30}
                            className="block"
                          />
                          <p> {page[0]}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <button
                  className=" text-lg flex gap-5 py-4 px-6 items-center rounded-2xl max-w-80 hover:bg-accent-gradient"
                  type="button">
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
