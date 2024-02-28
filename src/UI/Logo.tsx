import logoIcon from "../assets/Logo.svg";
import Image from "next/image";

interface LogoProps {
  size?: "small" | "large";
}
 function Logo({ size = "small", ...props }: LogoProps) {
  console.log(size);

  return (
    <div className="flex gap-2 justify-start items-center   text-5xl text-red-500 ">
      <Image
        src={logoIcon}
        className="block "
        alt="My SVG"
        width={55}
        height={55}
        {...props}
      />
      <span className="text-red-500 text-5xl bg-red-500">Crypto</span>
    </div>
  );

}
