import logoIcon from "../assets/Logo.svg";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface LogoProps {
  size?: "small" | "large";
}

export default function Logo({ size = "small", ...props }: LogoProps) {
  if (size === "large") {
    return (
      <div
        className={twMerge(
          "flex gap-2 justify-start items-center   text-4xl font-semibold  "
        )}>
        <Image
          src={logoIcon}
          className="block "
          alt="My SVG"
          width={55}
          height={55}
          {...props}
        />
        <p className="">Crypto</p>
      </div>
    );
  } else {
    console.log(false);
    return (
      <div className="flex gap-2 justify-start items-center   ">
        <Image
          src={logoIcon}
          className="block "
          alt="My SVG"
          width={30}
          height={30}
          {...props}
        />
        <p>Crypto</p>
      </div>
    );
  }
}
