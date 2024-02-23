import { MobileMenuContainer, AsideMenu, UserPreview } from "@/components";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../options";

export default async function Layout({ children }: any) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <>
      {session && session.user ? (
        <>
          <main className=" flex px-4 pt-4 h-screen bg-black-5 md:px-10">
            <AsideMenu />

            <div className="private-layout w-full  items-stretch  relative z-10">
              <div className="private-container  max-w-[1440px] mx-auto flex flex-col max-h-full relative flex-1 before:content-[''] before:block before:fixed before:top-0 before:left-0 before:w-[min(55vw,797px)] before:h-[min(55vw,797px)] before:-z-10  before:bg-cover before:bg-radial-gradient-1 after:content-[''] after:block after:fixed after:top-[60px] after:right-[-120px] after:w-[min(55vw,797px)] after:h-[min(55vw,797px)] after:-z-10 after:bg-cover after:bg-radial-gradient-1 desktop:before:absolute desktop:before:top-[-150px] desktop:before:left-[-150px] desktop:after:absolute desktop:after:top-0 desktop:after:right-[-400px]">
                <header className="flex justify-between  items-center  desktop:justify-end py-4  flex-1">
                  <MobileMenuContainer />
                  <UserPreview
                    userName={session.user.name}
                    userAvatar="http://res.cloudinary.com/dzrvw6uic/image/upload/c_fill,h_250,w_250/c1l9bkqlokigwsggloin.jpg"
                  />
                </header>
                <div className="max-h-[100%-80px] overflow-y-auto flex flex-col  flex-1 w-full max-w-7xl mr-auto ml-auto h-overflow-y-auto ">
                  {children}
                </div>
              </div>
            </div>
          </main>
          <div id="mobile-menu-root"></div>
        </>
      ) : null}
    </>
  );
}
