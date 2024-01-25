import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/profile");
  }
  return (
    <>
      {!session ? (
        <div className="text-black">
          <RegisterForm />
        </div>
      ) : null}
    </>
  );
}
