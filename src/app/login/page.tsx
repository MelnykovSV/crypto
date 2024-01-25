import { Logo } from "@/UI";
import { LoginForm } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/profile");
  }
  return (

    <>
    {!session ? (
      <div className="flex justify-end items-center bg-black-5">
      <div>
        <Logo />

        <LoginForm />
      </div>
    </div>
    ) : null}
  </>
    
  );
}
