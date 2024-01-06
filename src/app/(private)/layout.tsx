import { UserPreview } from "@/components";
import { Logo } from "@/UI";
import { MobileMenuContainer, MobileMenu } from "@/components";
import LogoutIcon from "../../assets/logout.svg";
import Image from "next/image";
import { NavList } from "@/client-components";

export default function Layout({ children }: any) {
  return (
    <>
      <main className=" flex p-4 h-screen bg-black-5 md:px-10">
        <aside className="flex-col justify-between w-80 pt-10  pr-7 pb-28   hidden lg:flex relative z-20  ">
          <nav>
            <Logo />
            <NavList />
          </nav>

          <button
            className=" text-lg flex gap-5 py-4 px-6 max-w-80 items-center rounded-2xl hover:bg-accent-gradient "
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
        </aside>

        <div className="private-layout w-full  items-stretch  relative z-10">
          <div className="private-container relative flex-1   ">
            <header className="flex justify-between  items-center  lg:justify-end py-4  flex-1">
              <MobileMenuContainer />
              <UserPreview
                userName="Test_user"
                userAvatar="http://res.cloudinary.com/dzrvw6uic/image/upload/c_fill,h_250,w_250/c1l9bkqlokigwsggloin.jpg"
              />
            </header>
            <div className="  flex-1 w-full max-w-7xl mr-auto ml-auto h-overflow-y-auto ">
              {children}
            </div>
          </div>
        </div>
      </main>
      <div id="mobile-menu-root"></div>
    </>
  );
}
