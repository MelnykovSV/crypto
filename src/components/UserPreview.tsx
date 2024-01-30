"use client";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/interfaces";

interface UserPreviewProps {
  userName: string | null | undefined;
  userAvatar: string;
}

export default function UserPreview({
  userName,
  userAvatar,
}: UserPreviewProps) {
  const session = useSession() as {data:CustomSession};

  return (
    <div className={twMerge("flex gap-4 justify-center items-center")}>
      <p>{session.data && session.data.user ? session.data?.user.name : ""}</p>

      {session.data && session.data.user&& session.data.user.avatar ? (
        <Image
          src={session.data?.user.avatar}
          alt={`User avatar`}
          width={48}
          height={48}
          className="block rounded-full"
        />
      ) : null}
    </div>
  );
}
