import Link from "next/link";
import { UserPreview } from "@/components";
import { Logo } from "@/components";

const pages = [
  ["Currencies", "/currencies"],
  ["Portfolio", "/portfolio"],
  ["Transactions", "/transactions"],
  ["Settings", "/settings"],
  ["Profile", "/profile"],
];

export default function Layout({ children }: any) {
  return (
    <div className="flex p-3 h-screen bg-blue-500">
      <aside className="flex-col justify-between w-80 pt-12 pl-12 pr-7 pb-28  bg-slate-500 hidden md:flex">
        <nav>
          <Logo />
          <ul>
            {pages.map((page) => (
              <li key={page[0]}>
                <Link href={page[1]}>{page[0]}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <button type="button">Logout</button>
      </aside>

      <div className="w-full flex flex-col items-stretch">
        <header className="flex justify-between  items-center bg-slate-300 md:justify-end">
          <button className="block md:hidden" type="button">
            Menu
          </button>
          <UserPreview
            userName="Test_user"
            userAvatar="http://res.cloudinary.com/dzrvw6uic/image/upload/c_fill,h_250,w_250/c1l9bkqlokigwsggloin.jpg"
          />
        </header>
        <div className=" bg-slate-100  flex-1 w-full max-w-7xl mr-auto ml-auto ">
          {children}
        </div>
      </div>
    </div>
  );
}
