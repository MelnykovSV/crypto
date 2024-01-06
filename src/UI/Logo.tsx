import logoIcon from "../assets/Logo.svg";
import Image from "next/image";

interface LogoProps {
  size?: "small" | "large";
}

export default function Logo({ size = "small", ...props }: LogoProps) {
  return (
    <div className="flex gap-2 justify-start items-center text-2xl ">
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
