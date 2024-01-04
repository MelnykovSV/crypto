"use client";
import { createPortal } from "react-dom";
import { useRef, useEffect, useState, ReactNode } from "react";

import { useMediaQuery } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";

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

  const matches = useMediaQuery("(min-width: 768px)");

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
              className="fixed left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-0 bg-neutral-950 border-b border-b-white/20">
              <div className="h-10 w-10 bg-red-700">
                <button type="button" onClick={modalCloseHandler}>
                  Close
                </button>
                Mobile Menu
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        ref.current
      )
    : null;
}

{
  /* <div className="h-10 w-10 bg-red-700">
          <button type="button" onClick={modalCloseHandler}>
            Close
          </button>
          Mobile Menu
        </div> */
}
