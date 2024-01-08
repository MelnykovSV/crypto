import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface UserPreviewProps {
  userName: string;
  userAvatar: string;
}

export default function UserPreview({
  userName,
  userAvatar,
}: UserPreviewProps) {
  return (
    <div className={twMerge("flex gap-4 justify-center items-center")}>
      <p>{userName}</p>
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
