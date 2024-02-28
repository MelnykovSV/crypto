import { Logo } from "@/components";
import { LoginForm } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import authBgImage from "@/assets/auth-bg.jpg";

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/portfolio");
  }
  return (
    <>
      {!session ? (
        <div className="bg-black-5     bg-cover tablet:bg-contain bg-no-repeat bg-left-bottom h-screen">
          <div className="absolute w-full h-full">
            <Image
              src={authBgImage}
              alt="auth bg image"
              className="absolute w-auto h-full max-w-[694px] max-h-[860px]    left-0 bottom-0"
              width={694}
              height={860}
            />
          </div>
          <div className="flex justify-end items-center h-full mx-auto max-w-[1440px]  relative z-10 bg-darken-gradient  tablet:bg-none">
            <div className="w-full tablet:w-1/2 p-4 ">
              <Logo size="large" />

              <LoginForm />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
