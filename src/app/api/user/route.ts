import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { User } from "@/models";
import { authOptions } from "../../../../options";

interface IUserData {
  email: string;
  name: string;
  phone: null | string;
  birthday: Date | null;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    console.log(session)
    if (!session || !session.user) {
      return NextResponse.json(
        {
          message: "Not authenticated",
        },
        {
          status: 401,
        }
      );
    }

    const user = await User.findById(session.user.id);
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

    // Провалидировать данные

    console.log("user", user);

    const { email, name, phone, birthday } = await req.json();

    const userFoundByEmail = await User.findOne({ email });
    if (userFoundByEmail && userFoundByEmail._id.toString() !== session.user.id) {
      return NextResponse.json(
        {
          message: "This email already in use",
        },
        {
          status: 409,
        }
      );
    }

    const userFoundByName = await User.findOne({ name });


    if (userFoundByName && userFoundByName._id.toString() !== session.user.id) {
      return NextResponse.json(
        {
          message: "This name already in use",
        },
        {
          status: 409,
        }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        email,
        name,
        phone,
        birthday,
      },
      { new: true }
    );

    console.log(updatedUser);

    return NextResponse.json(
      { message: "Some response" },
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
