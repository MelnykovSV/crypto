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
  return (
    <div className={twMerge("flex gap-4 justify-center items-center")}>
      <p>{userName || "User name"}</p>
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
