"use client";
import { useSession } from "next-auth/react";

import Image from "next/image";

export default function AvatarUploader() {
  const session = useSession();

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const maxSizeInBytes = 600 * 1024;

      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        console.log("You can use png and jpeg images for an avatar");
        e.target.value = "";
        return;
      }
      if (file.size > maxSizeInBytes) {
        console.log(
          "The uploaded file is too large. The maximum size is 600 KB."
        );
        e.target.value = "";
        return;
      }

      const formData = new FormData();

      formData.append("avatar", file);

      try {
        const res = await fetch("/api/user/avatar", {
          method: "PATCH",
          body: formData,
        });

        const body = await res.json();

        if (res.ok) {
          await session.update({ avatar: body.avatar });
        }
        console.log(body);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <input type="file" name="avatar" id="" onChange={changeHandler} />
    </div>
  );
}
