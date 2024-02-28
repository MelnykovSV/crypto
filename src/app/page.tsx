import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import arrowsIcon from "@/assets/arrows.svg";
import moneyIcon from "@/assets/money.svg";
import walletIcon from "@/assets/wallet.svg";
import shieldImage from "@/assets/shield@2x.png";
import bagImage from "@/assets/bag@2x.png";
import heroBgImage from "@/assets/hero-bg-img.jpg";
import Image from "next/image";
import arrowRightIcon from "@/assets/arrow-right.svg";

export default async function Home() {
  const session = await getServerSession();
  if (session) {
    redirect("/portfolio");
  }
  return (
    <div className="bg-black-5 overflow-hidden">
      {!session ? (
        <>
          <header className="h-20 absolute top-0 left-0 w-full flex items-center ">
            <div className="container mx-auto max-w-screen-xl flex items-center justify-end ">
              <nav className=" text-zinc-950 w-fit">
                <div className="flex gap-3 w-fit">
                  <Link
                    href="/login"
                    className=" text-white  text-center relative z-10 block bg-auth-accent-gradient text-base  w-[96px]   rounded-[10px] before:rounded-[10px] py-[12px] px-[18px] leading-none   before:content-[''] before:absolute before:left-0  before:top-0  before:transition-opacity before:duration-300 before:ease-linear before:w-full  before:h-full before:-z-10 before:bg-accent-gradient before:opacity-0 before:bg-cover before:animate-hue-rotate hover:before:opacity-100">
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className=" text-white  text-center relative z-10 block bg-auth-accent-gradient text-base  w-[96px]   rounded-[10px] before:rounded-[10px] py-[12px] px-[18px] leading-none   before:content-[''] before:absolute before:left-0  before:top-0  before:transition-opacity before:duration-300 before:ease-linear before:w-full  before:h-full before:-z-10 before:bg-accent-gradient before:opacity-0 before:bg-cover before:animate-hue-rotate hover:before:opacity-100">
                    Sign Up
                  </Link>
                </div>
              </nav>
            </div>
          </header>
          <main>
            <section className="relative pt-[130px] laptop:pt-[249px] mb-10 laptop:mb-20 bg-heroImage-1 bg-[length:875px_451px] tablet:bg-[length:1250px_645px] laptop:bg-[length:2500px_1290px] bg-no-repeat bg-top tablet:bg-[center_top_-8rem] laptop:bg-[center_top_-17rem] ">
              <div className="absolute left-1/2  -translate-x-1/2 top-0 tablet:top-[-8rem] laptop:top-[-13rem] w-[875px] h-[451px] tablet:w-[1250px] tablet:h-[645px] laptop:w-[2500px] laptop:h-[1290px] ">
                <Image
                  src={heroBgImage}
                  alt="bg image"
                  className="w-full h-full"
                  sizes="(min-width: 1024px) 2500px, (min-width: 640px) 1250px, 875px"
                />
              </div>
              <div className="container mx-auto max-w-screen-xl relative z-10">
                <h1 className="text-[30px] tablet:text-[45px]   laptop:text-[85px] font-black text-white leading-[1.3] mb-[72px] text-center max-w-[780px] mx-auto">
                  We make crypto clear and simple
                </h1>
                <Link
                  href="/register"
                  className=" text-white  text-center relative z-10 block bg-auth-accent-gradient text-base  w-[156px]   rounded-[10px] before:rounded-[10px] py-[20px] px-[18px] leading-none   before:content-[''] before:absolute before:left-0  before:top-0  before:transition-opacity before:duration-300 before:ease-linear before:w-full  before:h-full before:-z-10 before:bg-accent-gradient before:opacity-0 before:bg-cover before:animate-hue-rotate hover:before:opacity-100 mx-auto mb-[150px] laptop:mb-[313px]">
                  Get Started
                </Link>
                <div
                  className="flex flex-col tablet:flex-row gap-y-2 justify-between  w-full relative z-10 before:content-[''] before:block before:absolute before:bottom-[-7%]  before:left-[-5%]  before:w-[min(3vw,55px)] before:h-[min(3vw,55px)] before:-z-10  before:bg-cover before:bg-star-1
                
                
                
                after:content-[''] after:block after:absolute after:bottom-[-12%] tablet:after:bottom-[-30%]  after:left-[-2%]  after:w-[min(5vw,75px)] after:h-[min(5vw,75px)] after:-z-10  after:bg-cover after:bg-star-2">
                  <div className="w-full tablet:w-[calc((100%-20px)/3)] laptop:w-[calc((100%-40px)/3)] py-4 px-2 laptop:py-8 laptop:px-6 rounded-[25px] bg-black-12 flex flex-col gap-8 justify-between">
                    <div>
                      <div className="mb-4 w-20  mx-auto ">
                        <Image
                          src={arrowsIcon}
                          alt="arrows icon "
                          width={80}
                          height={80}></Image>
                      </div>
                      <h2 className="mb-4 text-[32px] text-white font-extrabold text-center">
                        Create
                      </h2>
                      <p className="text-black-60 text-center ">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempos Lorem ipsum dolor
                      </p>
                    </div>

                    <Link
                      className="mx-auto w-fit font-semibold text-accent-purple flex gap-[6px] items-center"
                      href="/register">
                      Get started
                      <Image
                        src={arrowRightIcon}
                        alt="arrow icon"
                        width={24}
                        height={24}
                      />
                    </Link>
                  </div>
                  <div className="w-full tablet:w-[calc((100%-20px)/3)] laptop:w-[calc((100%-40px)/3)] py-4 px-2 laptop:py-8 laptop:px-6 rounded-[25px] bg-black-12 flex flex-col gap-8 justify-between">
                    <div>
                      <div className="mb-4 w-20  mx-auto ">
                        <Image
                          src={moneyIcon}
                          alt="arrows icon "
                          width={80}
                          height={80}></Image>
                      </div>
                      <h2 className="mb-4 text-[32px] text-white font-extrabold text-center">
                        Login
                      </h2>
                      <p className="text-black-60 text-center ">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempos Lorem ipsum dolor
                      </p>
                    </div>

                    <Link
                      className=" mx-auto w-fit font-semibold text-accent-purple flex gap-[6px] items-center"
                      href="/register">
                      Get started
                      <Image
                        src={arrowRightIcon}
                        alt="arrow icon"
                        width={24}
                        height={24}
                      />
                    </Link>
                  </div>
                  <div className="w-full tablet:w-[calc((100%-20px)/3)] laptop:w-[calc((100%-40px)/3)] py-4 px-2 laptop:py-8 laptop:px-6 rounded-[25px] bg-black-12 flex flex-col gap-8 justify-between">
                    <div>
                      <div className="mb-4 w-20  mx-auto ">
                        <Image
                          src={walletIcon}
                          alt="arrows icon "
                          width={80}
                          height={80}></Image>
                      </div>
                      <h2 className="mb-4 text-[32px] text-white font-extrabold text-center">
                        Manage
                      </h2>
                      <p className="text-black-60 text-center ">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempos Lorem ipsum dolorLorem ipsum dolor
                      </p>
                    </div>

                    <Link
                      className=" mx-auto w-fit font-semibold text-accent-purple flex gap-[6px] items-center"
                      href="/register">
                      Get started
                      <Image
                        src={arrowRightIcon}
                        alt="arrow icon"
                        width={24}
                        height={24}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            <section className="pt-[70px] laptop:pt-[140px] mb-10 laptop:mb-20 relative ">
              <div className="container mx-auto max-w-screen-xl  z-0">
                <div className="max-w-[780px] mx-auto  z-0 before:content-[''] before:block before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-15%]  laptop:before:translate-x-[0%] before:translate-y-[-25%] before:w-[797px] before:h-[797px] before:z-0  before:bg-cover before:bg-looper   after:content-[''] after:block after:absolute after:top-[75%] laptop:after:top-[55%] after:left-[80%]  after:w-[min(4vv,60px)] after:h-[min(4vw,60px)] after:z-0  after:bg-cover after:bg-star-3">
                  <h2 className="font-black text-[35px] laptop:text-[50px]  leading-[1.3] text-center mb-[10px] relative z-10">
                    A cryto mining platform that invest in you
                  </h2>
                  <p className="max-w-[580px] text-black-60 text-center mb-8 mx-auto relative z-10">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempos Lorem ipsum dolor
                  </p>
                  <Link
                    href="/register"
                    className=" text-white  text-center relative z-10 block bg-auth-accent-gradient text-base  w-[156px]   rounded-[10px] before:rounded-[10px] py-[20px] px-[18px] leading-none   before:content-[''] before:absolute before:left-0  before:top-0  before:transition-opacity before:duration-300 before:ease-linear before:w-full  before:h-full before:-z-10 before:bg-accent-gradient before:opacity-0 before:bg-cover before:animate-hue-rotate hover:before:opacity-100 mx-auto ">
                    Get Started
                  </Link>
                </div>
              </div>
            </section>
            <section className="pt-[70px] laptop:pt-[140px] mb-10 laptop:mb-20  ">
              <div className="container mx-auto max-w-screen-xl ">
                <div className="flex flex-col tablet:flex-row items-center ">
                  <div className="w-full max-w-[580px] mx-auto relative">
                    <div className="absolute w-full h-full realtive z-0 before:content-[''] before:block before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-75%] before:translate-y-[-55%] before:w-[min(137%,797px)] before:h-[min(190%,797px)] before:z-0  before:bg-cover before:bg-radial-gradient-2"></div>
                    <Image
                      className="w-full z-10 relative"
                      src={shieldImage}
                      alt="shield image "
                      width={580}
                      height={420}
                    />
                  </div>
                  <div className="w-full z-10 relative">
                    <h2 className="font-black text-[25px] laptop:text-[50px] leading-[1.3]  text-center tablet:text-start mb-[10px]">
                      24/7 access to full service customer support
                    </h2>
                    <p className="max-w-[580px] text-black-60 text-center tablet:text-start mb-8 mx-auto">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempos Lorem ipsum dolor sit amet,
                      consectetur
                    </p>
                    <Link
                      href="/register"
                      className=" text-white  text-center relative z-10 block bg-auth-accent-gradient text-base  w-[156px]   rounded-[10px] before:rounded-[10px] py-[20px] px-[18px] leading-none   before:content-[''] before:absolute before:left-0  before:top-0  before:transition-opacity before:duration-300 before:ease-linear before:w-full  before:h-full before:-z-10 before:bg-accent-gradient before:opacity-0 before:bg-cover before:animate-hue-rotate hover:before:opacity-100 mx-auto tablet:mx-0 ">
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            <section className="pt-[70px] marker:laptop:pt-[140px] pb-[140px] ">
              <div className="container mx-auto max-w-screen-xl">
                <div className="flex flex-col-reverse tablet:flex-row items-center">
                  <div className="w-full z-10 relative">
                    <h2 className="font-black text-[25px] laptop:text-[50px] leading-[1.3]  text-center tablet:text-start mb-[10px]">
                      Take your first step into safe, secure crypto investing
                    </h2>
                    <p className="max-w-[580px] text-black-60 text-center tablet:text-start mb-8 mx-auto">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempos Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit, sed do eiusmod tempos
                    </p>
                    <Link
                      href="/register"
                      className=" text-white  text-center relative z-10 block bg-auth-accent-gradient text-base  w-[156px]   rounded-[10px] before:rounded-[10px] py-[20px] px-[18px] leading-none   before:content-[''] before:absolute before:left-0  before:top-0  before:transition-opacity before:duration-300 before:ease-linear before:w-full  before:h-full before:-z-10 before:bg-accent-gradient before:opacity-0 before:bg-cover before:animate-hue-rotate hover:before:opacity-100 mx-auto tablet:mx-0 ">
                      Get Started
                    </Link>
                  </div>
                  <div className="w-full max-w-[580px] mx-auto relative">
                    <div className="absolute w-full h-full realtive z-0 before:content-[''] before:block before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-40%] before:translate-y-[-55%] before:w-[min(137%,797px)] before:h-[min(190%,797px)] before:z-0  before:bg-cover before:bg-radial-gradient-blue"></div>
                    <Image
                      className="w-full"
                      src={bagImage}
                      alt="shield image "
                      width={580}
                      height={420}
                    />
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      ) : null}
    </div>
  );
}
