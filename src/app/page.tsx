import Image from "next/image";
import Autocomplete from "@mui/material/Autocomplete";
import { Sparkline } from "@/UI";
import { CoinChart } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
// import { Inter, Montserrat } from "next/font/google";

// const inter = Inter({
//   subsets: ["latin"],
// });

// const montserrat = Montserrat({
//   subsets: ["latin"],
// });

export default async function Home() {
  const session = await getServerSession();
  if (session) {
    redirect("/profile");
  }
  return (
    <>
      {!session ? (
        <>
          <header>
            <nav className=" text-zinc-950">
              <Link href="/login">Sign In</Link>
              <Link href="/register">Register</Link>
            </nav>
          </header>
          <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
        </>
      ) : null}
    </>
  );
}
