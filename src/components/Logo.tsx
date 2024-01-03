import logoIcon from "../assets/Logo.svg";
import Image from "next/image";

interface LogoProps {
  size?: "small" | "large";
}

export default function Logo({ size = "small" }: LogoProps) {
  return (
    <div className="flex gap-2 justify-center items-center">
      <Image src={logoIcon} alt="My SVG" width={30} height={30} />
      <p>Crypto</p>
    </div>
  );
}
