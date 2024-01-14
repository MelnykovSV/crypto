import { UserPreview, NavList } from "@/components";
import { Logo } from "@/UI";
import { MobileMenuContainer, MobileMenu } from "@/components";
import LogoutIcon from "../../assets/logout.svg";
import Image from "next/image";

export default function Layout({ children}: any) {

  return (
    <>
      <main className=" flex p-4 h-screen bg-black-5 md:px-10">
        <aside className="flex-col justify-between w-80 pt-10  pr-7 pb-28   hidden desktop:flex relative z-20  ">
          <nav>
            <Logo />
            <NavList />
          </nav>

          <button
            className="text-lg flex gap-5 py-4 px-6 max-w-80 items-center rounded-2xl  relative z-10 overflow-hidden before:content-[''] before:absolute before:left-0  before:top-0  before:transition-opacity before:duration-300 before:ease-linear before:w-full  before:h-full before:-z-10 before:bg-accent-gradient before:opacity-0 before:bg-cover before:animate-hue-rotate hover:before:opacity-100  "
            type="button">
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

        <div className="private-layout w-full  items-stretch  relative z-10">
          <div className="private-container  max-w-[1440px] mx-auto flex flex-col max-h-full relative flex-1 before:content-[''] before:block before:fixed before:top-0 before:left-0 before:w-[min(55vw,797px)] before:h-[min(55vw,797px)] before:-z-10  before:bg-cover before:bg-radial-gradient-1 after:content-[''] after:block after:fixed after:top-[60px] after:right-[-120px] after:w-[min(55vw,797px)] after:h-[min(55vw,797px)] after:-z-10 after:bg-cover after:bg-radial-gradient-1 desktop:before:absolute desktop:before:top-[-150px] desktop:before:left-[-150px] desktop:after:absolute desktop:after:top-0 desktop:after:right-[-400px]">
            <header className="flex justify-between  items-center  desktop:justify-end py-4  flex-1">
              <MobileMenuContainer />
              <UserPreview
                userName="Test_user"
                userAvatar="http://res.cloudinary.com/dzrvw6uic/image/upload/c_fill,h_250,w_250/c1l9bkqlokigwsggloin.jpg"
              />
            </header>
            <div className="max-h-[100%-80px] overflow-y-auto  flex-1 w-full max-w-7xl mr-auto ml-auto h-overflow-y-auto ">
              {children}
            </div>
          </div>
        </div>
      </main>
      <div id="mobile-menu-root"></div>
    </>
  );
}
