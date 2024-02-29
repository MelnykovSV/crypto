"use client";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/interfaces";


export default function UserPreview() {
  const session = useSession() as { data: CustomSession };

  return (
    <div className={twMerge("flex gap-4 justify-center items-center")}>
      <p>{session.data && session.data.user ? session.data?.user.name : ""}</p>

      <div className="h-[48px] w-[48px] bg-black-20  rounded-full relative">
        {session.data && session.data.user && session.data.user.name ? (
          <p className="absolute z-10  w-full h-full flex justify-center items-center text-2xl ">
            {session.data.user.name[0].toUpperCase()}
          </p>
        ) : null}
        {session.data && session.data.user && session.data.user.avatar ? (
          <Image
            src={session.data?.user.avatar}
            alt={`User avatar`}
            width={48}
            height={48}
            className="block rounded-full w-full h-full object-cover relative z-20"
          />
        ) : null}
      </div>
    </div>
  );
}
