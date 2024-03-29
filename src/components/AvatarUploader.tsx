"use client";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { CustomSession } from "@/interfaces";
import Image from "next/image";
import pencilIcon from "@/assets/pencil.svg";
import { DNA } from "react-loader-spinner";
import { uploadAvatar } from "@/app/actions";

export default function AvatarUploader() {
  const session = useSession() as {
    data: CustomSession;
    status: string;
    update: any;
  };

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileInputHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const maxSizeInBytes = 600 * 1024;

      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        setError("You can use png and jpeg images for an avatar");
        e.target.value = "";
        return;
      }
      if (file.size > maxSizeInBytes) {
        setError("The uploaded file is too large. The maximum size is 600 KB.");
        e.target.value = "";
        return;
      }

      const formData = new FormData();

      formData.append("avatar", file);

      setIsLoading(true);

      const res = await uploadAvatar(formData);

      if (res instanceof Object && "error" in res && res.error) {
        setError(res.error);
        return;
      }

      await session.update({ avatar: res.avatar });

      setIsLoading(false);
    }
  };

  return (
    <div className="w-full  p-3">
      <div className=" p-4 rounded-full w-[250px] h-[250px] mb-2 mx-auto  ">
        {session.data && session.data.user ? (
          <div
            className={`w-full h-full bg-black-20  rounded-full relative ${
              isLoading && "loading"
            }   object-cover`}>
            {session.data.user.name ? (
              <p className="absolute  w-full h-full flex justify-center items-center text-7xl ">
                {session.data.user.name[0].toUpperCase()}
              </p>
            ) : null}
            {session.data.user.avatar ? (
              <Image
                src={session.data?.user.avatar}
                alt={`User avatar`}
                width={218}
                height={218}
                className="block relative z-20 rounded-full w-full h-full object-cover"
              />
            ) : null}

            <button
              onClick={fileInputHandler}
              className={`${
                isLoading && "blocked"
              } rounded-full absolute bottom-4 right-4 z-30 bg-accent-dark p-2 transition-colors duration-300 ease-linear hover:bg-accent`}>
              <Image
                src={pencilIcon}
                alt={`Pencol icon`}
                width={25}
                height={25}
                className="block rounded-full w-full h-full object-cover"
              />
            </button>
          </div>
        ) : null}
      </div>

      <p className="text-error h-5 text-center ">{error || ""}</p>
      <input
        type="file"
        name="avatar"
        id=""
        ref={fileInputRef}
        className="visually-hidden "
        onChange={changeHandler}
      />
    </div>
  );
}
