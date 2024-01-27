"use client";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useSession } from "next-auth/react";

interface UserPreviewProps {
  userName: string | null | undefined;
  userAvatar: string;
}

export default function UserPreview({
  userName,
  userAvatar,
}: UserPreviewProps) {
  const session = useSession();
  console.log(session.data?.user.name);
  return (
    <div className={twMerge("flex gap-4 justify-center items-center")}>
      <p>{session.data? session.data?.user.name : "User name"}</p>
      <Image
        src={userAvatar}
        alt={`${userName} avatar`}
        width={48}
        height={48}
        className="block rounded-full"
      />
    </div>
  );
}
