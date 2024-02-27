import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import { Logo } from "@/UI";
import { Logo } from "@/components";

export default async function RegisterPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/portfolio");
  }
  return (
    <>
      {!session ? (
        <div className="darken-image     bg-cover tablet:bg-contain bg-no-repeat bg-left-bottom h-screen">
          <div className="flex justify-end items-center h-full mx-auto max-w-[1440px]  ">
            <div className="w-full tablet:w-1/2 p-4 ">
              <Logo size="large" />

              <RegisterForm />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
