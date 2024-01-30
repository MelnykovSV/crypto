import { NextRequest, NextResponse } from "next/server";
// import { DefaultSession } from "next-auth";
import { CustomSession } from "@/interfaces";

import { User } from "@/models";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../options";
import cloudinary from "cloudinary";

// interface CustomSession extends DefaultSession {
//   user?: {
//     name?: string | null;
//     email?: string | null;
//     id?: string | null;
//     phone?: string | null;
//     birthday?: Date | null;
//     avatar?: string | null;
//   };
// }

interface IFormDataRequest extends NextRequest {
  formData: () => Promise<FormData>;
}

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

console.log({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function PATCH(req: IFormDataRequest) {
  try {
    const session = (await getServerSession(authOptions)) as CustomSession;

    if (!session || !session.user) {
      return NextResponse.json(
        {
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    const user = await User.findById(session.user.id);

    console.log("user", user);
    if (!user) {
      return NextResponse.json(
        {
          message: "Not authenticated",
        },
        {
          status: 401,
        }
      );
    }

    const formData = await req.formData();

    console.log("formData", formData);

    const avatar = formData.get("avatar") as File;
    console.log("avatar", avatar);
    if (
      avatar &&
      avatar.type &&
      avatar.type !== "image/jpeg" &&
      avatar.type !== "image/png"
    ) {
      return NextResponse.json(
        {
          message: "You can use png and jpeg formats for an avatar",
        },
        { status: 400 }
      );
    }
    const arrayBuffer = await avatar.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    console.log("buffer", buffer);

    const response = await new Promise<{ url: string } | undefined>(
      (resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream({}, function (error, result) {
            if (error) {
              console.log(error);
              reject(error);
              return;
            }
            console.log(result);
            resolve(result);
          })
          .end(buffer);
      }
    );

    console.log("response", response);

    if (!response) {
      return NextResponse.json(
        { message: "Upload failed" },
        {
          status: 500,
        }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { avatar: response.url },
      { new: true }
    );

    console.log("updatedUser", updatedUser);

    return NextResponse.json(
      { message: "Avatar updated", avatar: response.url },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message || "Internal server error" },
        {
          status: 500,
        }
      );
    } else {
      return NextResponse.json(
        { message: "Internal server error" },
        {
          status: 500,
        }
      );
    }
  }
}
