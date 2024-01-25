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
  // if (size === "large") {
  //   console.log(true);
  //   return (
  //     <div className="flex gap-2 justify-start items-center   text-5xl text-red-500 ">
  //       <Image
  //         src={logoIcon}
  //         className="block "
  //         alt="My SVG"
  //         width={55}
  //         height={55}
  //         {...props}
  //       />
  //       <p className="text-red-500 bg-red-500">Crypto</p>
  //     </div>
  //   );
  // } else {
  //   console.log(false);
  //   return (
  //     <div className="flex gap-2 justify-start items-center   ">
  //       <Image
  //         src={logoIcon}
  //         className="block "
  //         alt="My SVG"
  //         width={30}
  //         height={30}
  //         {...props}
  //       />
  //       <p>Crypto</p>
  //     </div>
  //   );
  // }
}
