"use client";
import { Logo } from ".";
import { NavList } from ".";
import Image from "next/image";
import LogoutIcon from "@/assets/logout.svg";
import { signOut } from "next-auth/react";

export default function AsideMenu() {
  return (
    <aside className="flex-col justify-between w-80 pt-10  pr-7 pb-28   hidden desktop:flex relative z-20  ">
      <nav>
        <Logo />
        <NavList />
      </nav>

      <button
        className="text-lg flex gap-5 py-4 px-6 max-w-80 items-center rounded-2xl  relative z-10 overflow-hidden before:content-[''] before:absolute before:left-0  before:top-0  before:transition-opacity before:duration-300 before:ease-linear before:w-full  before:h-full before:-z-10 before:bg-accent-gradient before:opacity-0 before:bg-cover before:animate-hue-rotate hover:before:opacity-100  "
        type="button"
        onClick={() => {
          signOut();
        }}>
        <Image
          src={LogoutIcon}
          alt="Logout icon"
          width={30}
          height={30}
          className=" block"
        />
        Logout
      </button>
    </aside>
  );
}
